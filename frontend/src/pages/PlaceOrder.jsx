import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [sameAsBilling, setSameAsBilling] = useState(true);

    const [billingAddress, setBillingAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        phone: '',
    });

    const [shippingAddress, setShippingAddress] = useState({
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        phone: '',
    });

    const onChangeHandler = (event, setFunction) => {
        const { name, value } = event.target;
        setFunction((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            let orderItems = [];
            for (const itemId in cartItems) {
                if (cartItems[itemId] > 0) {
                    const itemInfo = structuredClone(products.find((product) => product._id === itemId));
                    if (itemInfo) {
                        itemInfo.quantity = cartItems[itemId];
                        orderItems.push(itemInfo);
                    }
                }
            }

            let orderData = {
                billingAddress,
                shippingAddress: sameAsBilling ? billingAddress : shippingAddress,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                paymentMethod: method
            };

            const response = await axios.post(backendUrl + `/api/order/place`, orderData, { headers: { token } });
            if (response.data.success) {
                setCartItems({});
                navigate('/orders');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <Title text1={'BILLING'} text2={'ADDRESS'} />
                <input required onChange={(e) => onChangeHandler(e, setBillingAddress)} name="firstName" value={billingAddress.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" />
                <input required onChange={(e) => onChangeHandler(e, setBillingAddress)} name="lastName" value={billingAddress.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
                <input required onChange={(e) => onChangeHandler(e, setBillingAddress)} name="email" value={billingAddress.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />
                <input required onChange={(e) => onChangeHandler(e, setBillingAddress)} name="street" value={billingAddress.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />
                <input required onChange={(e) => onChangeHandler(e, setBillingAddress)} name="city" value={billingAddress.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
                <input required onChange={(e) => onChangeHandler(e, setBillingAddress)} name="state" value={billingAddress.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
                <input required onChange={(e) => onChangeHandler(e, setBillingAddress)} name="pincode" value={billingAddress.pincode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Pincode" />
                <input required onChange={(e) => onChangeHandler(e, setBillingAddress)} name="phone" value={billingAddress.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={sameAsBilling} onChange={() => setSameAsBilling(!sameAsBilling)} />
                    Shipping address is same as billing
                </label>
                {!sameAsBilling && (
                    <>
                    <Title text1={'SHIPPING'} text2={'ADDRESS'} />
                    <input required onChange={(e) => onChangeHandler(e, setBillingAddress)} name="firstName" value={billingAddress.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" />
                <input required onChange={(e) => onChangeHandler(e, setBillingAddress)} name="lastName" value={billingAddress.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
                    <input required onChange={(e) => onChangeHandler(e, setShippingAddress)} name="street" value={shippingAddress.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />
                    <input required onChange={(e) => onChangeHandler(e, setShippingAddress)} name="city" value={shippingAddress.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
                    <input required onChange={(e) => onChangeHandler(e, setShippingAddress)} name="state" value={shippingAddress.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
                    <input required onChange={(e) => onChangeHandler(e, setShippingAddress)} name="pincode" value={shippingAddress.pincode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Pincode" />
                    <input required onChange={(e) => onChangeHandler(e, setShippingAddress)} name="phone" value={shippingAddress.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
                </>
                )}
            </div>
            <div className="mt-8">
                <CartTotal />
                <div className="mt-12">
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                        </div>
                    </div>
                    <div className="w-full text-end mt-8">
                        <button type="submit" className="bg-black text-white px-16 py-3 text-sm">
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;