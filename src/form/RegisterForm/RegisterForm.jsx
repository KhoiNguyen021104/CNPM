import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import schemas from "@/form/schemas";

import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "@/apis/apis";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });
  const { toast } = useToast();
  const navigation = useNavigate();
  const form = useForm({
    resolver: yupResolver(schemas.registerFormSchema),
  });
  const onSubmit = async (data) => {
    const userInfo = { ...data };
    if (userInfo.password !== userInfo.confirmPassword) {
      toast({
        title: <h1 className='font-bold text-md text-red-600'>Register</h1>,
        description: (
          <h1 className='font-bold text-sm'>Passwords do not match</h1>
        ),
      });
      return;
    }
    delete userInfo.confirmPassword;
    const response = await registerAPI(userInfo);
    console.log("🚀 ~ onSubmit ~ response:", response);
    toast({
      title: <h1 className='font-bold text-md text-green-600'>Register</h1>,
      description: <h1 className='font-bold text-sm'>Register successful</h1>,
    });
    navigation("/login", {
      state: {
        userInfo
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your username'
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.username?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='fullname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your fullname'
                  {...field}
                  value={field.value || ""}
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
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Enter your phone number'
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword.showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    {...field}
                    value={field.value}
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700'
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        showPassword: !prev.showPassword,
                      }))
                    }
                  >
                    {showPassword.showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={
                      showPassword.showConfirmPassword ? "text" : "password"
                    }
                    placeholder='Enter your confirm password'
                    {...field}
                    value={field.value}
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700'
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        showConfirmPassword: !prev.showConfirmPassword,
                      }))
                    }
                  >
                    {showPassword?.showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.confirmPassword?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className='flex flex-col items-center justify-center mt-4'>
          <Button className='w-full' type='submit'>
            Register
          </Button>
          <FormDescription className='mt-2'>
            You have an account?
            <a
              className='font-semibold ml-1'
              style={{ color: "#0652DD" }}
              href='/login'
            >
              Login
            </a>
          </FormDescription>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
