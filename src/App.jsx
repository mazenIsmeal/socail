import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routing/Routing";
import AuthContextProvider from "./Contexts/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
