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
import { getAllDriversAPI } from "@/apis/apis";
import { Button } from "@/components/ui/button";
import { Edit, Plus, RefreshCcw, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { convertTime, slugify } from "@/utils/formatters";
import DeleteDriver from "./DeleteDriver";
import SearchComponent from "@/components/appComponents/search/SearchComponent";

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteDriverId, setDeleteDriverId] = useState(null);
  const navigation = useNavigate();
  const fetchAllDrivers = useCallback(async () => {
    const res = await getAllDriversAPI();
    return res;
  }, []);

  const getDrivers = useCallback(async () => {
    const res = await fetchAllDrivers();
    setDrivers(res);
    setFilteredDrivers(res);
  }, [fetchAllDrivers]);

  useEffect(() => {
    getDrivers();
  }, [getDrivers]);

  const handleRefresh = () => {
    getDrivers();
  };

  const handleSearch = (searchInput) => {
    const inputValue = searchInput.normalize("NFC");
    if (inputValue === "") {
      setFilteredDrivers(drivers);
      return;
    }
    const regex = new RegExp(inputValue, "iu");
    setFilteredDrivers(
      drivers.filter((driver) => regex.test(driver?.fullname?.normalize("NFC")))
    );
  };

  return (
    <>
      <SidebarLayout>
        <h1 className='font-bold text-2xl text-center'>Drivers</h1>
        <div className='flex gap-4'>
          <Button onClick={handleRefresh}>
            <RefreshCcw width={20} height={20} />
            Refresh
          </Button>
          <Button onClick={() => navigation("add")}>
            <Plus width={20} height={20} />
            Add driver
          </Button>
        </div>
        <SearchComponent handleSearch={handleSearch} />
        {filteredDrivers.length === 0 ? (
          <div className='w-full flex flex-col items-center justify-center gap-4 p-8'>
            <img src='/src/assets/svg/empty.svg' alt='' />
            <h3>No data</h3>
          </div>
        ) : (
          <div className='w-full'>
            <Table>
              <TableCaption>List of drivers.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>No.</TableHead>
                  <TableHead>Fullname</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>License Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created at</TableHead>
                  <TableHead>Updated at</TableHead>
                  <TableHead>Action</TableHead>
                  {/* <TableHead className='text-right'>Amount</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers?.map((driver, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className='font-medium'>{index + 1}</TableCell>
                      <TableCell>{driver?.fullname}</TableCell>
                      <TableCell>{driver?.phone}</TableCell>
                      <TableCell>{driver?.address}</TableCell>
                      <TableCell>{driver?.licenseNumber}</TableCell>
                      <TableCell>
                        {driver?.status === 0 ? "Inactive" : "Active"}
                      </TableCell>
                      <TableCell>{convertTime(driver?.createdAt)}</TableCell>
                      <TableCell>
                        {driver?.updatedAt && convertTime(driver?.updatedAt)}
                      </TableCell>
                      <TableCell className='flex gap-3'>
                        <Button
                          onClick={() =>
                            navigation(slugify(driver?.fullname), {
                              state: { driver },
                            })
                          }
                        >
                          <Edit width={20} height={20} />
                        </Button>
                        <Button
                          onClick={() => {
                            setOpen(true);
                            setDeleteDriverId(driver._id);
                          }}
                        >
                          <Trash width={20} height={20} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </SidebarLayout>
      {open && (
        <DeleteDriver
          open={open}
          setOpen={setOpen}
          deleteDriverId={deleteDriverId}
        />
      )}
    </>
  );
}

export default Drivers;
