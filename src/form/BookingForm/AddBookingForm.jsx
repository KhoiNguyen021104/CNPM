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

import { Input } from "@/components/ui/input";
import schemas from "@/form/schemas";

import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Save } from "lucide-react";
import {
  createBookingAPI,
  getAllSchedulesAPI,
  getOneRouteByIdAPI,
} from "@/apis/apis";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateTime } from "@/utils/formatters";
function AddBookingForm() {
  const { toast } = useToast();
  const [schedules, setSchedules] = useState([]);
  useEffect(() => {
    const fetchAllSchedules = async () => {
      const res = await getAllSchedulesAPI();
      await Promise.all(
        res.map(async (schedule) => {
          const route = await getOneRouteByIdAPI(schedule.routeId);
          schedule.routeName =
            route.startPoint +
            " - " +
            route.endPoint +
            " - " +
            formatDateTime(schedule?.departureTime);
          return schedule;
        })
      );
      setSchedules(res);
    };
    fetchAllSchedules();
  }, []);

  useEffect(() => {
    // console.log("🚀 ~ AddBookingForm ~ schedules:", schedules);
  }, [schedules]);

  const form = useForm({
    resolver: yupResolver(schemas.bookingFormSchema),
  });

  const resetForm = () => {
    form.reset();
  };

  const onSubmit = async (formData) => {
    formData.bookingDate = formData.time + " " + formData.date;
    delete formData.date;
    delete formData.time;
    const response = await createBookingAPI(formData);
    if (response?.message) {
      toast({
        title: <h1 className='font-bold text-lg text-red-600'>Error</h1>,
        description: <h1 className='font-bold text-sm'>{response.message}</h1>,
      });
      return;
    } else {
      toast({
        title: "Add Booking",
        description: (
          <h1 className='font-bold text-sm'>Booking added successfully</h1>
        ),
      });
      resetForm();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='scheduleId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schedule</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a schedule' />
                  </SelectTrigger>
                  <SelectContent>
                    {schedules?.map((schedule, index) => (
                      <SelectItem key={index} value={schedule._id}>
                        {schedule?.routeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.scheduleId?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='pickUpLocation'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pick up location</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='text'
                  placeholder='Enter pick up location'
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.pickUpLocation?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dropOffLocation'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Drop off location</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='text'
                  placeholder='Enter drop off location'
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.dropOffLocation?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='customerName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} type='text' placeholder='Enter your name' />
              </FormControl>
              <FormMessage>
                {form.formState.errors.customerName?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='customerPhone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='text'
                  placeholder='Enter your phone number'
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.customerPhone?.message}
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
        <Button type='submit'>
          <Save width={20} height={20} /> Save
        </Button>
      </form>
    </Form>
  );
}

export default AddBookingForm;
