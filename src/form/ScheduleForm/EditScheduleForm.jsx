import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import schemas from "@/form/schemas";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import {
  getAllDriversAPI,
  getAllRoutesAPI,
  getAllVehiclesAPI,
  getOneDriverByIdAPI,
  getOneRouteByIdAPI,
  getOneScheduleByIdAPI,
  getOneVehicleByIdAPI,
  updateScheduleAPI,
} from "@/apis/apis";
import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import AutoScrollArea from "@/components/appComponents/scrollArea/AutoScrollArea";
import { isEmpty } from "lodash";
import { useLocation } from "react-router-dom";

function EditScheduleForm() {
  const { toast } = useToast();
  const location = useLocation();
  const scheduleId = location.state.scheduleId;
  const [schedule, setSchedule] = useState(null);
  const [data, setData] = useState({
    routes: [],
    drivers: [],
    vehicles: [],
  });

  const fetchAllData = useCallback(async () => {
    try {
      const [routes, drivers, vehicles] = await Promise.all([
        getAllRoutesAPI(),
        getAllDriversAPI(),
        getAllVehiclesAPI(),
      ]);
      setData({
        routes,
        drivers,
        vehicles,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const schedule = await getOneScheduleByIdAPI(scheduleId);
      const route = await getOneRouteByIdAPI(schedule.routeId);
      const routeName = `${route.startPoint} -> ${route.endPoint}`;

      const drivers = schedule?.details?.map((detail) => {
        const driver = data?.drivers?.find((d) => d._id === detail.driverId);
        return driver;
      });

      const vehicles = schedule?.details?.map((detail) => {
        const vehicle = data?.vehicles?.find((v) => v._id === detail.vehicleId);
        return vehicle;
      });
      setSchedule({
        ...schedule,
        drivers,
        vehicles,
        routeName,
      });
    };

    // Only fetch schedule when all data is available
    if (
      scheduleId &&
      !isEmpty(data.drivers) &&
      !isEmpty(data.routes) &&
      !isEmpty(data.vehicles)
    ) {
      fetchSchedule();
    }
  }, [data, scheduleId]);

  const refresh = async (data) => {
    const drivers = await Promise.all(
      data?.details?.map(async (detail) => {
        const driver = await getOneDriverByIdAPI(detail.driverId);
        return driver;
      })
    );

    const vehicles = await Promise.all(
      data?.details?.map(async (detail) => {
        const vehicle = await getOneVehicleByIdAPI(detail.vehicleId);
        return vehicle;
      })
    );

    const route = await getOneRouteByIdAPI(data.routeId);

    const updatedSchedule = {
      ...data,
      drivers,
      vehicles,
      routeName: `${route.startPoint} -> ${route.endPoint}`,
    };
    setSchedule(updatedSchedule);
  };

  const form = useForm({
    resolver: yupResolver(schemas.scheduleFormSchema),
    defaultValues: {
      routeId: "",
      departureTime: "",
      vehicleIds: [],
    },
  });

  useEffect(() => {
    if (schedule) {
      form.reset({
        routeId: schedule.routeId,
        departureTime: schedule.departureTime,
        vehicleIds: schedule.vehicles.map((vehicle) => vehicle._id),
      });
    }
  }, [schedule, form]);

  const resetForm = () => {
    form.reset();
  };

  const onSubmit = async (formData) => {
    const details = formData.vehicleIds?.map((vehicleId) => {
      const vehicle = data.vehicles.find(
        (vehicle) => vehicle._id === vehicleId
      );
      const detail = {
        vehicleId,
        driverId: vehicle.driverId,
        capacity: vehicle.capacity,
        availableSeat: vehicle.capacity,
      };
      return detail;
    });
    formData.details = details;
    delete formData.vehicleIds;

    const response = await updateScheduleAPI(schedule._id, formData);
    await refresh(response);

    if (response?.message) {
      toast({
        title: <h1 className='font-bold text-lg text-red-600'>Error</h1>,
        description: <h1 className='font-bold text-sm'>{response.message}</h1>,
      });
    } else {
      toast({
        title: "Update Schedule",
        description: (
          <h1 className='font-bold text-sm'>Schedule updated successfully</h1>
        ),
      });
      resetForm();
    }
  };

  const renderOptions = (items, labelKey = "label", valueKey = "value") => {
    return items.map((item) => (
      <SelectItem key={item[valueKey]} value={item[valueKey]}>
        {item[labelKey]}
      </SelectItem>
    ));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='routeId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Route</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a route' />
                  </SelectTrigger>
                  <SelectContent>
                    {renderOptions(
                      data.routes.map((route) => ({
                        value: route._id,
                        label: `${route.startPoint} -> ${route.endPoint}`,
                      }))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.routeId?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='departureTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input
                  type='time'
                  placeholder='Enter departure time'
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.departureTime?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='vehicleIds'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutoScrollArea
                  title={"Select vehicles and drivers"}
                  quantityItem={data.vehicles.length}
                >
                  {isEmpty(data?.vehicles) ? (
                    <div className='flex flex-col items-center'>
                      <img
                        className='w-[100px]'
                        src='\src\assets\svg\empty.svg'
                        alt=''
                      />
                      <h3>No data</h3>
                    </div>
                  ) : (
                    data.vehicles.map((vehicle) => (
                      <label
                        key={vehicle._id}
                        htmlFor={`${vehicle._id}`}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2 flex items-center gap-2'
                      >
                        <Checkbox
                          id={`${vehicle._id}`}
                          checked={field.value?.includes(vehicle._id) || false}
                          onCheckedChange={(isChecked) => {
                            let newValue;
                            if (isChecked) {
                              newValue = [...(field.value || []), vehicle._id];
                            } else {
                              newValue = field.value.filter(
                                (id) => id !== vehicle._id
                              );
                            }
                            field.onChange(newValue);
                          }}
                        />
                        {vehicle.brand +
                          " - " +
                          vehicle.licensePlate +
                          " - " +
                          vehicle.capacity +
                          " seats - Driver: " +
                          data.drivers.filter(
                            (driver) => driver._id === vehicle.driverId
                          )[0].fullname}
                      </label>
                    ))
                  )}
                </AutoScrollArea>
              </FormControl>
              <FormMessage>
                {form.formState.errors.vehicleIds?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button type='submit'>
          <Save width={20} height={20} /> Save
        </Button>
      </form>
    </Form>
  );
}

export default EditScheduleForm;
