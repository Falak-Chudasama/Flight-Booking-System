import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, PlaneTakeoff, PlaneLanding, Plane, ArrowRight, Info } from "lucide-react";
import apis from "../apis/apis";

function Flights() {
    const navigate = useNavigate();

    const [search, setSearch] = useState({ from: "", to: "" });
    const [focusedField, setFocusedField] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allFlights, setAllFlights] = useState([]);
    const [visibleFlights, setVisibleFlights] = useState([]);

    useEffect(() => {
        document.title = "Find Flights";
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            setLoading(true);
            const data = await apis.getFlights();
            const sorted = [...data].sort((a, b) => a.currentPrice - b.currentPrice);
            setAllFlights(sorted);
            setVisibleFlights(sorted);
        } catch {
            console.error("Failed to fetch flights");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const from = search.from.trim().toLowerCase();
        const to = search.to.trim().toLowerCase();

        const filtered = allFlights.filter((f) => {
            const matchFrom = !from || f.departureCity.toLowerCase().includes(from);
            const matchTo = !to || f.arrivalCity.toLowerCase().includes(to);
            return matchFrom && matchTo;
        });

        setVisibleFlights(filtered);
    };

    const getInitials = (name = "") => {
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    return (
        <div className="min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased">
            <div className="max-w-6xl mx-auto px-6 py-12">

                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                            Find your next <span className="text-blue-600">adventure</span>
                        </h1>
                        <p className="text-slate-500 mt-2 text-lg">
                            Compare the best prices across multiple airlines.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSearch}
                        className="flex flex-wrap md:flex-nowrap items-center bg-white p-2 rounded-2xl shadow-sm border border-slate-200 gap-2"
                    >
                        <div className={`flex items-center px-4 py-2 rounded-xl transition-all duration-200 border ${focusedField === 'from' ? 'border-blue-500 bg-blue-50/30' : 'border-transparent'}`}>
                            <PlaneTakeoff size={18} className="text-slate-400 mr-3" />
                            <input
                                type="text"
                                placeholder="From where?"
                                className="bg-transparent outline-none text-sm font-medium w-32 md:w-40"
                                value={search.from}
                                onChange={(e) => setSearch({ ...search, from: e.target.value })}
                                onFocus={() => setFocusedField('from')}
                                onBlur={() => setFocusedField(null)}
                            />
                        </div>

                        <div className="hidden md:block h-6 w-[1px] bg-slate-200" />

                        <div className={`flex items-center px-4 py-2 rounded-xl transition-all duration-200 border ${focusedField === 'to' ? 'border-blue-500 bg-blue-50/30' : 'border-transparent'}`}>
                            <PlaneLanding size={18} className="text-slate-400 mr-3" />
                            <input
                                type="text"
                                placeholder="Where to?"
                                className="bg-transparent outline-none text-sm font-medium w-32 md:w-40"
                                value={search.to}
                                onChange={(e) => setSearch({ ...search, to: e.target.value })}
                                onFocus={() => setFocusedField('to')}
                                onBlur={() => setFocusedField(null)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-200"
                        >
                            <Search size={18} />
                            <span>Search</span>
                        </button>
                    </form>
                </header>

                <div className="space-y-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                            <p className="font-medium">Fetching the best deals...</p>
                        </div>
                    ) : visibleFlights.length === 0 ? (
                        <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-slate-200">
                            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Info className="text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800">No flights found</h3>
                            <p className="text-slate-500">Try adjusting your search filters or cities.</p>
                        </div>
                    ) : (
                        visibleFlights.map((flight) => {
                            const surged = flight.currentPrice > flight.basePrice;

                            return (
                                <div
                                    key={flight._id}
                                    className="group bg-white border border-slate-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200"
                                >
                                    <div className="flex items-center gap-6 w-full md:w-auto">
                                        <div className="h-16 w-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-xl border border-blue-100 group-hover:scale-110 transition-transform duration-300">
                                            {getInitials(flight.airline)}
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl font-bold text-slate-800 tracking-tight">
                                                    {flight.airline}
                                                </span>
                                                {surged && (
                                                    <span className="bg-amber-100 text-amber-700 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md">
                                                        High Demand
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3 mt-2 text-slate-600 font-medium">
                                                <span>{flight.departureCity}</span>
                                                <ArrowRight size={14} className="text-slate-300" />
                                                <span>{flight.arrivalCity}</span>
                                            </div>

                                            <span className="text-xs text-slate-400 mt-2 font-mono uppercase tracking-widest">
                                                Ref: {flight.flightId}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-10 mt-6 md:mt-0 w-full md:w-auto border-t md:border-t-0 pt-6 md:pt-0">
                                        <div className="text-right">
                                            <div className="text-3xl font-black text-slate-900 tracking-tighter">
                                                ₹{flight.currentPrice.toLocaleString("en-IN")}
                                            </div>
                                            <div className="flex items-center justify-end gap-2 mt-1">
                                                {surged ? (
                                                    <span className="text-xs text-slate-400">
                                                        Was <span className="line-through">₹{flight.basePrice}</span>
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                                                        Best Value
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/booking/${flight._id}`)}
                                            className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold transition-all duration-300 active:scale-95 shadow-md"
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default Flights;