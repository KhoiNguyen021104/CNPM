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
import { Edit, Plus, RefreshCcw, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { convertTime, slugify } from "@/utils/formatters";
import SearchComponent from "@/components/appComponents/search/SearchComponent";
import { getAllDriversAPI, getAllVehiclesAPI } from "@/apis/apis";
import DeleteVehicle from "./DeleteVehicle";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteVehicleId, setDeleteVehicleId] = useState(null);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const navigation = useNavigate();
  const fetchAllVehicles = useCallback(async () => {
    const res = await getAllVehiclesAPI();
    return res;
  }, []);
  const getVehicles = useCallback(async () => {
    const res = await fetchAllVehicles();
    setVehicles(res);
    setFilteredVehicles(res);
  }, [fetchAllVehicles]);
  useEffect(() => {
    getVehicles();
  }, [getVehicles]);

  const fetchAllDrivers = useCallback(async () => {
    const res = await getAllDriversAPI();
    return res;
  }, []);
  const getDrivers = useCallback(async () => {
    const res = await fetchAllDrivers();
    setDrivers(res);
  }, [fetchAllDrivers]);

  useEffect(() => {
    getDrivers();
  }, [getDrivers]);

  const handleRefresh = () => {
    getVehicles();
    getDrivers();
  };

  const handleSearch = (searchInput) => {
    const inputValue = searchInput.normalize("NFC");
    if (inputValue === "") {
      setFilteredVehicles(vehicles);
      return;
    }
    const regex = new RegExp(inputValue, "iu");
    setFilteredVehicles(
      vehicles.filter((vehicle) => regex.test(vehicle?.brand?.normalize("NFC")))
    );
  };

  return (
    <>
      <SidebarLayout>
        <h1 className='font-bold text-2xl text-center'>Vehicles</h1>
        <div className='flex gap-4'>
          <Button onClick={handleRefresh}>
            <RefreshCcw width={20} height={20} />
            Refresh
          </Button>
          <Button onClick={() => navigation("add")}>
            <Plus width={20} height={20} />
            Add vehicle
          </Button>
        </div>
        <SearchComponent handleSearch={handleSearch} />
        <div className='w-full'>
          <Table>
            <TableCaption>List of vehicles.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>No.</TableHead>
                {/* <TableHead>Model</TableHead> */}
                <TableHead>License plate</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Updated at</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles?.map((vehicle, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className='font-medium'>{index + 1}</TableCell>
                    <TableCell>{vehicle?.licensePlate}</TableCell>
                    <TableCell>{vehicle?.brand}</TableCell>
                    <TableCell>{vehicle?.capacity}</TableCell>
                    <TableCell>
                      {
                        drivers?.filter(
                          (driver) => driver._id === vehicle?.driverId
                        )[0]?.fullname
                      }
                    </TableCell>
                    <TableCell>
                      {vehicle?.status === 0 ? "Inactive" : "Active"}
                    </TableCell>
                    <TableCell>{convertTime(vehicle?.createdAt)}</TableCell>
                    <TableCell>
                      {vehicle?.updatedAt && convertTime(vehicle?.updatedAt)}
                    </TableCell>
                    <TableCell className='flex gap-3'>
                      <Button
                        onClick={() =>
                          navigation(slugify(vehicle?.licensePlate), {
                            state: { vehicle },
                          })
                        }
                      >
                        <Edit width={20} height={20} />
                      </Button>
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setDeleteVehicleId(vehicle._id);
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
      </SidebarLayout>
      {open && (
        <DeleteVehicle
          open={open}
          setOpen={setOpen}
          deleteVehicleId={deleteVehicleId}
        />
      )}
    </>
  );
}

export default Vehicles;
