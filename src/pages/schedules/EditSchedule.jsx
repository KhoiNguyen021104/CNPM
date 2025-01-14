import SidebarLayout from "@/layouts/SidebarLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditScheduleForm from "@/form/ScheduleForm/EditScheduleForm";

function EditSchedule() {
  const navigation = useNavigate();
  return (
    <SidebarLayout>
      <h1 className='font-bold text-2xl text-center'>Edit schedule</h1>
      <div className='flex gap-4'>
        <Button onClick={() => navigation("/schedules")}>
          <ArrowLeft width={20} height={20} />
          Back
        </Button>
      </div>
      <div className='mt-4'>
        <EditScheduleForm />
      </div>
    </SidebarLayout>
  );
}

export default EditSchedule;
