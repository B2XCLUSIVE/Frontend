"use client";
import { useEffect } from "react";
import { usePostData } from "@/hooks/usePostData";
import Link from "next/link";

const AllSeriesHome = () => {
  const url =
    "https://b2xclusive.onrender.com/api/v1/track/movies?type=SEASONAL&page=1&limit=6";

  const { isLoading, isError, data } = usePostData("series", url);

  useEffect(() => {
    console.log("Fetched Data:", data);
  }, [data]); 

  if (isError)
    return (
      <div>
        <p className="text-red-500 font-bold">Error Fetching Posts</p>
      </div>
    );

  if (isLoading)
    return (
      <div className="w-[90%] md:w-5/6 mx-auto my-10 grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 py-8">
        <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg"></div>
        <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg"></div>
        <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg"></div>
        <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg"></div>
        <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg"></div>
        <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg"></div>
      </div>
    );

  // Extract movies data
  const movies = data?.data?.data?.movies || [];

  if (movies.length === 0) {
    return (
      <div>
        <p className="text-gray-500 font-bold">No series Available</p>
      </div>
    );
  }

  return (
    <section className="w-[90%] md:w-5/6 mx-auto my-10">
      <p className="text-2xl font-bold">New Series Uploads</p>
      <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 py-8">
        {movies.map((movie) => (
          <div key={movie.id} className="border rounded-md overflow-hidden">
            <Link href={`/series-menu/${movie.id}/`}>
              <div className="h-48 bg-gray-200">
                <img
                  src={movie.seasons[0]?.episodes[0]?.posterUrl?.url}
                  alt={movie.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="px-2 py-3 text-center font-medium">{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>

      <Link href="/series-menu">
        {" "}
        <button className="w-full py-2 bg-primarycolor text-white my-5 rounded-xl">
          Load more series
        </button>
      </Link>
    </section>
  );
};

export default AllSeriesHome;
