/* eslint-disable react/prop-types */
import { deleteVehicleAPI } from "@/apis/apis";
import DeleteModal from "@/components/appComponents/modal/DeleteModal";
import { useToast } from "@/hooks/use-toast";

function DeleteVehicle({ open, setOpen, deleteVehicleId }) {
  const { toast } = useToast();
  const handleDeleteVehicle = async () => {
    await deleteVehicleAPI(deleteVehicleId);
    toast({
      title: "Delete vehicle",
      description: <h1 className='font-bold text-sm'>Delete vehicle successful</h1>,
    });
    setOpen(false);
  };
  return (
   <DeleteModal open={open} setOpen={setOpen} handleOK={handleDeleteVehicle}/>
  );
}

export default DeleteVehicle;
