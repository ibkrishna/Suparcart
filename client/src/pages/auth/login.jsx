import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls, otpFormControls } from "@/config";
import { loginUser, requestOTP, verifyOTP, setUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../../components/auth/style.css';

const initialState = {
  email: "",
  password: "",
  mobileNumber: "",
  otp: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [isMobileLogin, setIsMobileLogin] = useState(false);
  const [isOTPRequested, setIsOTPRequested] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    
    if (isMobileLogin && !isOTPRequested) {
      // Request OTP
      dispatch(requestOTP(formData.mobileNumber)).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
          });
          setIsOTPRequested(true);
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
    } else if (isMobileLogin && isOTPRequested) {
      // Verify OTP
      dispatch(verifyOTP({ mobileNumber: formData.mobileNumber, otp: formData.otp })).then(
        (data) => {
          if (data?.payload?.success) {
            dispatch(setUser(data?.payload?.user));
            localStorage.setItem('token', data?.payload?.token); // Save token in local storage
            toast({
              title: data?.payload?.message,
            });
            navigate('/');
          } else {
            toast({
              title: data?.payload?.message,
              variant: "destructive",
            });
          }
        }
      );
    } else {
      // Login with email and password
      dispatch(loginUser(formData)).then((data) => {
        if (data?.payload?.success) {
          dispatch(setUser(data?.payload?.user));
          localStorage.setItem('token', data?.payload?.token); // Save token in local storage
          const userRole = data?.payload?.user?.role;
          toast({
            title: data?.payload?.message,
          });
          if (userRole === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        } else {
          toast({
            title: 'Invalid Credentials',
            variant: "destructive",
          });
        }
      });
    }
  }

  return (
    <div className="flex justify-center">
      <div className="bg-[#F5F5F5] p-8 rounded-sm shadow-lg w-full max-w-md hover:shadow-2xl transition-shadow duration-300">
        <h1 className="text-2xl font-medium tracking-tight mb-4 text-center" style={{ fontFamily: 'Inter' }}>
          LOGIN
        </h1>
        
        <CommonForm
          formControls={isMobileLogin ? otpFormControls : loginFormControls}
          buttonText={isMobileLogin ? (isOTPRequested ? "Verify OTP" : "Request OTP") : "Login"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
        
        <div className="text-center mt-4">
          <Link
            className="text-primary hover:underline"
            to="/auth/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        
        <div>
          <p className="mt-2 text-center mb-4">
            Don't have an account
            <Link
              className="font-bold ml-2 text-primary hover:underline"
              to="/auth/register"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;
