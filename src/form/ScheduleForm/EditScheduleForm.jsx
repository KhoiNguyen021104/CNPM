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
import { CalendarIcon, Save } from "lucide-react";
import {
  createScheduleAPI,
  getAllDriversAPI,
  getAllRoutesAPI,
  getAllVehiclesAPI,
} from "@/apis/apis";
import { useCallback, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { getDateTime } from "@/utils/formatters";
import { Checkbox } from "@/components/ui/checkbox";
import AutoScrollArea from "@/components/appComponents/scrollArea/AutoScrollArea";
import { isEmpty } from "lodash";
import { useLocation } from "react-router-dom";

function AddScheduleForm() {
  const { toast } = useToast();
  const location = useLocation()
  const schedule = location.state.schedule
  console.log('🚀 ~ AddScheduleForm ~ schedule:', schedule)
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
        drivers: drivers?.filter((driver) => driver.status === 0),
        vehicles: vehicles?.filter((vehicle) => vehicle.status === 0),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const form = useForm({
    resolver: yupResolver(schemas.scheduleFormSchema),
    defaultValues: {
      routeId: schedule.routeId,
      // date: schedule.departureTime.split(" ")[0],
      // time: schedule.departureTime.split(" ")[0],
      vehicleIds: [],
    },
  });

  const resetForm = () => {
    form.reset();
  };

  const onSubmit = async (formData) => {
    formData.departureTime = getDateTime({
      date: formData.date,
      time: formData.time,
    });
    delete formData.date;
    delete formData.time;
    console.log("🚀 ~ onSubmit ~ formData:", formData);
    const details = formData.vehicleIds?.map((vehicleId) => {
      const vehicle = data.vehicles.filter(
        (vehicle) => vehicle._id === vehicleId
      );
      const detail = {
        vehicleId,
        driverId: vehicle[0].driverId,
        capacity: vehicle[0].capacity,
        availableSeat: vehicle[0].capacity,
      };
      return detail;
    });
    formData.details = details;
    delete formData.vehicleIds;
    console.log("🚀 ~ details ~ details:", details);
    const response = await createScheduleAPI(formData);
    if (response?.message) {
      toast({
        title: <h1 className='font-bold text-lg text-red-600'>Error</h1>,
        description: <h1 className='font-bold text-sm'>{response.message}</h1>,
      });
      return;
    } else {
      toast({
        title: "Add Schedule",
        description: (
          <h1 className='font-bold text-sm'>Schedule added successfully</h1>
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
        <div className='flex gap-8'>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2.5'>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"}>
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          // date < new Date() || date < new Date("1900-01-01")
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                        {...field}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.departureTime?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='time'
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
        </div>
        <FormField
          control={form.control}
          name='vehicleIds'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutoScrollArea
                  title={"Select vehicles and drivers (inactive)"}
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

export default AddScheduleForm;
