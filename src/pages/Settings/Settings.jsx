import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { IoKeySharp } from "react-icons/io5";
import { SettingSechema } from "../../Sechema/RegisterationSechema";
import axios from "axios";
import { headerObjData } from "../../Helpers/Headers";
import toast from "react-hot-toast";

export default function Settings() {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(SettingSechema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  async function changePassword(values) {
    console.log(values);
    try {
      const response = await axios.patch(
        "https://route-posts.routemisr.com/users/change-password",
        values,
        headerObjData,
      );
      reset();
      toast.success("password changed successfully");
      return response;
    } catch (error) {
      console.log(error);
      toast.error("some thing error pleas try again");
    }
  }

  return (
    <>
      <div className="flex items-center justify-center my-20">
        <div className="bg-white rounded-2xl w-200">
          <div className="flex items-center gap-3 p-5">
            <div className="size-10 bg-[#E7F3FF] rounded-full flex items-center justify-center text-blue-500 text-xl">
              <IoKeySharp />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Change Password</h3>
              <p className="text-neutral-500">
                Keep your account secure by using a strong password.
              </p>
            </div>
          </div>
          <form className="p-5" onSubmit={handleSubmit(changePassword)}>
            <div className="mb-5">
              <label htmlFor="currentPassword" className="text-neutral-500">
                Enter Current Password
              </label>
              <input
                className="block bg-gray-100 border border-gray-200 p-2 w-full my-2 rounded-xl"
                type="password"
                placeholder="Enter Current Password"
                id="currentPassword"
                {...register("password")}
              />
              {formState.errors.password && (
                <p className="text-sm text-red-500">
                  {formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="newPassword" className="text-neutral-500">
                Enter New Password
              </label>
              <input
                className="block bg-gray-100 border border-gray-200 p-2 w-full my-2 rounded-xl"
                type="password"
                placeholder="Enter New Password"
                id="newPassword"
                {...register("newPassword")}
              />
              {formState.errors.newPassword && (
                <p className="text-sm text-red-500">
                  {formState.errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <Button type="submit" className="w-full cursor-pointer">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
