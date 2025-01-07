/* eslint-disable react/prop-types */
import { deleteScheduleAPI } from "@/apis/apis";
import DeleteModal from "@/components/appComponents/modal/DeleteModal";
import { useToast } from "@/hooks/use-toast";

function DeleteSchedule({ open, setOpen, deleteScheduleId }) {
  const { toast } = useToast();
  const handleDeleteVehicle = async () => {
    await deleteScheduleAPI(deleteScheduleId);
    toast({
      title: "Delete vehicle",
      description: <h1 className='font-bold text-sm'>Delete schedule successful</h1>,
    });
    setOpen(false);
  };
  return (
   <DeleteModal open={open} setOpen={setOpen} handleOK={handleDeleteVehicle}/>
  );
}

export default DeleteSchedule;
