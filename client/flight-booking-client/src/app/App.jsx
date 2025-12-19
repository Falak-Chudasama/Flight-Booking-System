import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import pages from "../pages/pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<pages.SignIn />} />
                <Route path="/signup" element={<pages.SignUp />} />
                <Route path="/flights" element={<pages.Flights />} />
                <Route path="/booking/:id" element={<pages.Booking />} />
                <Route path="/bookings" element={<pages.BookingHistory />} />
                <Route path="/wallet" element={<pages.Wallet />} />
                <Route path="*" element={<Navigate to="/signin" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;