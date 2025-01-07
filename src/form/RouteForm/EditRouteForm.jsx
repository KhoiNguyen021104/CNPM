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
import { useLocation } from "react-router-dom";
import { updateRouteAPI } from "@/apis/apis";

function EditRouteForm() {
  const { toast } = useToast();
  const location = useLocation();
  const route = location.state.route;
  const form = useForm({
    resolver: yupResolver(schemas.routeFormSchema),
    defaultValues: {
      startPoint: route?.startPoint,
      endPoint: route?.endPoint,
      distance: route?.distance,
      estimateTime: route?.estimateTime,
    },
  });

  const onSubmit = async (data) => {
    await updateRouteAPI(route._id, data);
    toast({
      title: "Update route",
      description: (
        <h1 className='font-bold text-sm'>Update route successful</h1>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='startPoint'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start point</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Enter start point' {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.startPoint?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='endPoint'
          render={({ field }) => (
            <FormItem>
              <FormLabel>End point</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input type='text' placeholder='Enter end point' {...field} />
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.endPoint?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='distance'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distance (km)</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type='number'
                    placeholder='Enter distance'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.distance?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='estimateTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimate time (h)</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type='number'
                    placeholder='Enter estimate time'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.estimateTime?.message}
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

export default EditRouteForm;
