// "use client";
//
// import { FaFileDownload } from "react-icons/fa";
// import { usePostData } from "@/hooks/usePostData";
// import { useEffect } from "react";

// const SingleMovie = ({ id }) => {
//   const url = `https://b2xclusive.onrender.com/api/v1/track/movie/${id}`;

//   const { isLoading, isError, data } = usePostData("single movie", url);

//   useEffect(() => {
//     console.log("Fetched Data:", data);
//   }, [data]);

//   if (isError)
//     return (
//       <div>
//         <p className="text-red-500 font-bold">Error Fetching Posts</p>
//       </div>
//     );

//   if (isLoading)
//     return (
//       <div className="w-[90%] md:w-5/6 mx-auto my-10">
//         <div className="h-80 w-full bg-gray-300 animate-pulse rounded-lg"></div>
//       </div>
//     );

//   // Extract movie data
//   const movie = data?.data?.data?.movie;

//   if (!movie) {
//     return (
//       <div>
//         <p className="text-gray-500 font-bold">No Movie Found</p>
//       </div>
//     );
//   }

//   const embedYouTubeUrl = (url) => {
//     if (!url) return ""; // Return empty if no URL
//     const videoId = url.split("v=")[1]?.split("&")[0]; // Extract the video ID
//     return `https://www.youtube.com/embed/${videoId}`;
//   };

//   const handleDownload = () => {
//     try {
//       console.log("Clicked...")
//     } catch (error) {}
//   };

//   return (
//     <div>
//       <div className="w-[90%] md:w-5/6 mx-auto my-10 aspect-video">
//         <iframe
//           className="w-full h-full rounded-lg shadow-lg"
//           src={embedYouTubeUrl(movie.trailerUrl)}
//           title="Trailer"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           referrerPolicy="strict-origin-when-cross-origin"
//           allowFullScreen
//         ></iframe>
//       </div>

//       <section className="w-[90%] md:w-5/6 mx-auto my-10 ">
//         <div className="space-y-4">
//           <p className="md:text-2xl text-xl font-bold">Synopsis</p>
//           <p className="text-gray-600">
//             {movie.description || "No synopsis available."}
//           </p>
//         </div>

//         <div className="space-y-4 my-10">
//           <p className="md:text-2xl text-xl font-bold">
//             Download link for {movie.title}
//           </p>
//           <button
//             className="md:w-[40%] w-full py-5 bg-green-600 text-white flex justify-center items-center gap-2 rounded-2xl border-none"
//             onClick={handleDownload}
//           >
//             <FaFileDownload /> Download
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SingleMovie;


"use client";

import { FaFileDownload } from "react-icons/fa";
import { usePostData } from "@/hooks/usePostData";
import { useState } from "react";

const SingleMovie = ({ id }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const url = `https://b2xclusive.onrender.com/api/v1/track/movie/${id}`;
  
  // Fetch movie data
  const { isLoading, isError, data } = usePostData("single movie", url);

  const embedYouTubeUrl = (url) => {
    if (!url) return "";
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
  
      // Construct the download URL with the specified format
      const downloadUrl = `https://b2xclusive.onrender.com/api/v1/track/download?type=episode&key=${movie.episode[0].key}&id=${movie.episode[0].id}`;
      
      // Create a hidden anchor element to trigger the download
      const link = document.createElement('a');
      link.href = downloadUrl;
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isError) {
    return (
      <div className="w-[90%] md:w-5/6 mx-auto my-10">
        <p className="text-red-500 font-bold">Error Fetching Movie Details</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-[90%] md:w-5/6 mx-auto my-10">
        <div className="h-80 w-full bg-gray-300 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  const movie = data?.data?.data?.movie;

  if (!movie) {
    return (
      <div className="w-[90%] md:w-5/6 mx-auto my-10">
        <p className="text-gray-500 font-bold">No Movie Found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-[90%] md:w-5/6 mx-auto my-10 aspect-video">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src={embedYouTubeUrl(movie.trailerUrl)}
          title={`${movie.title} Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <section className="w-[90%] md:w-5/6 mx-auto my-10">
        <div className="space-y-4">
          <h2 className="md:text-2xl text-xl font-bold">Synopsis</h2>
          <p className="text-gray-600">
            {movie.description || "No synopsis available."}
          </p>
        </div>

        <div className="space-y-4 my-10">
          <h2 className="md:text-2xl text-xl font-bold">
            Download link for {movie.title}
          </h2>
          <button
            className={`md:w-[40%] w-full py-5 ${
              isDownloading ? 'bg-green-400' : 'bg-green-600'
            } text-white flex justify-center items-center gap-2 rounded-2xl border-none transition-colors`}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <FaFileDownload />
            {isDownloading ? 'Initiating Download...' : 'Download'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default SingleMovie;
