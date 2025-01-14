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
import {
  getAllSchedulesAPI,
  getOneDriverByIdAPI,
  getOneRouteByIdAPI,
  getOneVehicleByIdAPI,
} from "@/apis/apis";
import { isEmpty } from "lodash";
import DeleteSchedule from "./DeleteSchedule";

function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [schedulesDetail, setSchedulesDetail] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState(null);
  const navigation = useNavigate();
  const fetchAllSchedules = useCallback(async () => {
    const res = await getAllSchedulesAPI();
    return res;
  }, []);

  const getSchedules = useCallback(async () => {
    const schedules = await fetchAllSchedules();
    setSchedules(schedules);
  }, [fetchAllSchedules]);

  useEffect(() => {
    getSchedules();
  }, [getSchedules]);

  const handleRefresh = () => {
    getSchedules();
  };

  useEffect(() => {
    if (!isEmpty(schedules)) {
      const fetchSchedulesDetail = async () => {
        const updatedSchedules = await Promise.all(
          schedules.map(async (schedule) => {
            const route = await getOneRouteByIdAPI(schedule.routeId);
            const drivers = await Promise.all(
              schedule?.details?.map(async (detail) => {
                const driver = await getOneDriverByIdAPI(detail.driverId);
                return driver;
              })
            );
            const vehicles = await Promise.all(
              schedule?.details?.map(async (detail) => {
                const driver = await getOneVehicleByIdAPI(detail.vehicleId);
                return driver;
              })
            );
            return {
              ...schedule,
              drivers,
              vehicles,
              routeName: `${route.startPoint} -> ${route.endPoint}`,
            };
          })
        );
        console.log('🚀 ~ fetchSchedulesDetail ~ updatedSchedules:', updatedSchedules)
        setSchedulesDetail(updatedSchedules);
      };

      fetchSchedulesDetail();
    }
  }, [schedules]);

  useEffect(() => {
    // console.log('🚀 ~ Schedules ~ schedulesDetail:', schedulesDetail)
  }, [schedulesDetail]);

  const handleSearch = (searchInput) => {
    console.log("🚀 ~ handleSearch ~ searchInput:", searchInput);
  };

  return (
    <>
      <SidebarLayout>
        <h1 className='font-bold text-2xl text-center'>Schedules</h1>
        <div className='flex gap-4'>
          <Button onClick={handleRefresh}>
            <RefreshCcw width={20} height={20} />
            Refresh
          </Button>
          <Button onClick={() => navigation("add")}>
            <Plus width={20} height={20} />
            Add schedule
          </Button>
        </div>
        <SearchComponent handleSearch={handleSearch} />
        <div className='w-full'>
          <Table>
            <TableCaption>List of schedules.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[fit-content] text-center'>
                  No.
                </TableHead>
                <TableHead className='text-center'>Route</TableHead>
                <TableHead className='text-center'>Departure time</TableHead>
                <TableHead className='text-center'>Details</TableHead>
                <TableHead className='text-center'>Status</TableHead>
                <TableHead className='text-center'>Created at</TableHead>
                <TableHead className='text-center'>Updated at</TableHead>
                <TableHead className='text-center'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedulesDetail?.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>{index + 1}</TableCell>
                  <TableCell>{schedule?.routeName}</TableCell>
                  <TableCell>{schedule?.departureTime}</TableCell>
                  <TableCell>
                    <div className='grid grid-cols-4 gap-x-2'>
                      <div>
                        {index == 0 && (
                          <h4 className='text-sm font-semibold'>Drivers</h4>
                        )}
                        <ul className='space-y-1'>
                          {schedule?.drivers?.map((driver, driverIndex) => (
                            <li key={driverIndex} className='text-sm'>
                              {driver?.fullname}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        {index === 0 && (
                          <h4 className='text-sm font-semibold'>Vehicles</h4>
                        )}
                        <ul className='space-y-1'>
                          {schedule?.vehicles?.map((vehicle, index) => (
                            <li key={index} className='text-sm'>
                              <span className='text-sm'>
                                {vehicle.licensePlate}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        {index === 0 && (
                          <h4 className='text-sm font-semibold'>Capacity</h4>
                        )}
                        <ul className='space-y-1'>
                          {schedule?.vehicles?.map((vehicle, index) => (
                            <li key={index} className='text-sm'>
                              <span className='text-sm'>
                                {vehicle.capacity}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        {index === 0 && (
                          <h4 className='text-sm font-semibold'>
                            Available seats
                          </h4>
                        )}
                        <ul className='space-y-1'>
                          {schedule?.details?.map((detail, index) => (
                            <li key={index} className='text-sm'>
                              <span className='text-sm'>
                                {detail?.availableSeat}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{schedule?.status}</TableCell>
                  <TableCell>{convertTime(schedule?.createdAt)}</TableCell>
                  <TableCell>
                    {schedule?.updatedAt && convertTime(schedule?.updatedAt)}
                  </TableCell>
                  <TableCell className='flex gap-3'>
                    <Button
                      onClick={() =>
                        navigation(
                          slugify(
                            schedule?.routeName + " " + schedule?.departureTime
                          ),
                          {
                            state: { scheduleId: schedule._id },
                          }
                        )
                      }
                    >
                      <Edit width={20} height={20} />
                    </Button>
                    <Button
                      onClick={() => {
                        setOpen(true);
                        setDeleteScheduleId(schedule?._id);
                      }}
                    >
                      <Trash width={20} height={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SidebarLayout>
      {open && (
        <DeleteSchedule
          open={open}
          setOpen={setOpen}
          deleteScheduleId={deleteScheduleId}
        />
      )}
    </>
  );
}

export default Schedules;
