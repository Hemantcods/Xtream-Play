export default function Hero() {
  return (
    <section className="relative bg-gray-50 py-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 sm:text-5xl md:text-6xl">
          Join the Tournament Arena
        </h1>
        <p className="mt-6 text-center text-lg text-gray-600 max-w-2xl mx-auto">
          Compete in exciting tournaments, win prizes, and climb the leaderboards.
          Whether you're a casual player or a pro, there's a place for you here.
        </p>
        <div className="mt-10 flex justify-center space-x-6">
          <a href="/dashboard/create" className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
            Create a Tournament
          </a>
          <a href="/dashboard" className="rounded-md border border-indigo-600 px-5 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
            Browse Tournaments
          </a>
        </div>
      </div>
    </section>
  );
}