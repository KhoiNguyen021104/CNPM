/* eslint-disable react/prop-types */
import { deleteDriverAPI } from "@/apis/apis";
import DeleteModal from "@/components/appComponents/modal/DeleteModal";
import { useToast } from "@/hooks/use-toast";

function DeleteDriver({ open, setOpen, deleteDriverId }) {
  const { toast } = useToast();
  const handleDeleteDriver = async () => {
    await deleteDriverAPI(deleteDriverId);
    toast({
      title: "Delete driver",
      description: <h1 className='font-bold text-sm'>Delete driver successful</h1>,
    });
    setOpen(false);
  };
  return (
   <DeleteModal open={open} setOpen={setOpen} handleOK={handleDeleteDriver}/>
  );
}

export default DeleteDriver;
