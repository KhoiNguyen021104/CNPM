/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import schemas from "@/form/schemas";

function SearchComponent({ handleSearch }) {
  const form = useForm({
    resolver: yupResolver(schemas.searchFormSchema),
  });

  const resetForm = () => {
    form.setValue("searchInput", "");
  };

  const onSubmit = async (data) => {
    handleSearch(data)
    resetForm();
  };

  return (
    <div className='mt-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 flex gap-2 align-center'
        >
          <FormField
            control={form.control}
            name='searchInput'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    style={{ width: '400px' }}
                    type='text'
                    placeholder='Search by name...'
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.searchInput?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type='submit' className='!m-0'>
            <Search width={20} height={20} />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SearchComponent;
