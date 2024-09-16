import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import InputField from "../component/InputField";
import { useState } from "react";
import LoadingScreen from "../component/LoadingScreen";
import axios from "axios";
import { SigninInput } from "@aryankohli/blogapp-common";
import { BACKEND_URL } from "../config";

export default function Signin() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const postInputs: SigninInput = {
    email: email,
    password: password,
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>
        <form
          className="space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setLoading(true);
            try {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/signin`,
                postInputs
              );
              localStorage.setItem("token", `Bearer ${response.data.token}`);
              navigate("/landing");
            } catch (e) {
              //@ts-ignore
              setWarning(
                //@ts-ignore
                e.response.data.msg || "Wrong email/password. Please try again."
              );
            } finally {
              setLoading(false);
            }
          }}
        >
          <InputField label="Email" type="email" setState={setEmail} />
          <InputField label="Password" type="password" setState={setPassword} />
          <Button text="Sign In" />
        </form>

        <p className="text-center text-gray-600 mt-4">
          New to Blogging App?{" "}
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </p>
      </div>
    </div>
  );
}
