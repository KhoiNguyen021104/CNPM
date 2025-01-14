import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/form/RegisterForm/RegisterForm";
function Register() {
  return (
    <div className='container h-screen flex items-center justify-center'>
      <div className='w-1/3'>
        <Card>
          <CardHeader>
            <CardTitle className='text-center text-2xl'>REGISTER</CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Register;
