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
import { Save } from "lucide-react";
import { createVehicleAPI, getAllDriversAPI } from "@/apis/apis";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";

function AddVehicleForm() {
  const { toast } = useToast();
  const [drivers, setDrivers] = useState([]);
  const form = useForm({
    resolver: yupResolver(schemas.vehicleFormSchema),
  });

  const resetForm = () => {
    form.setValue("licensePlate", "");
    form.setValue("driverId", "");
    form.setValue("brand", "");
    form.setValue("capacity", "");
  };
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

  const onSubmit = async (data) => {
    const response = await createVehicleAPI(data);
    if (response?.message) {
      toast({
        title: <h1 className='font-bold text-lg text-red-600'>Error</h1>,
        description: <h1 className='font-bold text-sm'>{response.message}</h1>,
      });
      return;
    } else {
      toast({
        title: "Add vehicle",
        description: (
          <h1 className='font-bold text-sm'>Add vehicle successful</h1>
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
          name='driverId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a driver' />
                  </SelectTrigger>
                  <SelectContent>
                    {renderOptions(
                      drivers?.map((driver) => ({
                        value: driver._id,
                        label: driver.fullname,
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
          name='licensePlate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>License plate</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Enter license plate'
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.licensePlate?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='brand'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input type='text' placeholder='Enter brand' {...field} />
                </div>
              </FormControl>
              <FormMessage>{form.formState.errors.brand?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='capacity'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type='number'
                    placeholder='Enter capacity'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage>{form.formState.errors.brand?.message}</FormMessage>
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

export default AddVehicleForm;
