"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

import useMovie from "@/hooks/useMovie";

const Watch = () => {
  const router = useRouter();
  const params = useParams();

  const { movieId } = params;

  const { data } = useMovie(movieId as string);
  // const { movie } = data;

  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className="
      fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70"
      >
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {data?.movie?.title}
        </p>
      </nav>
      <video
        src={data?.movie?.videoUrl}
        autoPlay
        controls
        className="h-full w-full"
      ></video>
    </div>
  );
};

export default Watch;
