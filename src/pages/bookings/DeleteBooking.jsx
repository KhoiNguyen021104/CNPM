/* eslint-disable react/prop-types */
import { deleteBookingAPI } from "@/apis/apis";
import DeleteModal from "@/components/appComponents/modal/DeleteModal";
import { useToast } from "@/hooks/use-toast";

function DeleteBooking({ open, setOpen, deleteBookingId }) {
  const { toast } = useToast();
  const handleDeleteBooking = async () => {
    await deleteBookingAPI(deleteBookingId);
    toast({
      title: "Delete booking",
      description: <h1 className='font-bold text-sm'>Delete booking successful</h1>,
    });
    setOpen(false);
  };
  return (
   <DeleteModal open={open} setOpen={setOpen} handleOK={handleDeleteBooking}/>
  );
}

export default DeleteBooking;
