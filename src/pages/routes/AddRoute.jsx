import SidebarLayout from "@/layouts/SidebarLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddRouteForm from "@/form/RouteForm/AddRouteForm";

function AddRoute() {
  const navigation = useNavigate();
  return (
    <SidebarLayout>
      <h1 className='font-bold text-2xl text-center'>Add route</h1>
      <div className='flex gap-4'>
        <Button onClick={() => navigation("/routes")}>
          <ArrowLeft width={20} height={20} />
          Back
        </Button>
      </div>
      <div className='mt-4'>
        <AddRouteForm />
      </div>
    </SidebarLayout>
  );
}

export default AddRoute;
