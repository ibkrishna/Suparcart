import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../../components/auth/style.css';

const initialState = {
  userName: "",
  email: "",
  password: "",
  mobileNumber: "",
  role: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    const mobileNumberPattern = /^[6-9]\d{9}$/;
    if (!mobileNumberPattern.test(formData.mobileNumber)) {
      toast({
        title: "Invalid mobile number. It must start with 6-9 and be 10 digits long.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.role) {
      toast({
        title: "Please select a role.",
        variant: "destructive",
      });
      return;
    }

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="flex justify-center min-h-screen">
      <div className="bg-[#F5F5F5] p-8 rounded-sm shadow-lg w-full max-w-md hover:shadow-2xl transition-shadow duration-300 md:h-[80vh]">
        <h1 className="text-3xl font-medium tracking-tight mb-4 text-center" style={{ fontFamily: 'Inter' }}>
          Create new account
        </h1>
        
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
        <div>
          <p className="mt-2 mb-2 text-center">
            Already have an account
            <Link
              className="font-medium ml-2 text-primary hover:underline"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
