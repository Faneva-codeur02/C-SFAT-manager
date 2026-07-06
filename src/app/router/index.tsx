import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

import Login from "../../features/auth/pages/Login";
import Dashboard from "../../features/dashboard/pages/Dashboard";
import Members from "@/features/members/pages/Members";
import Cotisations from "@/features/contributions/pages/Cotisations";
import Events from "@/features/events/pages/Events";
import Reports from "@/features/reports/pages/Reports";
import Register from "@/features/auth/pages/Register";
import Invitations from "@/features/invitations/pages/Invitations";
import RoleRoute from "@/features/auth/components/RoleRoute";
import Registrations from "@/features/registrations/pages/Registrations";
import ArchivedMembers from "@/features/members/pages/ArchivedMembers";

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

                    path="/registrations"

                    element={

                        <ProtectedRoute
                            permission="members.edit"
                        >

                            <Registrations />

                        </ProtectedRoute>

                    }

                />
                <Route

                    path="/members/archives"

                    element={<ArchivedMembers />}

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
                <Route path="/contributions" element={<ProtectedRoute><Cotisations /></ProtectedRoute>} />
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}