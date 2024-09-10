import Button from "../component/Button";
import InputField from "../component/InputField";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-purple-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form className="space-y-4">
          <InputField label="Name" type="text" />

          <InputField label="Email" type="email" />
          <InputField label="Password" type="password" />
          <InputField label="Confirm Password" type="password" />
          <Button text="Sign Up" />
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <button onClick={()=> 
            navigate("/signin")}>Sign In</button>
        </p>
      </div>
    </div>
  );
}
