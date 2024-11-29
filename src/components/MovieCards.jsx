import React, { useEffect, useRef } from "react";
import movieData from "../assets/movie.js";

const MovieCards = ({ title, category }) => {
  const cardsRef = useRef();

  const handlwheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handlwheel);
  }, []);

  return (
    <div className="">
      <h2 className="font-poppinsBold mt-10">
        {title ? title : "Popular on Netflix"}
      </h2>
      <div
        ref={cardsRef}
        className="flex space-x-2 max-w-full overflow-x-scroll scrollbar-none mt-5"
      >
        {movieData.map((card, index) => (
          <div key={index} className="relative flex-shrink-0 w-52">
            <img
              src={card.image}
              alt=""
              className="cursor-pointer object-cover rounded-md"
            />
            <p className="font-poppinsBold text-center text-lg">{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCards;
