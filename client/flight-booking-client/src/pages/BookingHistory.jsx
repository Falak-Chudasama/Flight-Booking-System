import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Clock,
    Plane,
    ArrowRight,
    ExternalLink,
    Calendar,
    Hash,
    ArrowLeft,
    Search
} from "lucide-react";
import apis from "../apis/apis";

function BookingHistory() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "SkyPass | Booking History";
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const data = await apis.getBookings();
            setBookings(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch {
            console.error("Failed to fetch history");
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name = "") => {
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen w-full bg-[#F8FAFC] font-sans antialiased text-slate-900">
            <div className="max-w-5xl mx-auto px-6 py-12">

                <header className="mb-12">
                    <button
                        onClick={() => navigate("/flights")}
                        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-6 font-bold text-xs uppercase tracking-[0.2em] group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Search
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-blue-600 p-2 rounded-lg text-white">
                                    <Clock size={24} />
                                </div>
                                <h1 className="text-4xl font-black tracking-tight text-slate-900">
                                    Booking History
                                </h1>
                            </div>
                            <p className="text-slate-500 font-medium">Manage and track your previous expeditions</p>
                        </div>

                        <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Trips</span>
                            <span className="text-xl font-black text-blue-600">{bookings.length}</span>
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 animate-spin rounded-full mb-4"></div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Retrieving Archives...</p>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-20 text-center border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <Search size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">No adventures found</h3>
                        <p className="text-slate-500 mt-2 mb-8 max-w-xs mx-auto">You haven't booked any flights yet. Ready to start your journey?</p>
                        <Link
                            to="/flights"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg shadow-blue-200 active:scale-95"
                        >
                            Book My First Flight
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="group bg-white border border-slate-100 rounded-[2rem] p-8 flex flex-col lg:flex-row lg:items-center justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                        {getInitials(booking.airline)}
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h2 className="text-xl font-black text-slate-900 tracking-tight">
                                                {booking.airline}
                                            </h2>
                                            <span className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                                <Hash size={10} />
                                                {booking.pnr}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 text-slate-600 font-bold">
                                            <span className="text-lg uppercase tracking-tight">{booking.from}</span>
                                            <div className="flex items-center gap-1 opacity-30">
                                                <div className="w-4 h-[2px] bg-slate-400"></div>
                                                <Plane size={14} className="rotate-90" />
                                                <div className="w-4 h-[2px] bg-slate-400"></div>
                                            </div>
                                            <span className="text-lg uppercase tracking-tight">{booking.to}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap lg:flex-nowrap items-center gap-8 mt-8 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Calendar size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Booked On</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-700">{formatDate(booking.createdAt)}</p>
                                    </div>

                                    <div className="text-left lg:text-right min-w-[120px]">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Paid</p>
                                        <p className="text-2xl font-black text-slate-900 tracking-tighter">
                                            ₹{booking.amountPaid.toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                    <a
                                        href={booking.pdfPath}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-6 py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-slate-200 active:scale-95"
                                    >
                                        <ExternalLink size={16} />
                                        View Ticket
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <footer className="mt-16 pt-8 border-t border-slate-200 text-center">
                    <Link
                        to="/flights"
                        className="text-slate-400 hover:text-blue-600 font-black text-xs uppercase tracking-[0.3em] transition-colors"
                    >
                        Explore More Destinations
                    </Link>
                </footer>
            </div>
        </div>
    );
}

export default BookingHistory;