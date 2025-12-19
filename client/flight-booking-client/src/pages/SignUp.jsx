import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import apis from "../apis/apis";

function SignUp() {
    const navigate = useNavigate();

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [nameActive, setNameActive] = useState(false);
    const [emailActive, setEmailActive] = useState(false);
    const [passwordActive, setPasswordActive] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "Flight Booking | Sign Up";
        nameRef.current?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = nameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        if (!name || !email || !password) return;

        try {
            setLoading(true);
            await apis.register(name, email, password);
            navigate("/flights", { replace: true });
        } catch {
            alert("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const fieldClass = "h-13 border-3 rounded-full relative flex justify-end duration-300";
    const inputClass = "text-lg font-medium bg-transparent outline-none duration-300";
    const textClass = "text-lg absolute px-1 top-[-1.1rem] left-5 bg-white duration-300";

    return (
        <div className="h-screen w-screen bg-white p-4 flex items-center justify-between overflow-hidden select-none">
            <div className="h-full w-[48%] p-6 rounded-2xl bg-blue-600 relative">
                <p className="text-3xl font-light text-white absolute bottom-10">
                    Simple.
                    <br />
                    Fast.
                    <br />
                    Reliable bookings.
                </p>
            </div>

            <div className="h-fit w-[50%] p-6 grid gap-y-12 place-items-center">
                <div className="grid place-items-center gap-y-3">
                    <h1 className="text-blue-600 font-semibold text-6xl">Create Account</h1>
                    <h3 className="text-blue-400 font-light text-3xl">Book flights instantly</h3>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="min-w-90 max-w-100 grid place-items-center gap-y-4"
                >
                    <div className={`w-full ${nameActive ? "border-blue-600" : "border-blue-300"} ${fieldClass}`}>
                        <p className={`${textClass} ${nameActive ? "text-blue-600" : "text-blue-300"}`}>
                            Full name
                        </p>
                        <input
                            ref={nameRef}
                            onFocus={() => setNameActive(true)}
                            onBlur={() => setNameActive(false)}
                            className={`w-14/15 ${nameActive ? "text-blue-600" : "text-blue-300"} ${inputClass}`}
                            type="text"
                            required
                        />
                    </div>

                    <div className={`w-full ${emailActive ? "border-blue-600" : "border-blue-300"} ${fieldClass}`}>
                        <p className={`${textClass} ${emailActive ? "text-blue-600" : "text-blue-300"}`}>
                            Email address
                        </p>
                        <input
                            ref={emailRef}
                            onFocus={() => setEmailActive(true)}
                            onBlur={() => setEmailActive(false)}
                            className={`w-14/15 ${emailActive ? "text-blue-600" : "text-blue-300"} ${inputClass}`}
                            type="email"
                            required
                        />
                    </div>

                    <div className={`w-full ${passwordActive ? "border-blue-600" : "border-blue-300"} ${fieldClass}`}>
                        <p className={`${textClass} ${passwordActive ? "text-blue-600" : "text-blue-300"}`}>
                            Password
                        </p>
                        <input
                            ref={passwordRef}
                            onFocus={() => setPasswordActive(true)}
                            onBlur={() => setPasswordActive(false)}
                            className={`w-14/15 ${passwordActive ? "text-blue-600" : "text-blue-300"} ${inputClass}`}
                            type="password"
                            required
                        />
                    </div>

                    <div className="grid w-full gap-y-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full py-2 rounded-full
                                border-3 border-blue-300
                                bg-blue-50 hover:bg-blue-100
                                text-2xl font-medium
                                duration-300
                            "
                        >
                            {loading ? "Creating..." : "Sign Up"}
                        </button>

                        <span className="text-center text-lg">
                            <Link to="/signin" className="text-blue-600 underline">
                                Sign in
                            </Link>{" "}
                            if already registered
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;