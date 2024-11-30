import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const MovieCards = ({ title, category }) => {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTEzMmUxYjEwMjNmZTUyZWFjOGIzN2FiODcwZDI3YSIsIm5iZiI6MTczMjkzMzQ4Mi41MDQsInN1YiI6IjY3NGE3NzZhZDk0MDliMTNkMjk3NzQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jYCdc7vlPioucp_Qg7VuEQY4TfCZgwfcU-d1aO5EssI",
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
      <h2 className="font-poppinsBold text-2xl mt-10">
        {title ? title : "Popular on Netflix"}
      </h2>
      <div
        ref={cardsRef}
        className="flex space-x-3 max-w-full overflow-x-scroll scrollbar-none mt-3 py-3"
      >
        {apiData.map((card, index) => (
          <Link
            to={`/player/${card.id}`}
            key={index}
            className="relative flex-shrink-0 w-60 cursor-pointer hover:scale-105 duration-200 ease-in-out"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-transparent"></div>
            <img
              src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
              alt=""
              className="cursor-pointer object-cover rounded-md"
            />
            <p className="absolute bottom-1 left-1 font-poppinsRegular text-center text-lg">
              {card.original_title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieCards;
