import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus, ArrowRight, ShieldCheck } from "lucide-react";
import apis from "../apis/apis";

function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focusedField, setFocusedField] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "Create Account";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) return;

        try {
            setLoading(true);
            await apis.register(name, email, password);
            navigate("/flights", { replace: true });
        } catch {
            alert("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full bg-white flex overflow-hidden font-sans antialiased">
            <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative p-16 flex-col justify-between overflow-hidden">
                <div className="relative z-10">

                    <h2 className="text-7xl font-black text-white leading-tight tracking-tighter italic">
                        START <br />
                        YOUR <br />
                        JOURNEY.
                    </h2>
                </div>

                <div className="relative z-10">
                    <p className="text-blue-100 text-3xl font-light max-w-sm leading-snug">
                        Simple. <br />
                        Fast. <br />
                        Reliable bookings.
                    </p>
                    <div className="mt-8 flex gap-2">
                        <div className="h-1 w-4 bg-white/30 rounded-full"></div>
                        <div className="h-1 w-12 bg-white rounded-full"></div>
                        <div className="h-1 w-4 bg-white/30 rounded-full"></div>
                    </div>
                </div>

                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-30 -ml-20 -mt-20"></div>
            </div>

            <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 bg-[#F8FAFC]">
                <div className="w-full max-w-md">
                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
                            Create Account
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Join us and book flights instantly.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                                Full Name
                            </label>
                            <div
                                className={`flex items-center bg-white border-2 rounded-2xl px-4 py-4 transition-all duration-300 ${focusedField === "name"
                                        ? "border-blue-600 shadow-xl shadow-blue-100/50"
                                        : "border-slate-100"
                                    }`}
                            >
                                <User size={20} className={`${focusedField === "name" ? "text-blue-600" : "text-slate-300"} transition-colors`} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onFocus={() => setFocusedField("name")}
                                    onBlur={() => setFocusedField(null)}
                                    className="bg-transparent outline-none w-full ml-3 text-slate-800 font-bold placeholder:text-slate-300"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                                Email Address
                            </label>
                            <div
                                className={`flex items-center bg-white border-2 rounded-2xl px-4 py-4 transition-all duration-300 ${focusedField === "email"
                                        ? "border-blue-600 shadow-xl shadow-blue-100/50"
                                        : "border-slate-100"
                                    }`}
                            >
                                <Mail size={20} className={`${focusedField === "email" ? "text-blue-600" : "text-slate-300"} transition-colors`} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField("email")}
                                    onBlur={() => setFocusedField(null)}
                                    className="bg-transparent outline-none w-full ml-3 text-slate-800 font-bold placeholder:text-slate-300"
                                    placeholder="name@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                                Password
                            </label>
                            <div
                                className={`flex items-center bg-white border-2 rounded-2xl px-4 py-4 transition-all duration-300 ${focusedField === "password"
                                        ? "border-blue-600 shadow-xl shadow-blue-100/50"
                                        : "border-slate-100"
                                    }`}
                            >
                                <Lock size={20} className={`${focusedField === "password" ? "text-blue-600" : "text-slate-300"} transition-colors`} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField("password")}
                                    onBlur={() => setFocusedField(null)}
                                    className="bg-transparent outline-none w-full ml-3 text-slate-800 font-bold placeholder:text-slate-300"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl ${loading
                                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 active:scale-[0.98]"
                                }`}
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-3 border-slate-300 border-t-slate-600 animate-spin rounded-full"></div>
                            ) : (
                                <>
                                    Create Account
                                    <UserPlus size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-2 pt-2 border-t border-slate-200">
                        <div className="flex flex-col items-center gap-4">
                            <Link
                                to="/signin"
                                className="group flex items-center gap-2 text-slate-900 hover:text-blue-600 font-black text-sm uppercase tracking-widest transition-colors"
                            >
                                Sign in instead
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;