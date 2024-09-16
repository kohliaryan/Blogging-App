import { useState } from "react";
import Button from "../component/Button";
import InputField from "../component/InputField";
import { useNavigate } from "react-router-dom";
import { SignupInput } from "@aryankohli/blogapp-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import LoadingScreen from "../component/LoadingScreen";

export default function Signup() {
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postInputs: SignupInput = {
    name: fname,
    email: email,
    password: password,
  };

  const navigate = useNavigate();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        {warning && (
          <div className="mb-4 p-3 text-center text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
            {warning}
          </div>
        )}

        <form
          className="space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setLoading(true);

            try {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/signup`,
                postInputs
              );
              localStorage.setItem("token", `Bearer ${response.data.token}`);
              navigate("/landing");
            } catch (e) {
              // @ts-ignore
              setWarning(
                //@ts-ignore
                e.response.data.msg || "An error occurred. Please try again."
              );
            } finally {
              setLoading(false);
            }
          }}
        >
          <InputField label="Name" type="text" setState={setFname} />
          <InputField label="Email" type="email" setState={setEmail} />
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              minLength={8}
              type="password"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Button text="Sign Up" />
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            className="text-pink-600 hover:text-pink-700 underline"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
