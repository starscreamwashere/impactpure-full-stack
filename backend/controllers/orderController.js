import orderModel from "../models/orderModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'
import axios from 'axios'
import userModel from "../models/userModel.js";
// global variables
const currency = 'inr'
const deliveryCharge = 0

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET,
})

// Function to get Shiprocket Auth Token
const getShiprocketToken = async () => {
    try {
        const response = await axios.post("https://apiv2.shiprocket.in/v1/external/auth/login", {
            email: process.env.SHIPROCKET_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD
        });
        return response.data.token;
    } catch (error) {
        console.error("Shiprocket Auth Error:", error.response.data);
    }
};

// Function to create an order in Shiprocket
const createShiprocketOrder = async (orderData) => {
    const token = await getShiprocketToken();
    try {
        const response = await axios.post(
            "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Shiprocket Order Error:", error.response.data);
    }
};


// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Validate required fields
        if (!userId || !items.length || !amount || !address || !address.pincode) {
            return res.status(400).json({ success: false, message: "Missing required order details" });
        }

        // Save order in MongoDB
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        console.log(`✅ Order ${newOrder._id} saved in MongoDB`);

        // Prepare data for Shiprocket
        const shiprocketOrderData = {
            order_id: newOrder._id,
            order_date: new Date().toISOString(),
            pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || "Warehouse",
            billing_customer_name: address.name,
            billing_address: address.street,
            billing_city: address.city,
            billing_pincode: address.pincode,
            billing_state: address.state,
            billing_country: "India",
            billing_email: "customer@example.com",
            billing_phone: address.phone,
            shipping_is_billing: true,
            order_items: items.map(item => ({
                name: item.name,
                sku: item.sku || "DEFAULT_SKU",
                units: item.quantity,
                selling_price: item.price
            })),
            payment_method: "COD",
            sub_total: amount,
            length: process.env.SHIPROCKET_ORDER_LENGTH || "10",
            breadth: process.env.SHIPROCKET_ORDER_BREADTH || "10",
            height: process.env.SHIPROCKET_ORDER_HEIGHT || "10",
            weight: process.env.SHIPROCKET_ORDER_WEIGHT || "1"
        };

        console.log(`🚀 Sending order ${newOrder._id} to Shiprocket...`);

        // Authenticate and send order to Shiprocket
        const shiprocketResponse = await createShiprocketOrder(shiprocketOrderData);

        if (!shiprocketResponse || !shiprocketResponse.awb_code) {
            console.error("❌ Shiprocket order creation failed:", shiprocketResponse);
            return res.status(500).json({ success: false, message: "Shiprocket order creation failed" });
        }

        // Store tracking details in MongoDB
        await orderModel.findByIdAndUpdate(newOrder._id, { trackingNumber: shiprocketResponse.awb_code });

        console.log(`✅ Order ${newOrder._id} sent to Shiprocket. AWB Code: ${shiprocketResponse.awb_code}`);

        res.json({ success: true, message: "Order Placed & Sent to Shiprocket", trackingNumber: shiprocketResponse.awb_code });

    } catch (error) {
        console.error("❌ Error placing order:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



// Placing orders using Stripe Method
const placeOrderStripe = async (req,res) => {
    try {
        
        const { userId, items, amount, address} = req.body
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency:currency,
                product_data: {
                    name:item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency:currency,
                product_data: {
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success:true,session_url:session.url});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Verify Stripe 
const verifyStripe = async (req,res) => {

    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success: true});
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req,res) => {
    try {
        
        const { userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if (error) {
                console.log(error)
                return res.json({success:false, message: error})
            }
            res.json({success:true,order})
        })

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const verifyRazorpay = async (req,res) => {
    try {
        
        const { userId, razorpay_order_id  } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({ success: true, message: "Payment Successful" })
        } else {
             res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// All Orders data for Admin Panel
const allOrders = async (req,res) => {

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// User Order Data For Forntend
const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {verifyRazorpay, verifyStripe ,placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}