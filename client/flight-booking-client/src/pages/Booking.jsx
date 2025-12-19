import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle2,
    ExternalLink,
    Plane,
    ShieldCheck,
    ChevronRight
} from "lucide-react";
import apis from "../apis/apis";
import globals from "../globals/globals";

function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [flight, setFlight] = useState(null);
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        document.title = "Review Booking";
        loadFlight();
    }, [id]);

    const loadFlight = async () => {
        try {
            const flights = await apis.getFlights();
            const found = flights.find((f) => f._id === id);
            setFlight(found);
        } catch {
            console.error("Failed to load flight");
        }
    };

    const handleConfirmBooking = async () => {
        try {
            setLoading(true);
            const result = await apis.createBooking(id);
            setBooking(result);
        } catch {
            alert("Booking failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name = "") => {
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    if (!flight) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC]">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-200 rounded-2xl mb-4"></div>
                    <div className="h-4 w-32 bg-slate-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (booking) {
        return (
            <div className="min-h-screen w-full bg-[#F8FAFC] p-6 flex items-center justify-center font-sans antialiased">
                <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 overflow-hidden border border-slate-100">
                    <div className="bg-blue-600 p-10 text-center text-white relative">
                        <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                            <CheckCircle2 size={32} />
                        </div>
                        <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
                        <p className="text-blue-100 mt-1 opacity-90">Your trip to {booking.to} is all set.</p>
                    </div>

                    <div className="p-8">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center pb-6 border-b border-dashed border-slate-200">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">Booking PNR</p>
                                    <p className="text-lg font-mono font-bold text-slate-800 tracking-wider">{booking.pnr}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">Airline</p>
                                    <p className="text-lg font-bold text-slate-800">{booking.airline}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-4">
                                <div className="text-left">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">From</p>
                                    <p className="text-2xl font-black text-slate-900">{booking.from}</p>
                                </div>
                                <div className="flex flex-col items-center px-4 opacity-20">
                                    <Plane size={20} className="text-blue-600 rotate-90 mb-1" />
                                    <div className="w-16 h-[2px] bg-slate-400"></div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">To</p>
                                    <p className="text-2xl font-black text-slate-900">{booking.to}</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-5 flex justify-between items-center border border-slate-100">
                                <span className="font-semibold text-slate-600">Amount Paid</span>
                                <span className="text-2xl font-black text-blue-600 tracking-tighter">
                                    ₹{booking.amountPaid.toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>

                        <div className="mt-10 space-y-4">
                            <a
                                href={`${globals.serverOrigin}${booking.pdfPath}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 active:scale-[0.98] group"
                            >
                                <ExternalLink size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                                View E-Ticket
                            </a>

                            <Link to="/flights" className="block text-center text-slate-400 hover:text-blue-600 font-bold transition-colors text-sm uppercase tracking-widest">
                                Return to Search
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[#F8FAFC] p-6 flex items-center justify-center font-sans antialiased">
            <div className="w-full max-w-xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 font-bold text-sm uppercase tracking-widest group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 p-10 border border-slate-100">
                    <div className="flex items-center gap-5 mb-10 pb-8 border-b border-slate-50">
                        <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-100">
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Review Booking</h1>
                            <p className="text-slate-400 font-medium">Verify your flight details</p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="flex items-center gap-5">
                            <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl border border-slate-100 shadow-sm">
                                {getInitials(flight.airline)}
                            </div>
                            <div>
                                <p className="font-black text-slate-900 text-xl tracking-tight">{flight.airline}</p>
                                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mt-0.5">Flight No: {flight.flightId}</p>
                            </div>
                        </div>

                        <div className="relative py-8 px-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                            <div className="text-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Departure</p>
                                <p className="text-2xl font-black text-slate-800 tracking-tight">{flight.departureCity}</p>
                            </div>

                            <div className="flex flex-col items-center flex-1 px-6 opacity-20">
                                <Plane size={22} className="text-slate-600 rotate-90" />
                                <div className="w-full h-[2px] bg-slate-300"></div>
                            </div>

                            <div className="text-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Arrival</p>
                                <p className="text-2xl font-black text-slate-800 tracking-tight">{flight.arrivalCity}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-slate-500 font-bold text-sm uppercase tracking-wider">
                                <span>Base Fare</span>
                                <span className="text-slate-900">₹{flight.currentPrice.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-slate-500 font-bold text-sm uppercase tracking-wider">
                                <span>Processing Fee</span>
                                <span className="text-emerald-600">₹0</span>
                            </div>
                            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-lg font-black text-slate-900">Total Amount</span>
                                <span className="text-4xl font-black text-blue-600 tracking-tighter">
                                    ₹{flight.currentPrice.toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirmBooking}
                            disabled={loading}
                            className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${loading
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 active:scale-[0.98]"
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-6 h-6 border-3 border-slate-300 border-t-slate-600 animate-spin rounded-full"></div>
                                    Securely Booking...
                                </>
                            ) : (
                                <>
                                    Confirm and Pay
                                    <ChevronRight size={22} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;