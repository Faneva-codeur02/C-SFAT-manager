import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Members from "@/pages/members/Members";
import Cotisations from "@/pages/cotisations/Cotisations";
import Events from "@/pages/events/Events";
import Reports from "@/pages/reports/Reports";
import Register from "@/pages/auth/Register";
import Invitations from "@/pages/invitations/Invitations";
import RoleRoute from "@/components/auth/RoleRoute";
import Registrations from "@/pages/admin/Registrations";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>}
                />
                <Route

                    path="/admin/registrations"

                    element={

                        <ProtectedRoute
                            permission="members.edit"
                        >

                            <Registrations />

                        </ProtectedRoute>

                    }

                />
                <Route
                    path="/invitations"
                    element={
                        <ProtectedRoute>
                            <RoleRoute allowedRoles={["admin"]}>
                                <Invitations />
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />
                <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
                <Route path="/cotisations" element={<ProtectedRoute><Cotisations /></ProtectedRoute>} />
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}