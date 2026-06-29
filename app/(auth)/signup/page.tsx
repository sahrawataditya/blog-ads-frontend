"use client";
import { fetcher } from "@/lib/fether";
import { redirect } from "next/navigation";
import { useState } from "react";

const page = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function onSubmit(e: any) {
    e.preventDefault();

    const response = await fetcher.post("/auth/register", {
      name,
      email,
      password,
    });

    if (response?.status === 200) {
      alert("registered!");
      redirect("/login");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-[500px] mx-auto flex flex-col gap-2 justify-center items-center"
    >
      <div className="flex flex-col">
        <label htmlFor="mail">name</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setname(e.target.value)}
          className="border "
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="mail">Mail</label>
        <input
          type="text"
          id="mail"
          onChange={(e) => setemail(e.target.value)}
          className="border "
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          className="border "
        />
      </div>
      <button type="submit" className="p-2 bg-amber-600 rounded-4xl">
        Submit
      </button>
    </form>
  );
};

export default page;
