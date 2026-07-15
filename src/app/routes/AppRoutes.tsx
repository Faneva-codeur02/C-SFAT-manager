import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import { appRoutes } from "./routes.config";

export default function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                {

                    appRoutes.map(route => {

                        const Component =
                            route.component;

                        if (!route.protected) {

                            return (

                                <Route

                                    key={route.path}

                                    path={route.path}

                                    element={<Component />}

                                />

                            );

                        }

                        return (

                            <Route

                                key={route.path}

                                path={route.path}

                                element={

                                    <ProtectedRoute

                                        permission={
                                            route.permission
                                        }

                                    >

                                        <Component />

                                    </ProtectedRoute>

                                }

                            />

                        );

                    })

                }

            </Routes>

        </BrowserRouter>
    );
}