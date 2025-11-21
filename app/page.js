
export default function Home() {
	return (
	<main className="min-h-screen w-full flex items-center justify-center bg-black">
	<div className="text-center">
	 <h1 className="text-3xl  text-white font-bold font-serif  mb-4">Welcome</h1>
	 <p className="font-serif mb-6">This is the home page. Go to the login page to sign in.</p>
	<a href="/login" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Go to Login</a>
	</div>
	</main>
	);
}
