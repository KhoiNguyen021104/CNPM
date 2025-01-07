import SidebarLayout from "@/layouts/SidebarLayout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Edit, Plus, RefreshCcw, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { convertTime, formatDateTime, slugify } from "@/utils/formatters";
import SearchComponent from "@/components/appComponents/search/SearchComponent";
import DeleteVehicle from "./DeleteVehicle";
import { getAllBookingsAPI, updateBookingAPI } from "@/apis/apis";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  console.log("🚀 ~ Bookings ~ bookings:", bookings);
  const [open, setOpen] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState(null);
  const navigation = useNavigate();
  const fetchAllBookings = useCallback(async () => {
    const res = await getAllBookingsAPI();
    return res;
  }, []);
  const getBookings = useCallback(async () => {
    const res = await fetchAllBookings();
    setBookings(res);
  }, [fetchAllBookings]);
  useEffect(() => {
    getBookings();
  }, [getBookings]);

  const handleRefresh = () => {
    getBookings();
  };

  const handleCompleteTrip = async (_id) => {
    await updateBookingAPI(_id, { status: "complete" });
    handleRefresh();
  };

  const handleSearch = (searchInput) => {
    console.log("🚀 ~ handleSearch ~ searchInput:", searchInput);
  };

  return (
    <>
      <SidebarLayout>
        <h1 className='font-bold text-2xl text-center'>Bookings</h1>
        <div className='flex gap-4'>
          <Button onClick={handleRefresh}>
            <RefreshCcw width={20} height={20} />
            Refresh
          </Button>
          <Button onClick={() => navigation("add")}>
            <Plus width={20} height={20} />
            Booking
          </Button>
        </div>
        <SearchComponent handleSearch={handleSearch} />
        <div className='w-full'>
          <Table>
            <TableCaption>List of bookings.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Pick up</TableHead>
                <TableHead>Drop off</TableHead>
                <TableHead>Booking date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Updated at</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.map((booking, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className='font-medium'>{index + 1}</TableCell>
                    <TableCell>{booking?.customerName}</TableCell>
                    <TableCell>{booking?.customerPhone}</TableCell>
                    <TableCell>{booking?.pickUpLocation}</TableCell>
                    <TableCell>{booking?.dropOffLocation}</TableCell>
                    <TableCell>
                      {formatDateTime(booking?.bookingDate)}
                    </TableCell>
                    <TableCell>{booking.status}</TableCell>
                    <TableCell>{convertTime(booking?.createdAt)}</TableCell>
                    <TableCell>
                      {booking?.updatedAt && convertTime(booking?.updatedAt)}
                    </TableCell>
                    <TableCell className='flex gap-3'>
                      <Button
                        onClick={() =>
                          navigation(slugify(booking?.licensePlate), {
                            state: { booking },
                          })
                        }
                      >
                        <Edit width={20} height={20} />
                      </Button>
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setDeleteBookingId(booking._id);
                        }}
                      >
                        <Trash width={20} height={20} />
                      </Button>
                      <Button onClick={() => handleCompleteTrip(booking._id)}>
                        <Check width={20} height={20} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </SidebarLayout>
      {open && (
        <DeleteVehicle
          open={open}
          setOpen={setOpen}
          deleteBookingId={deleteBookingId}
        />
      )}
    </>
  );
}

export default Bookings;
