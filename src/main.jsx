// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter } from "react-router";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import AppSidebar from "./components/appComponents/app-sidebar";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      {/* <SidebarProvider> */}
        {/* <AppSidebar /> */}
        {/* <main> */}
          {/* <SidebarTrigger /> */}
          <App />
        {/* </main> */}
      {/* </SidebarProvider> */}
      <Toaster />
    </BrowserRouter>
  // </StrictMode>
);
