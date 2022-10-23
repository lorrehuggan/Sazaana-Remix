import React from "react";
import Button from "../ui/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Form, useLoaderData } from "@remix-run/react";
import type { ActionArgs, ActionFunction } from "@remix-run/node";

const Input: React.FC = () => {
  return (
    <Form
      className="mt-8 flex w-full justify-between border-b-2 pb-2 "
      method="post"
    >
      <input
        type="text"
        name="search"
        className=" flex-1 bg-zinc-900 focus:outline-none"
        placeholder="Search Artist"
      />
      <Button type="submit" theme="primary-outline" size="small" title="Search">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </Button>
    </Form>
  );
};

export default Input;
