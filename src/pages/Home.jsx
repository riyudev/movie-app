import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaPlay } from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import MovieCards from "../components/MovieCards";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

function Home() {
  const [bannerMovie, setBannerMovie] = useState(null);

  const categories = [
    { title: "Blockbuster Movies", endpoint: "top_rated" },
    { title: "Only on Netflix", endpoint: "popular" },
    { title: "Upcoming", endpoint: "upcoming" },
    { title: "Top Picks for You", endpoint: "now_playing" },
  ];

  const fetchBannerMovie = async () => {
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);
    const category = categories[randomCategoryIndex].endpoint;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTEzMmUxYjEwMjNmZTUyZWFjOGIzN2FiODcwZDI3YSIsIm5iZiI6MTczMjkzMzQ4Mi41MDQsInN1YiI6IjY3NGE3NzZhZDk0MDliMTNkMjk3NzQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jYCdc7vlPioucp_Qg7VuEQY4TfCZgwfcU-d1aO5EssI",
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
        options
      );
      const data = await response.json();
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      setBannerMovie(randomMovie);
    } catch (error) {
      console.error("Error fetching banner movie:", error);
    }
  };

  const handleMovieClick = (movie) => {
    setBannerMovie(movie);
    // Scroll to top to show the new banner
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchBannerMovie();
  }, []); // Only run once on component mount

  return (
    <>
      <Navbar />
      <div className="relative">
        {bannerMovie && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`}
              alt={bannerMovie.title}
              className="h-[50vh] laptop:h-[110vh] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-transparent"></div>

            <div className="absolute bottom-2 w-full pl-[6%] space-y-6">
              <figure className="flex flex-col items-start justify-start space-y-4 w-[40%] laptop:w-[35%]">
                <h1 className="text-xl laptop:text-6xl">
                  {bannerMovie.title}
                </h1>

                <p className="hidden laptop:block text-base">
                  {bannerMovie.overview}
                </p>

                <div className="flex flex-col laptop:flex-row gap-y-2 gap-x-5">
                  <Link to={`/player/${bannerMovie.id}`}>
                    <button className="inline-flex justify-center items-center gap-x-1 laptop:gap-x-3 px-5 py-2 laptop:py-3 bg-white hover:bg-slate-300 w-[120px] laptop:w-[150px]">
                      <FaPlay className="text-sm laptop:text-lg" />
                      <p className="text-black text-xs laptop:text-base">Play</p>
                    </button>
                  </Link>
                  <button className="flex justify-center items-center gap-x-1 laptop:gap-x-3 px-5 py-2 laptop:py-3 bg-slate-500 hover:bg-slate-600 w-[120px] laptop:w-[150px]">
                    <GoInfo className="text-white text-base laptop:text-xl" />
                    <p className="text-xs laptop:text-base">More Info</p>
                  </button>
                </div>
              </figure>

              <div className="hidden laptop:block">
                <MovieCards onMovieClick={handleMovieClick} />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="ml-[6%]">
        {categories.map((category, index) => (
          <MovieCards 
            key={index} 
            title={category.title} 
            category={category.endpoint}
            onMovieClick={handleMovieClick}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Home;
