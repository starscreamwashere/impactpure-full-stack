import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons


const Login = () => {
    const [currentState, setCurrentState] = useState("Login");
    const { setToken, navigate, backendUrl } = useContext(ShopContext);

    const [identifier, setIdentifier] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("+91 ");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(30);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [newPassword, setNewPassword] = useState(""); // New password for forgot password
    const [forgotPassword, setForgotPassword] = useState(false);


    // Format phone number to ensure it starts with +91
    const formatPhoneNumber = (number) => {
        if (!number.startsWith("+91 ")) {
            return `+91 ${number.replace("+91", "").trim()}`;
        }
        return number;
    };

    // Start the resend timer
    const startResendTimer = () => {
        setResendDisabled(true);
        setTimer(30);
        const countdown = setInterval(() => {
            setTimer((prev) => {
                console.log("Timer countdown:", prev); // Debugging the timer
                if (prev <= 1) {
                    clearInterval(countdown);
                    setResendDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Handle sending OTP
    const sendOtpHandler = async () => {
        const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
        console.log("Attempting to send OTP to:", formattedPhoneNumber); // Debugging

        try {
            const response = await axios.post(`${backendUrl}/api/user/send-otp`, {
                phoneNumber: formattedPhoneNumber,
            });
            console.log("Response from backend:", response.data); // Debugging response

            if (response.data.success) {
                toast.success("OTP sent to your phone.");
                setOtpSent(true);
                startResendTimer();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error in sendOtpHandler:", error); // Debugging errors
            toast.error("Failed to send OTP.");
        }
    };

    // Handle verifying OTP
    const verifyOtpHandler = async () => {
        const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
        console.log("Attempting to verify OTP for:", formattedPhoneNumber); // Debugging

        try {
            const response = await axios.post(`${backendUrl}/api/user/verify-otp`, {
                phoneNumber: formattedPhoneNumber,
                otp,
            });

            if (response.data.success) {
                toast.success("Phone number verified!");
                setIsOtpVerified(true); // Mark OTP as verified
                setOtpSent(false); // Reset OTP state
            } else {
                toast.error(response.data.message);
                setIsOtpVerified(false);
            }
        } catch (error) {
            console.error("Error in verifyOtpHandler:", error); // Debugging errors
            toast.error("OTP verification failed.");
            setIsOtpVerified(false);
        }
    };

    const resetPasswordHandler = async () => {
        const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
        if (!isOtpVerified) {
            toast.error("Please verify your OTP before resetting your password.");
            return;
        }
        try {
            const response = await axios.post(`${backendUrl}/api/user/reset-password`, {
                phoneNumber: formattedPhoneNumber,
                newPassword,
            });
            if (response.data.success) {
                toast.success("Password reset successfully!");
                setForgotPassword(false);
                setCurrentState("Login");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to reset password.");
        }
    };


    // Handle form submission for login or signup
    const onSubmitHandler = async (event) => {
        if (event) event.preventDefault();

        if (currentState === "Sign Up") {
            if (!isOtpVerified) {
                toast.error("Please verify your OTP before proceeding.");
                return;
            }

            try {
                const response = await axios.post(`${backendUrl}/api/user/register`, {
                    name,
                    email,
                    password,
                    phoneNumber: formatPhoneNumber(phoneNumber),
                });

                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    navigate("/");
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error("Error in registration:", error); // Debugging errors
                toast.error("Registration failed.");
            }
        } else {
            try {
                const response = await axios.post(`${backendUrl}/api/user/login`, {
                    identifier,
                    password,
                });

                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    navigate("/");
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error("Error in login:", error); // Debugging errors
                toast.error("Login failed.");
            }
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
        >
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="prata-regular text-3xl">
                    {forgotPassword ? "Forgot Password" : currentState}
                </p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>
            {forgotPassword ? (
                <>
                    {/* Forgot Password Flow */}
                    <div className="flex flex-wrap items-center w-full gap-2">
                        <input
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                            type="text"
                            className="flex-1 px-3 py-2 border border-gray-800"
                            placeholder="Phone Number (starts with +91)"
                            required
                            disabled={isOtpVerified} // Disable input after verification
                        />
                        {!isOtpVerified && (
                            <button
                                type="button"
                                onClick={sendOtpHandler}
                                className={`px-6 py-2 w-35 h-10 ${resendDisabled ? "bg-gray-400 text-gray-800" : "bg-black text-white"}`}
                                disabled={resendDisabled}
                            >
                                Send OTP
                            </button>
                        )}
                    </div>

                    {!isOtpVerified && resendDisabled && (
                        <div className="w-full text-center mt-2">
                            <p className="text-sm text-gray-500">
                                Resend OTP in {timer} seconds
                            </p>
                        </div>
                    )}

                    {otpSent && !isOtpVerified && (
                        <div className="flex flex-wrap items-center w-full gap-2">
                            <input
                                onChange={(e) => setOtp(e.target.value)}
                                value={otp}
                                type="text"
                                className="flex-1 px-3 py-2 border border-gray-800"
                                placeholder="Enter OTP"
                                required
                            />
                            <button
                                type="button"
                                onClick={verifyOtpHandler}
                                className="bg-black text-white px-6 py-2 w-35 h-10"
                            >
                                Verify OTP
                            </button>
                        </div>
                    )}

                    {isOtpVerified && (
                        <div className="w-full relative">
                            <input
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                type={showPassword ? "text" : "password"}
                                className="w-full px-3 py-2 border border-gray-800"
                                placeholder="New Password"
                                required
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>

                        </div>

                    )}

                    <button
                        type="button"
                        onClick={resetPasswordHandler}
                        className="bg-black text-white px-6 py-2 mt-4"
                    >
                        Reset Password
                    </button>

                    <p
                        onClick={() => setForgotPassword(false)}
                        className="cursor-pointer text-sm text-gray-600 mt-2"
                    >
                        Back to Login
                    </p>
                </>
            ) : (
                <>
                    {currentState === "Login" ? (
                        <>
                            {/* Login Flow */}
                            <input
                                onChange={(e) => setIdentifier(e.target.value)}
                                value={identifier}
                                type="text"
                                className="w-full px-3 py-2 border border-gray-800"
                                placeholder="Email or Phone Number"
                                required
                            />
                            <div className="w-full relative">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 border border-gray-800"
                                    placeholder="Password"
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            <div className="w-full flex justify-between text-sm mt-[-8px]">
                                {/* Navigation to Forgot Password */}
                                <p
                                    onClick={() => setForgotPassword(true)}
                                    className="cursor-pointer"
                                >
                                    Forgot your password?
                                </p>
                                {/* Navigation to Sign Up */}
                                <p
                                    onClick={() => setCurrentState("Sign Up")}
                                    className="cursor-pointer"
                                >
                                    Create account
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Sign Up Flow */}
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                className="w-full px-3 py-2 border border-gray-800"
                                placeholder="Name"
                                required
                            />
                            <div className="flex flex-wrap items-center w-full gap-2">
                                <input
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    value={phoneNumber}
                                    type="text"
                                    className="flex-1 px-3 py-2 border border-gray-800"
                                    placeholder="Phone Number (starts with +91)"
                                    required
                                    disabled={isOtpVerified}
                                />
                                {!isOtpVerified && (
                                    <button
                                        type="button"
                                        onClick={sendOtpHandler}
                                        className={`px-6 py-2 w-35 h-10 ${resendDisabled ? "bg-gray-400 text-gray-800" : "bg-black text-white"}`}
                                        disabled={resendDisabled}
                                    >
                                        Send OTP
                                    </button>
                                )}
                            </div>
                            {!isOtpVerified && resendDisabled && (
                                <div className="w-full text-center mt-2">
                                    <p className="text-sm text-gray-500">
                                        Resend OTP in {timer} seconds
                                    </p>
                                </div>
                            )}
                            {otpSent && !isOtpVerified && (
                                <div className="flex flex-wrap items-center w-full gap-2">
                                    <input
                                        onChange={(e) => setOtp(e.target.value)}
                                        value={otp}
                                        type="text"
                                        className="flex-1 px-3 py-2 border border-gray-800"
                                        placeholder="Enter OTP"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={verifyOtpHandler}
                                        className="bg-black text-white px-6 py-2 w-35 h-10"
                                    >
                                        Verify OTP
                                    </button>
                                </div>
                            )}
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                className="w-full px-3 py-2 border border-gray-800"
                                placeholder="Email"
                                required
                            />
                            <div className="w-full relative">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 border border-gray-800"
                                    placeholder="Set Password"
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            {/* Navigation back to Login */}
                            <p
                                onClick={() => setCurrentState("Login")}
                                className="cursor-pointer text-sm text-gray-600 mt-2"
                            >
                                Already have an account? Login Here
                            </p>
                        </>
                    )}
                    <button className="bg-black text-white font-light px-8 py-2 mt-4">
                        {currentState === "Login" ? "Sign In" : "Sign Up"}
                    </button>
                </>
            )}
        </form>
    );



};

export default Login;