import { ArrowUturnLeftIcon, HeartIcon } from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import React from "react";
import type { LoaderData } from "~/routes/search/$artist";
import { intToString } from "~/utils";

interface Props {
  data: LoaderData["data"];
}

const OriginalQuery: React.FC<Props> = ({ data }) => {
  return (
    <div className="sticky top-5 z-50 mb-6 flex items-center justify-between gap-2 rounded bg-base-200 p-2 opacity-90">
      <div className="flex items-center gap-2">
        <img
          src={data?.originalQuery.image}
          alt={data?.originalQuery.name}
          className="h-10 w-10 rounded-full border-[2px] object-cover"
        />
        <div className="flex flex-col justify-between">
          <p className="font-bold ">{data?.originalQuery.name}</p>
          <div className="flex items-center gap-1">
            <span className="text-xs ">
              {`${intToString(data?.originalQuery.followers!)} `}
            </span>
            <HeartIcon className="h-4 w-4 fill-accent-200" />
          </div>
        </div>
        <div></div>
      </div>
      <Link to="/search">
        <ArrowUturnLeftIcon className="h-6 w-6 hover:fill-primary-100" />
      </Link>
    </div>
  );
};

export default OriginalQuery;
