import React, { useEffect, useRef, useState } from "react";

const MovieCards = ({ title, category, onMovieClick }) => {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const handlwheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handlwheel);
  }, []);

  return (
    <div className="">
      <h2 className="font-poppinsBold text-xl laptop:text-2xl mt-10">
        {title ? title : "Popular on Netflix"}
      </h2>
      <div
        ref={cardsRef}
        className="flex space-x-3 max-w-full overflow-x-scroll scrollbar-none mt-3 py-3 px-2"
      >
        {apiData.map((card, index) => (
          <div
            key={index}
            onClick={() => onMovieClick(card)}
            className="relative flex-shrink-0 w-52 laptop:w-60 cursor-pointer hover:scale-105 duration-200 ease-in-out"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-transparent"></div>
            <img
              src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
              alt="no images to show :("
              className="cursor-pointer object-cover rounded-md text-white"
            />
            <p className="absolute bottom-1 left-1 font-poppinsRegular text-center text-sm laptop:text-lg">
              {card.original_title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCards;
