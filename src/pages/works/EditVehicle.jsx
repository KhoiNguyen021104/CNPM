import SidebarLayout from "@/layouts/SidebarLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditVehicleForm from "@/form/VehicleForm/EditVehicleForm";

function EditVehicle() {
  const navigation = useNavigate();
  return (
    <SidebarLayout>
      <h1 className='font-bold text-2xl text-center'>Edit vehicle</h1>
      <div className='flex gap-4'>
        <Button onClick={() => navigation("/vehicles")}>
          <ArrowLeft width={20} height={20} />
          Back
        </Button>
      </div>
      <div className='mt-4'>
        <EditVehicleForm />
      </div>
    </SidebarLayout>
  );
}

export default EditVehicle;
