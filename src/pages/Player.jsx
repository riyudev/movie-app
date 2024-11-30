import React, { useEffect, useState } from "react";
import { PiArrowCircleLeftThin } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";

function Player() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, SetApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTEzMmUxYjEwMjNmZTUyZWFjOGIzN2FiODcwZDI3YSIsIm5iZiI6MTczMjkzMzQ4Mi41MDQsInN1YiI6IjY3NGE3NzZhZDk0MDliMTNkMjk3NzQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jYCdc7vlPioucp_Qg7VuEQY4TfCZgwfcU-d1aO5EssI",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => SetApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <PiArrowCircleLeftThin
        onClick={() => {
          navigate("/");
        }}
        className="absolute top-5 left-5 text-5xl text-white hover:text-slate-400 cursor-pointer"
      />
      <iframe
        width="85%"
        height="85%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        allow="autoplay;"
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="flex justify-between w-[85%] mt-5">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}

export default Player;
