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
import { updateDriverAPI } from "@/apis/apis";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function EditDriverForm() {
  const { toast } = useToast();
  const location = useLocation();
  const driver = location.state.driver
  useEffect(() => {
    // console.log('🚀 ~ EditDriverForm ~ driver:', driver)
  }, [driver]);
  const form = useForm({
    resolver: yupResolver(schemas.driverFormSchema),
    defaultValues: {
      fullname: driver?.fullname,
      phone: driver?.phone,
      licenseNumber: driver?.licenseNumber,
      address: driver?.address,
    },
  });

  const onSubmit = async (data) => {
    const res = await updateDriverAPI(driver._id, data);
    console.log("🚀 ~ onSubmit ~ res:", res);
    toast({
      title: "Update driver",
      description: (
        <h1 className='font-bold text-sm'>Update driver successful</h1>
      ),
    });
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

export default EditDriverForm;
