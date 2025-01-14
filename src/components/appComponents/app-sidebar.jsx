import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  Search,
  Settings,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logoutAPI } from "@/apis/apis";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Drivers",
    url: "/drivers",
    icon: Inbox,
  },
  {
    title: "Vehicles",
    url: "/vehicles",
    icon: Calendar,
  },
  {
    title: "Schedules",
    url: "/schedules",
    icon: Search,
  },
  {
    title: "Bookings",
    url: "/bookings",
    icon: Settings,
  },
  {
    title: "Routes",
    url: "/routes",
    icon: Settings,
  },
  {
    title: "Revenue",
    url: "/static",
    icon: Settings,
  },
];

function AppSidebar() {
  const { toast } = useToast();
  const navigation = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState();
  console.log("🚀 ~ AppSidebar ~ path:", path);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);
  const handleLogout = async () => {
    const resLogout = await logoutAPI();
    toast({
      title: "Logout",
      description: <h1 className='font-bold text-sm'>{resLogout.message}</h1>,
    });
    localStorage.removeItem("userInfo");
    navigation("/");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-xs text-wrap max-w'>
            Management Of Road Transport Vehicles
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className={
                        path?.includes(item?.url)
                          ? "!bg-slate-600 !hover:bg-slate-600 text-white !hover:text-white"
                          : "!hover:bg-slate-600 text-black"
                      }
                      to={item.url}
                    >
                      <item.icon
                        className={
                          path?.includes(item?.url)
                            ? "!bg-slate-600 !hover:bg-slate-600 text-white !hover:text-white"
                            : "!hover:bg-slate-600 text-black"
                        }
                      />
                      <span
                        className={
                          path?.includes(item?.url)
                            ? "!bg-slate-600 !hover:bg-slate-600 text-white !hover:text-white"
                            : "!hover:bg-slate-600 text-black"
                        }
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Admin
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='top'
                className='w-[--radix-popper-anchor-width]'
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
