import React, { useEffect, useRef } from "react";
import Button from "../ui/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useFetcher } from "@remix-run/react";
import DropDown from "../dropdown";

type ActionData = {
  success: boolean;
  data: SpotifyApi.SingleArtistResponse[] | null;
  error: { artist: string[] } | null;
};

const Input: React.FC = () => {
  const fetcher = useFetcher<ActionData>();
  const isSearching = fetcher.submission;
  const formRef = useRef<HTMLFormElement>(null);

  /* Resetting the form when the user submits the form. */
  useEffect(() => {
    if (isSearching) {
      formRef.current?.reset();
    }
  }, [isSearching]);

  return (
    <>
      <fetcher.Form
        ref={formRef}
        className="mt-8 flex w-full justify-between border-b-2 pb-2 "
        method="post"
      >
        <input
          alt="Search"
          aria-label="Enter an artist name"
          type="text"
          name="artist"
          className=" flex-1 bg-zinc-900 focus:outline-none"
          placeholder="Search Artist"
        />
        <Button
          state={fetcher.state}
          type="submit"
          theme="primary-outline"
          size="small"
          title="Search"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </Button>
      </fetcher.Form>
      {fetcher.data?.error && (
        <div className="mt-2 flex items-center gap-1 text-sm text-amber-500">
          <ExclamationCircleIcon className="h-5 w-5" />
          <p>{fetcher.data.error.artist}</p>
        </div>
      )}
      {fetcher.data && <DropDown artists={fetcher.data.data} />}
    </>
  );
};

export default Input;
