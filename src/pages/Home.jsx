import Navbar from "../components/Navbar";
import Banner from "../assets/movie_banner.jpg";
import { FaPlay } from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import MovieCards from "../components/MovieCards";
import Footer from "../components/Footer.jsx";

function Home() {
	return (
		<>
			<Navbar />
			<div className="relative">
				<img src={Banner} alt="" className="h-[110vh] w-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-transparent"></div>

				<div className="absolute bottom-2 w-full pl-[6%] space-y-6">
					<figure className="space-y-4 w-[35%]">
						<h1>The Platform 2</h1>

						<p className="text-base">
							After a mysterious leader imposes his law in a brutal system of
							vertical cells, a new arrival battles against a dubious food
							distribution method.
						</p>

						<div className="flex gap-x-5">
							<button className="inline-flex justify-center items-center gap-x-3 px-5 py-3 bg-white hover:bg-slate-300 w-[150px]">
								<FaPlay className="text-lg" />
								<p className="text-black">Play</p>
							</button>
							<button className="flex justify-center items-center gap-x-3 px-5 py-3 bg-slate-500 hover:bg-slate-600 w-[150px]">
								<GoInfo className="text-xl text-white" />
								<p>More Info</p>
							</button>
						</div>
					</figure>

					<MovieCards />
				</div>
			</div>
			<div className="ml-[6%]">
				<MovieCards title={"Blockbuster Movies"} category={"top_rated"} />
				<MovieCards title={"Only on Netflix"} category={"popular"} />
				<MovieCards title={"Upcoming"} category={"upcoming"} />
				<MovieCards title={"Top Picks for You"} category={"now_playing"} />
			</div>
			<Footer />
		</>
	);
}

export default Home;
