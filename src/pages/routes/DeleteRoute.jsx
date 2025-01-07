/* eslint-disable react/prop-types */
import { useToast } from "@/hooks/use-toast";
import { deleteRouteAPI } from "@/apis/apis";
import DeleteModal from "@/components/appComponents/modal/DeleteModal";

function DeleteVehicle({ open, setOpen, deleteRouteId }) {
  const { toast } = useToast();
  const handleDeleteRoute = async () => {
    await deleteRouteAPI(deleteRouteId);
    toast({
      title: "Delete route",
      description: <h1 className='font-bold text-sm'>Delete route successful</h1>,
    });
    setOpen(false);
  };
  return (
   <DeleteModal open={open} setOpen={setOpen} handleOK={handleDeleteRoute}/>
  );
}

export default DeleteVehicle;
