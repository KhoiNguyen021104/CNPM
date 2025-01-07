import SidebarLayout from "@/layouts/SidebarLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AddDriverForm from "@/form/DriverForm/AddDriverForm";
import { useNavigate } from "react-router-dom";

function AddDriver() {
  const navigation = useNavigate();
  return (
    <SidebarLayout>
      <h1 className='font-bold text-2xl text-center'>AddDriver</h1>
      <div className='flex gap-4'>
        <Button onClick={() => navigation("/drivers")}>
          <ArrowLeft width={20} height={20} />
          Back
        </Button>
      </div>
      <div className='mt-4'>
        <AddDriverForm />
      </div>
    </SidebarLayout>
  );
}

export default AddDriver;
