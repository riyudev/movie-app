import React, { useEffect, useState } from "react";
import { PiArrowCircleLeftThin } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../assets/loading.gif";

function Player() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTEzMmUxYjEwMjNmZTUyZWFjOGIzN2FiODcwZDI3YSIsIm5iZiI6MTczMjkzMzQ4Mi41MDQsInN1YiI6IjY3NGE3NzZhZDk0MDliMTNkMjk3NzQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jYCdc7vlPioucp_Qg7VuEQY4TfCZgwfcU-d1aO5EssI",
    },
  };

  useEffect(() => {
    let timer;

    setIsLoading(true);

    timer = setTimeout(() => {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        options
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            setApiData(data.results[0]);
          } else {
            setError("No videos found for this movie.");
          }
        })
        .catch(() => {
          setError("Failed to fetch video data. Please try again later.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <PiArrowCircleLeftThin
        onClick={() => {
          navigate(-1);
        }}
        className="absolute top-5 left-5 text-5xl text-white hover:text-slate-400 cursor-pointer"
      />
      {error ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-white text-lg">{error}</p>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <img src={Spinner} alt="Loading..." className="w-20 laptop:w-32" />
        </div>
      ) : apiData ? (
        <>
          <iframe
            className="w-[98%] h-[40%] laptop:size-[85%]"
            src={`https://www.youtube.com/embed/${apiData.key}`}
            allow="autoplay;"
            title="trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="flex flex-col laptop:flex-row justify-between space-y-3 laptop:space-y-0 w-[85%] mt-5">
            <p className="text-sm laptop:text-base">
              {apiData.published_at.slice(0, 10)}
            </p>
            <p className="text-sm laptop:text-base">{apiData.name}</p>
            <p className="text-sm laptop:text-base">{apiData.type}</p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Player;
