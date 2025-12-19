import axios from "axios";
import globals from "../globals/globals";
import handleError from "../utils/errors.util";
import utils from "../utils/utils";

const axiosPublic = axios.create({
    baseURL: `${globals.serverOrigin}/api/`,
    withCredentials: true
});

const axiosAuth = axios.create({
    baseURL: `${globals.serverOrigin}/api/`,
    withCredentials: true
});

axiosAuth.interceptors.request.use((config) => {
    const token = utils.getTokenFromCookies();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

async function register(name, email, password) {
    try {
        const response = await axiosPublic.post("passengers/register", {
            name,
            email,
            password
        });

        if (!response.data.token) {
            throw Error("Registration failed");
        }

        utils.setTokenCookie(response.data.token);
        return response.data;
    } catch (err) {
        handleError(err);
        throw err;
    }
}

async function login(email, password) {
    try {
        const response = await axiosPublic.post("passengers/login", {
            email,
            password
        });

        if (!response.data.token) {
            throw Error("Login failed");
        }

        utils.setTokenCookie(response.data.token);
        return response.data;
    } catch (err) {
        handleError(err);
        throw err;
    }
}

async function getFlights(departureCity, arrivalCity) {
    try {
        const response = await axiosPublic.get("flights", {
            params: { departureCity, arrivalCity }
        });

        return response.data;
    } catch (err) {
        handleError(err);
        throw err;
    }
}

async function createBooking(flightId) {
    try {
        const response = await axiosAuth.post("bookings", { flightId });

        if (!response.data._id) {
            throw Error("Booking failed");
        }

        return response.data;
    } catch (err) {
        handleError(err);
        throw err;
    }
}

async function getBookings() {
    try {
        const response = await axiosAuth.get("bookings");
        return response.data;
    } catch (err) {
        handleError(err);
        throw err;
    }
}

async function downloadTicket(bookingId) {
    try {
        const response = await axiosAuth.get(`bookings/${bookingId}/ticket`, {
            responseType: "blob"
        });

        return response.data;
    } catch (err) {
        handleError(err);
        throw err;
    }
}

async function getWalletBalance() {
    try {
        const response = await axiosAuth.get("wallets/balance");
        return response.data;
    } catch (err) {
        handleError(err);
        throw err;
    }
}

async function addWalletBalance(amount) {
    try {
        const response = await axiosAuth.post("wallets/add-balance", { amount });
        return response.data;
    } catch (err) {
        handleError(err);
        throw err;
    }
}

function logout() {
    utils.clearTokenCookie();
}

const apis = {
    register,
    login,
    logout,

    getFlights,

    createBooking,
    getBookings,
    downloadTicket,

    getWalletBalance,
    addWalletBalance
};

export default apis;