import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Logged in successfully!");
      navigate('/map');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleLogin} className="flex flex-col gap-5 relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-7xl text-purple-700 font-normal mb-4 text-center md:text-right">
          LOGIN
        </h1>
        <p className="text-gray-900 mb-6 text-center md:text-right">
          Please login to continue.
        </p>
        <hr />
        <div className="flex flex-col gap-5">
          <div className="rounded-lg shadow-xl border flex items-center border-gray-300 py-2">
            <input
              className={`appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none ${
                formErrors.email && "border-red-500"
              }`}
              type="email"
              placeholder="E-mail"
              aria-label="E-mail"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
          <div className="rounded-lg shadow-xl border flex items-center border-gray-300 py-2">
            <input
              className={`appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none ${
                formErrors.password && "border-red-500"
              }`}
              type="password"
              placeholder="Password"
              aria-label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          {formErrors.password && (
            <p className="text-red-500 text-sm">{formErrors.password}</p>
          )}
          <div className="flex">
            <button
              type="submit"
              className="mx-auto w-1/2 md:w-1/3 justify-center bg-gradient-to-b from-purple-600 to-pink-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
