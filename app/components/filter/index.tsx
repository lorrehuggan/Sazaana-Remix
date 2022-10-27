import React, { useEffect, useMemo, useRef } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
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
    <div className="mb-6 w-full rounded text-zinc-50 md:relative md:w-80 ">
      <div className="md:z-50">
        <div
          className={clsx(
            "flex transform items-center justify-between rounded-t bg-base-200 p-2 duration-100 ease-in-out ",
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
          style={{ height: isOpen ? dropDownHeight + 16 : 0 }}
          className={clsx("transform rounded-b-md bg-base-200", {
            "px-2": isOpen,
            "": !isOpen,
          })}
        >
          <div
            ref={menu}
            className={clsx("p-y  space-y-2 ", {
              "opacity-0": !isOpen,
              "opacity-100": isOpen,
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

  useMemo(() => {
    if (
      popularity[0] > 0 ||
      popularity[1] < 100 ||
      danceability[0] > 0 ||
      danceability[1] < 1 ||
      energy[0] > 0 ||
      energy[1] < 1 ||
      valence[0] > 0 ||
      valence[1] < 1 ||
      tempo[0] > 0 ||
      tempo[1] < 200 ||
      acousticness[0] > 0 ||
      acousticness[1] < 1
    ) {
      let f = shadowTracklist.filter((track) => {
        return (
          track.track.popularity >= popularity[0] &&
          track.track.popularity <= popularity[1] &&
          track.features.danceability >= danceability[0] &&
          track.features.danceability <= danceability[1] &&
          track.features.energy >= energy[0] &&
          track.features.energy <= energy[1] &&
          track.features.valence >= valence[0] &&
          track.features.valence <= valence[1] &&
          track.features.tempo >= tempo[0] &&
          track.features.tempo <= tempo[1] &&
          track.features.acousticness >= acousticness[0] &&
          track.features.acousticness <= acousticness[1]
        );
      });
      setTracklist(f);
    }
  }, [
    popularity,
    energy,
    tempo,
    danceability,
    acousticness,
    valence,
    setTracklist,
    shadowTracklist,
  ]);

  function update(e: number[]) {
    switch (label) {
      case "popularity":
        setPopularity(e);

        break;
      case "energy":
        setEnergy(e);

        break;
      case "tempo":
        setTempo(e);

        break;
      case "danceability":
        setDanceability(e);

        break;
      case "mood":
        setValence(e);

        break;
      case "acousticness":
        setAcousticness(e);

        break;
    }
  }
  return (
    <div className="w-full space-y-2">
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
        className="relative flex w-full items-center bg-zinc-800 radix-orientation-horizontal:h-1"
      >
        <Slider.Track className="relative grow rounded-full bg-zinc-700 radix-orientation-horizontal:h-1">
          <Slider.Range className="absolute h-full rounded-full bg-primary-100" />
        </Slider.Track>
        <Slider.Thumb className=" block h-4 w-4 cursor-grab rounded-full bg-zinc-50 shadow-md focus:cursor-grabbing " />
        <Slider.Thumb className=" block h-4 w-4 cursor-grab rounded-full bg-zinc-50 focus:cursor-grabbing   " />
      </Slider.Root>
      <div className="flex items-center justify-between">
        <p className="text-xs capitalize">{low}</p>
        <p className="text-xs capitalize">{high}</p>
      </div>
    </div>
  );
};
