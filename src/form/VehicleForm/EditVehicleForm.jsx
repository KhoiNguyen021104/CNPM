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
import { updateVehicleAPI } from "@/apis/apis";
import { useLocation } from "react-router-dom";

function EditVehicleForm() {
  const { toast } = useToast();
  const location = useLocation();
  const vehicle = location.state.vehicle;
  const form = useForm({
    resolver: yupResolver(schemas.vehicleFormSchema),
    defaultValues: {
      licensePlate: vehicle?.licensePlate,
      // model: vehicle?.model,
      brand: vehicle?.brand,
      capacity: vehicle?.capacity,
    },
  });

  const onSubmit = async (data) => {
    await updateVehicleAPI(vehicle._id, data);
    toast({
      title: "Update vehicle",
      description: (
        <h1 className='font-bold text-sm'>Update vehicle successful</h1>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* <FormField
          control={form.control}
          name='model'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Enter model' {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.model?.message}</FormMessage>
            </FormItem>
          )}
        /> */}
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

export default EditVehicleForm;
