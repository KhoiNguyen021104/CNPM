import SidebarLayout from "@/layouts/SidebarLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddScheduleForm from "@/form/ScheduleForm/AddScheduleForm";

function AddSchedule() {
  const navigation = useNavigate();
  return (
    <SidebarLayout>
      <h1 className='font-bold text-2xl text-center'>Add schedule</h1>
      <div className='flex gap-4'>
        <Button onClick={() => navigation("/schedules")}>
          <ArrowLeft width={20} height={20} />
          Back
        </Button>
      </div>
      <div className='mt-4'>
        <AddScheduleForm />
      </div>
    </SidebarLayout>
  );
}

export default AddSchedule;
