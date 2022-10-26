import React, { useEffect, useRef } from "react";
import {
  AdjustmentsHorizontalIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import * as Slider from "@radix-ui/react-slider";
import useTracklistStore from "~/utils/appStore/trackListStore";

const Filter: React.FC = () => {
  const menu = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropDownHeight, setDropDownHeight] = React.useState(0);
  const {
    popularity,
    acousticness,
    danceability,
    energy,
    tempo,
    valence,

    maxNumOfTracks,
  } = useTracklistStore((state) => state);

  useEffect(() => {
    if (isOpen) {
      setDropDownHeight(menu.current?.scrollHeight || 0);
    }
  }, [isOpen]);

  return (
    <div className="mb-6 w-full rounded  p-2  text-zinc-900 md:w-80 ">
      <div
        className={clsx(
          "flex transform items-center justify-between rounded-t-md bg-zinc-200 p-2 duration-100 ease-in-out",
          {
            "rounded-b-md": !isOpen,
          }
        )}
      >
        <p className="font-bold">Filter Tracklist</p>
        <AdjustmentsHorizontalIcon
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className={clsx("h-6 w-6 cursor-pointer", {
            "rotate-180 transform": isOpen,
            "rotate-0 transform": !isOpen,
          })}
        />
      </div>
      <div
        style={{ height: isOpen ? dropDownHeight + 10 : 0 }}
        className={clsx(
          "transform rounded-b-md bg-zinc-200 duration-300 ease-out",
          {
            " p-2 pb-2": isOpen,
            "mt-0": !isOpen,
          }
        )}
      >
        <div
          ref={menu}
          className={clsx("p-y transform space-y-2 duration-200 ease-out", {
            "opacity-0": !isOpen,
            " opacity-100": isOpen,
          })}
        >
          <form className=" space-y-4">
            <Input
              {...{
                label: "popularity",
                low: "playing at bars",
                high: "playing in stadiums",
                step: 10,
                min: 0,
                max: 100,
                initialValue: popularity,
              }}
            />
            <Input
              {...{
                label: "danceability",
                low: "cocktail party",
                high: "summer festival",
                step: 0.1,
                min: 0,
                max: 1,
                initialValue: danceability,
              }}
            />
            <Input
              {...{
                label: "energy",
                low: "library visit",
                high: "super bowl halftime show",
                step: 0.1,
                min: 0,
                max: 1,
                initialValue: energy,
              }}
            />
            <Input
              {...{
                label: "mood",
                low: "single on a rainy day",
                high: "dancing with your crush",
                step: 0.1,
                min: 0,
                max: 1,
                initialValue: valence,
              }}
            />
            <Input
              {...{
                label: "tempo",
                low: "slow and steady",
                high: "fast and furious",
                min: 0,
                max: 200,
                step: 10,
                initialValue: tempo,
              }}
            />
            <Input
              {...{
                label: "acousticness",
                low: "made with a computer",
                high: "made with a guitar",
                min: 0,
                max: 1,
                step: 0.1,
                initialValue: acousticness,
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Filter;

interface InputProps {
  label: string;
  low: string;
  high: string;
  min: number;
  max: number;
  step: number;
  initialValue: number[];
}

const Input: React.FC<InputProps> = ({
  label,
  low,
  high,
  min,
  max,
  step,
  initialValue,
}) => {
  const [value, setValue] = React.useState(initialValue);
  const {
    shadowTracklist,
    popularity,
    tempo,
    valence,
    tracklist,
    setShadowTracklist,
    energy,
    acousticness,
    danceability,
    setPopularity,
    setEnergy,
    setTempo,
    setDanceability,
    setValence,
    setAcousticness,
    setTracklist,
  } = useTracklistStore((state) => state);

  function update(e: number[]) {
    switch (label) {
      case "popularity":
        setPopularity(e);
        let po = shadowTracklist.filter((track) => {
          return (
            track.track.popularity >= e[0] && track.track.popularity <= e[1]
          );
        });
        if (popularity[0] > 0 || popularity[1] < 100) {
          setTracklist(po);
        } else {
          setTracklist(shadowTracklist);
        }

        break;
      case "energy":
        setEnergy(e);
        let en = shadowTracklist.filter((track) => {
          return track.features.energy >= e[0] && track.features.energy <= e[1];
        });
        if (energy[0] > 0 || energy[1] < 1) {
          setTracklist(en);
        } else {
          setTracklist(shadowTracklist);
        }
        break;
      case "tempo":
        setTempo(e);
        let te = shadowTracklist.filter((track) => {
          return track.features.tempo >= e[0] && track.features.tempo <= e[1];
        });
        if (tempo[0] > 0 || tempo[1] < 200) {
          setTracklist(te);
        } else {
          setTracklist(shadowTracklist);
        }
        break;
      case "danceability":
        setDanceability(e);
        let da = shadowTracklist.filter((track) => {
          return (
            track.features.danceability >= e[0] &&
            track.features.danceability <= e[1]
          );
        });
        if (danceability[0] > 0 || danceability[1] < 1) {
          setTracklist(da);
        } else {
          setTracklist(shadowTracklist);
        }
        break;
      case "mood":
        setValence(e);
        let va = shadowTracklist.filter((track) => {
          return (
            track.features.valence >= e[0] && track.features.valence <= e[1]
          );
        });
        if (valence[0] > 0 || valence[1] < 1) {
          setTracklist(va);
        } else {
          setTracklist(shadowTracklist);
        }
        break;
      case "acousticness":
        setAcousticness(e);
        let ac = shadowTracklist.filter((track) => {
          return (
            track.features.acousticness >= e[0] &&
            track.features.acousticness <= e[1]
          );
        });
        if (acousticness[0] > 0 || acousticness[1] < 1) {
          setTracklist(ac);
        } else {
          setTracklist(shadowTracklist);
        }
        break;
    }
  }
  return (
    <div className="w-full space-y-2 border-b border-zinc-400 pb-2">
      <label className="text-sm font-bold uppercase">{label}</label>
      <Slider.Root
        aria-label={label}
        name={label}
        defaultValue={initialValue}
        onValueChange={(v) => {
          setValue(v);
          update(v);
        }}
        onValueCommit={(v) => {}}
        min={min}
        max={max}
        step={step}
        className="relative flex w-full items-center bg-blue-200 radix-orientation-horizontal:h-2"
      >
        <Slider.Track className="relative grow rounded-full bg-zinc-700 radix-orientation-horizontal:h-2">
          <Slider.Range className="absolute h-full rounded-full bg-emerald-300" />
        </Slider.Track>
        <Slider.Thumb className=" block h-4 w-4 cursor-pointer rounded-full bg-zinc-800 shadow-lg active:cursor-grabbing" />
        <Slider.Thumb className=" block h-4 w-4 cursor-pointer rounded-full bg-zinc-800 shadow-lg active:cursor-grabbing" />
      </Slider.Root>
      <div className="flex items-center justify-between">
        <p className="text-xs capitalize">{low}</p>
        <p className="text-xs capitalize">{high}</p>
      </div>
    </div>
  );
};
