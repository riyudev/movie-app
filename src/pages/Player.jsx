import { useEffect, useMemo, useState } from "react";
import { PiArrowCircleLeftThin } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../assets/loading.gif";

function Player() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [apiData, setApiData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const options = useMemo(
		() => ({
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTEzMmUxYjEwMjNmZTUyZWFjOGIzN2FiODcwZDI3YSIsIm5iZiI6MTczMjkzMzQ4Mi41MDQsInN1YiI6IjY3NGE3NzZhZDk0MDliMTNkMjk3NzQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jYCdc7vlPioucp_Qg7VuEQY4TfCZgwfcU-d1aO5EssI",
			},
		}),
		[]
	);

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
	}, [id, options]);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<PiArrowCircleLeftThin
				onClick={() => {
					navigate(-1);
				}}
				className="absolute text-5xl text-white cursor-pointer top-5 left-5 hover:text-slate-400"
			/>
			{error ? (
				<div className="flex flex-col items-center justify-center">
					<p className="text-lg text-white">{error}</p>
				</div>
			) : isLoading ? (
				<div className="flex items-center justify-center h-screen">
					<img src={Spinner} alt="Loading..." className="w-32" />
				</div>
			) : apiData ? (
				<>
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
				</>
			) : null}
		</div>
	);
}

export default Player;
