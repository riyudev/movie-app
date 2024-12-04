import { useState } from "react";
import Logo from "../assets/netflix-logo.png";
import Spinner from "../assets/loading.gif";
import { MdErrorOutline } from "react-icons/md";
import { login, signup } from "../Firebase.js";

function Login() {
	const [signState, setSignState] = useState("Sign In");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const user_auth = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError(false);
		try {
			if (signState === "Sign In") {
				await login(email, password);
			} else {
				await signup(name, email, password);
			}
		} catch (err) {
			setError(true);
		}
		setLoading(false);
	};

	const toggleSignState = () => {
		setLoading(true);
		setTimeout(() => {
			setSignState((prevState) =>
				prevState === "Sign In" ? "Sign Up" : "Sign In"
			);
			setName("");
			setEmail("");
			setPassword("");
			setError(false);
			setLoading(false);
		}, 1000);
	};

	return loading ? (
		<div className="flex items-center justify-center h-screen">
			<img src={Spinner} alt="" className="w-32" />
		</div>
	) : (
		<div
			className="flex flex-col items-center justify-center h-screen bg-center bg-cover"
			style={{ backgroundImage: `url(/bglogin.jpg)` }}
		>
			<img src={Logo} alt="" className="absolute top-[3%] left-[6%] w-36" />

			<form
				className="flex flex-col bg-black bg-opacity-60 p-10 px-12 space-y-8 rounded-md max-w-[400px] w-full"
				onSubmit={user_auth}
			>
				<h2 className="tracking-wider font-poppinsBold">{signState}</h2>

				<div className="flex flex-col space-y-4 font-poppinsRegular">
					<div
						className={`flex space-x-1 justify-center items-center ${
							error ? "opacity-100" : "opacity-0"
						}`}
					>
						<MdErrorOutline className="text-sm text-red-600" />
						<p className="text-xs text-center text-red-600">
							Invalid credentials!
						</p>
					</div>

					{signState === "Sign Up" && (
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							type="text"
							placeholder="Your Name"
							required
							className="rounded-sm"
						/>
					)}

					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Email"
						required
						className="rounded-sm"
					/>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
						required
						className="rounded-sm"
					/>
				</div>

				<button
					type="submit"
					className="py-3 bg-red-600 rounded-sm hover:bg-red-700"
				>
					<p>{signState}</p>
				</button>

				<div className="flex justify-between">
					<div className="flex items-center space-x-1">
						<input
							type="checkbox"
							className="cursor-pointer size-4 focus:ring-transparent checked:text-black checked:border-none"
						/>
						<label className="text-sm" htmlFor="">
							Remember Me
						</label>
					</div>
					<p className="text-sm cursor-pointer">Need Help?</p>
				</div>

				<div className="text-sm">
					{signState === "Sign In" ? (
						<p>
							New to Netflix?{" "}
							<span
								onClick={toggleSignState}
								className="text-blue-600 underline cursor-pointer"
							>
								Sign Up Now
							</span>
						</p>
					) : (
						<p>
							Already have an Account?{" "}
							<span
								onClick={toggleSignState}
								className="text-blue-600 underline cursor-pointer"
							>
								Sign In Now
							</span>
						</p>
					)}
				</div>
			</form>
		</div>
	);
}

export default Login;
