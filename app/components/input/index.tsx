import React, { useEffect, useRef } from "react";
import Button from "../ui/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Form, useActionData, useTransition } from "@remix-run/react";
import DropDown from "../dropdown";

type ActionData = {
  success: boolean;
  data: SpotifyApi.SingleArtistResponse[] | null;
  error: { artist: string[] } | null;
};

interface Props {
  action?: string;
}

const Input: React.FC<Props> = ({ action }) => {
  const data = useActionData<ActionData>();
  const transition = useTransition();
  const isSearching = transition.submission;
  const formRef = useRef<HTMLFormElement>(null);

  /* Resetting the form when the user submits the form. */
  useEffect(() => {
    if (isSearching) {
      formRef.current?.reset();
    }
  }, [isSearching]);

  return (
    <>
      <Form
        ref={formRef}
        className="mt-8 flex w-full justify-between border-b-[1px] border-zinc-500 pb-2 "
        method="post"
        action={"/search"}
      >
        <input
          alt="Search"
          aria-label="Enter an artist name"
          type="text"
          name="artist"
          className=" flex-1 bg-base-100 focus:outline-none"
          placeholder="Search Artist"
        />
        <Button
          state={transition.state}
          type="submit"
          theme="primary-outline"
          size="small"
          title="Search"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </Button>
      </Form>
      {data?.error && (
        <div className="mt-2 flex items-center gap-1 text-sm text-accent-100">
          <ExclamationCircleIcon className="h-5 w-5" />
          <p>{data.error.artist}</p>
        </div>
      )}
      {data?.data && <DropDown artists={data.data} />}
    </>
  );
};

export default Input;
