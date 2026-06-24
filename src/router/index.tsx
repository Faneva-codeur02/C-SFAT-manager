import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Members from "@/pages/members/Members";
import Cotisations from "@/pages/cotisations/Cotisations";
import Events from "@/pages/events/Events";
import Reports from "@/pages/reports/Reports";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>}
                />
                <Route path="/members" element={<Members />} />
                <Route path="/cotisations" element={<Cotisations />} />
                <Route path="/events" element={<Events />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
        </BrowserRouter>
    );
}