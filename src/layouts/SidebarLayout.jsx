/* eslint-disable react/prop-types */
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/appComponents/app-sidebar";
import { useEffect } from "react";
import authorizedAxiosInstance from "@/utils/authorizeAxios";
import { API_ROOT } from "@/utils/constants";
import { useLocation } from "react-router-dom";

function SidebarLayout({ children }) {
  const location = useLocation()
  const userInfo = location.state
  useEffect(() => {
    const fetchAccess = async () => {
      await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/access`)
    }
    fetchAccess()
  }, [])
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className='container mx-8 my-14 w-full'>{children}</div>
    </SidebarProvider>
  );
}

export default SidebarLayout;
