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
import { createDriverAPI } from "@/apis/apis";

function AddDriverForm() {
  const { toast } = useToast();
  const form = useForm({
    resolver: yupResolver(schemas.driverFormSchema),
    // defaultValues: {
    // },
  });

  const resetForm = () => {
    form.setValue("fullname", "");
    form.setValue("phone", "");
    form.setValue("licenseNumber", "");
    form.setValue("address", "");
  };

  const onSubmit = async (data) => {
    const res = await createDriverAPI(data);
    console.log("🚀 ~ onSubmit ~ res:", res);
    toast({
      title: "Add driver",
      description: <h1 className='font-bold text-sm'>Add driver successful</h1>,
    });
    resetForm();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='fullname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Enter your fullname'
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.fullname?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type='text'
                    placeholder='Enter your phone'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='licenseNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>License number</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type='text'
                    placeholder='Enter your license number'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type='text'
                    placeholder='Enter your address'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
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

export default AddDriverForm;
