import { redirect } from "next/dist/server/api-utils";
import React from "react";

const page = () => {
  redirect("/");
  return <></>;
};

export default page;
