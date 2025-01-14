import SidebarLayout from "@/layouts/SidebarLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditBookingForm from "@/form/BookingForm/EditBookingForm";

function EditBooking() {
  const navigation = useNavigate();
  return (
    <SidebarLayout>
      <h1 className='font-bold text-2xl text-center'>Edit booking</h1>
      <div className='flex gap-4'>
        <Button onClick={() => navigation("/bookings")}>
          <ArrowLeft width={20} height={20} />
          Back
        </Button>
      </div>
      <div className='mt-4'>
        <EditBookingForm />
      </div>
    </SidebarLayout>
  );
}

export default EditBooking;
