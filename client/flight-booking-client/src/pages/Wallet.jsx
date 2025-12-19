import React, { useEffect, useState } from "react";
import {
    Wallet as WalletIcon,
    Plus,
    ArrowLeft,
    ShieldCheck,
    TrendingUp,
    CreditCard,
    ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import apis from "../apis/apis";

function Wallet() {
    const navigate = useNavigate();
    const [wallet, setWallet] = useState(null);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        document.title = "Wallet | SkyPass";
        fetchWallet();
    }, []);

    const fetchWallet = async () => {
        try {
            const data = await apis.getWalletBalance();
            setWallet(data);
        } catch {
            console.error("Failed to fetch balance");
        }
    };

    const handleAddBalance = async (e) => {
        if (e) e.preventDefault();

        const value = Number(amount);
        if (!value || value <= 0) return;

        try {
            setLoading(true);
            const updated = await apis.addWalletBalance(value);
            setWallet(updated);
            setAmount("");
        } catch {
            alert("Transaction failed. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    if (!wallet) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC]">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-200 rounded-3xl mb-4"></div>
                    <div className="h-4 w-32 bg-slate-200 rounded-full"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[#F8FAFC] font-sans antialiased text-slate-900">
            <div className="max-w-4xl mx-auto px-6 py-12">

                <header className="mb-12">
                    <button
                        onClick={() => navigate("/flights")}
                        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-6 font-bold text-xs uppercase tracking-[0.2em] group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Dashboard
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-xl shadow-blue-100">
                            <WalletIcon size={28} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-slate-900">
                                Digital Wallet
                            </h1>
                            <p className="text-slate-500 font-medium">Manage your funds and travel credits</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">Available Balance</p>
                                <h2 className="text-6xl font-black tracking-tighter">
                                    ₹{wallet.balance.toLocaleString("en-IN")}
                                </h2>
                            </div>

                            <div className="mt-12 flex items-center gap-4">
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2">
                                    <TrendingUp size={16} className="text-emerald-400" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Verified Account</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl">
                                    <CreditCard size={18} className="text-blue-400" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500 rounded-full blur-[80px] opacity-10 -ml-10 -mb-10"></div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
                        <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Add Funds</h3>

                        <form onSubmit={handleAddBalance} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                                    Amount (INR)
                                </label>
                                <div
                                    className={`flex items-center bg-slate-50 border-2 rounded-2xl px-5 py-4 transition-all duration-300 ${focused
                                            ? "border-blue-600 bg-white shadow-xl shadow-blue-100/50"
                                            : "border-transparent"
                                        }`}
                                >
                                    <span className={`text-xl font-black mr-2 ${focused ? "text-blue-600" : "text-slate-300"}`}>₹</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                        placeholder="0.00"
                                        className="bg-transparent outline-none w-full text-2xl font-black text-slate-800 placeholder:text-slate-200"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                {[500, 1000, 5000].map((preset) => (
                                    <button
                                        key={preset}
                                        type="button"
                                        onClick={() => setAmount(preset.toString())}
                                        className="py-3 px-2 rounded-xl border-2 border-slate-100 text-slate-600 font-bold text-xs hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95"
                                    >
                                        +₹{preset}
                                    </button>
                                ))}
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
                                        Deposit Funds
                                        <Plus size={20} strokeWidth={3} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wallet;