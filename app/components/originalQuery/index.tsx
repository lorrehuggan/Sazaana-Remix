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
    <div className="sticky top-5 mb-6 flex items-center justify-between gap-2 rounded bg-gradient-to-b from-zinc-800 to-zinc-900 p-2 opacity-90">
      <div className="flex items-center gap-2">
        <img
          src={data?.originalQuery.image}
          alt={data?.originalQuery.name}
          className="h-8 w-8 rounded-full border-[2px] object-cover"
        />
        <div className="flex flex-col justify-between">
          <p className="font-bold">{data?.originalQuery.name}</p>
          <div className="flex items-center gap-1">
            <span className="text-xs">
              {`${intToString(data?.originalQuery.followers!)} `}
            </span>
            <HeartIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
      <Link to="/search">
        <ArrowUturnLeftIcon className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default OriginalQuery;
