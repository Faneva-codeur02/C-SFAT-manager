import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App";

import { ThemeProvider } from "./app/providers/ThemeProvider";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { SidebarProvider } from "@/shared/context/sidebar/SidebarContext";

createRoot(document.getElementById("root")!).render(

  <StrictMode>

    <ThemeProvider

      attribute="class"

      defaultTheme="light"

      enableSystem

      disableTransitionOnChange

    >

      <AuthProvider>

        <SidebarProvider>

          <App />

        </SidebarProvider>

      </AuthProvider>

    </ThemeProvider>

  </StrictMode>

);