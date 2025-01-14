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
import { useLocation, useNavigate } from "react-router-dom";
import { loginAPI } from "@/apis/apis";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigation = useNavigate();
  const location = useLocation();
  const userInfo = location.state?.userInfo;
  if (userInfo) {
    navigation(location.pathname, { replace: true });
  }

  const form = useForm({
    resolver: yupResolver(schemas.loginFormSchema),
    defaultValues: {
      username: userInfo?.username || "",
      password: userInfo?.password || "",
    },
  });
  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    const response = await loginAPI(data);
    console.log("🚀 ~ onSubmit ~ response:", response);
    const userInfo = {
      _id: response._id,
      username: response.username,
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    toast({
      title: "Login successful",
      description: <h1 className='font-bold text-sm'>Login successful</h1>,
    });
    if (response.role == "admin") {
      navigation("/dashboard", { state: { ...userInfo } });
    } else {
      navigation("/booking", { state: { ...userInfo } });
    }
    // if (response) {
    //   toast({
    //     title: "Login successful",
    //     description: <h1 className='font-bold text-sm'>Login successful</h1>,
    //   });
    //   navigation("/dashboard", { state: { ...userInfo } });
    // } else {
    //   toast({
    //     title: "Login failed",
    //     description: (
    //       <h1 className='font-bold text-sm'>Incorrect username or password</h1>
    //     ),
    //   });
    // }
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
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    {...field}
                    value={field.value || ""}
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className='flex flex-col items-center justify-center mt-4'>
          <Button className='w-full' type='submit'>
            Login
          </Button>
          <FormDescription className='mt-2'>
            You don&apos;t have an account?
            <a
              className='font-semibold ml-1'
              style={{ color: "#0652DD" }}
              href='/register'
            >
              Register
            </a>
          </FormDescription>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
