/* AuthPage.js */
import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

export default function AuthPage() {
  const [choice, setChoice] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <main className="flex flex-1 w-full flex-col md:flex-row bg-white">
        <div className="relative flex-1 flex flex-col-reverse md:flex-row-reverse items-center justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3 p-6 space-y-4 md:me-12">
            {!choice && (
              <div className="flex flex-col gap-5 relative z-10">
                <h1 className="text-4xl md:text-5xl lg:text-7xl text-purple-700 font-normal mb-4 text-center md:text-right">
                  Welcome!
                </h1>
                <p className="text-gray-900 mb-6 text-center md:text-right">
                  Please choose an option to proceed.
                </p>
                <hr />
                <div className="flex flex-col gap-5">
                  <button
                    className="mx-auto w-1/2 md:w-1/3 justify-center bg-gradient-to-b from-purple-600 to-pink-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                    onClick={() => setChoice("signup")}
                  >
                    Sign Up
                  </button>
                  <button
                    className="mx-auto w-1/2 md:w-1/3 justify-center bg-gradient-to-b from-purple-600 to-pink-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                    onClick={() => setChoice("login")}
                  >
                    Login
                  </button>
                </div>
              </div>
            )}
            {choice === "signup" && (
              <>
                <button
                  className="text-purple-700 mb-4 underline hover:text-purple-900"
                  onClick={() => setChoice(null)}
                >
                  &larr; Back
                </button>
                <SignUp />
              </>
            )}
            {choice === "login" && (
              <>
                <button
                  className="text-purple-700 mb-4 underline hover:text-purple-900"
                  onClick={() => setChoice(null)}
                >
                  &larr; Back
                </button>
                <Login />
              </>
            )}
          </div>

          <div className="w-full flex-1 md:w-1/2 flex items-center">
            <img
              className="absolute w-full h-screen md:relative md:max-w-full blur-md md:blur-none"
              src="/2812768.svg"
              alt="Auth Options"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
