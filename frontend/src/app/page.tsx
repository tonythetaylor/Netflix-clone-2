"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
import Billboard from "@/components/billboard";
import MovieList from "@/components/movie-list";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/info-modal";
import useInfoModal from "@/hooks/useInfoModals";

export default function Home() {
  const { data: session } = useSession();
  const {data: movies = []} = useMovieList()
  const {data: favorites = []} = useFavorites()
const { isOpen, closeModal} = useInfoModal();
  const { body } = movies;

  if (!session) {
    redirect("/auth");
  }

  const { user } = session;

  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={body}/>
        <MovieList title="My List" data={favorites}/>
      </div>
    </>
  );
}
