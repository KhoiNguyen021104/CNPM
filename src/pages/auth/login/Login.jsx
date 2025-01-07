import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import "./Login.css";
import LoginForm from "@/form/LoginForm/LoginForm";
function Login() {
  return (
    <div className='container h-screen flex items-center justify-center'>
      <div className='w-1/3'>
        <Card>
          <CardHeader>
            <CardTitle className='text-center text-2xl'>LOGIN</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
