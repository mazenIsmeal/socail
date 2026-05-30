import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button, Label, Radio, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterationSechema } from "../../Sechema/RegisterationSechema";
import { Rings } from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContextProvider";

export default function SingUp() {
  const navigate = useNavigate();
  const baseUrl = "https://route-posts.routemisr.com";
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState();
  const { setToken } = useContext(AuthContext);

  const { register, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(RegisterationSechema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      gender: "",
      dateOfBirth: "",
    },
  });
  // token  tokenType
  async function sendDataSingUp(value) {
    setLoading(true);
    try {
      console.log(value);
      reset();
      const res = await axios.post(`${baseUrl}/users/signup`, value);
      console.log(res.data);

      if (res.data.message === "account created") {
        localStorage.setItem("token", res.data.data.token);
        setMsg(res.data.message);
        navigate("/login");
        setToken(res.data.data.token);
      }
    } catch (error) {
      setMsg(error.response?.data?.message || error.message);
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="bg-black text-white flex justify-center items-center flex-col p-3">
            <div>
              <span className="text-sm">Welcome to Social Media</span>
              <h1 className="text-8xl font-bold my-2 uppercase">App Social</h1>
              <p className="text-base/relaxed text-neutral-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, maxime amet pariatur omnis voluptatem placeat, at
                tempora quidem harum explicabo quod eveniet nulla expedita
                rerum.
              </p>
            </div>
          </div>
          <div className="lg:w-125 w-full rounded-2xl mx-auto my-20 p-5 bg-amber-50">
            <form onSubmit={handleSubmit(sendDataSingUp)}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name">Your Name</Label>
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="enter your name"
                  {...register("name")}
                />
                {formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name">user Name</Label>
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="enter your name"
                  {...register("username")}
                />
                {formState.errors.username && (
                  <p className="text-sm text-red-500">
                    {formState.errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1">Your email</Label>
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  placeholder="name@flowbite.com"
                  {...register("email")}
                />
                {formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password">Your Password</Label>
                </div>
                <TextInput
                  id="password"
                  type="password"
                  placeholder="enter your password"
                  {...register("password")}
                />
                {formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {formState.errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="rePassword">Your rePassword</Label>
                </div>
                <TextInput
                  id="rePassword"
                  type="password"
                  placeholder="enter your rePassword"
                  {...register("rePassword")}
                />
                {formState.errors.rePassword && (
                  <p className="text-sm text-red-500">
                    {formState.errors.rePassword.message}
                  </p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="dateOfBirth">dateOfBirth</Label>
                </div>
                <TextInput
                  id="dateOfBirth"
                  type="date"
                  placeholder="name@flowbite.com"
                  {...register("dateOfBirth")}
                />
                {formState.errors.dateOfBirth && (
                  <p className="text-sm text-red-500">
                    {formState.errors.dateOfBirth.message}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 my-2">
                <div className="flex items-center gap-2">
                  <Radio
                    id="male"
                    name="countries"
                    value="male"
                    defaultChecked
                    {...register("gender")}
                  />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="female"
                    name="countries"
                    value="female"
                    {...register("gender")}
                  />
                  <Label htmlFor="female">Female</Label>
                </div>
              </div>
              <Button
                color="dark"
                type="submit"
                className="my-3 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Rings
                      visible={true}
                      height="40"
                      width="40"
                      color="#4fa94d"
                      ariaLabel="rings-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                    Loading
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
            {msg}
            <NavLink to='/login' className="text-sm text-blue-500">
              Already have an account? Login
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
