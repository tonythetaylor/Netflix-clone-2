"use client";

import Input from "@/components/input";
import axios from "axios";
import Image from "next/image";
import { useCallback, useState, ChangeEvent } from "react";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const register = useCallback(async () => {
    try {
      const response = await axios.post("/api/register", {
        email,
        name,
        password,
      });

      // Handle successful signup
      if (response.status === 200) {
        setVariant("login");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password]);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  return (
    <div className="relative h-screen w-screen bg-[url('/hero.jpg')] bg-no-repeat bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-4 ">
          <Image src={"/logo.png"} alt="logo" width={150} height={20} />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                    setName(ev.target.value)
                  }
                  id="name"
                  type="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                  setEmail(ev.target.value)
                }
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                  setPassword(ev.target.value)
                }
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white w-full rounded-md mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign Up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using nextflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white mk-1 hover:underline cursor-pointer"
              >
                {" "}
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
