// "use client";

// import { usePostData } from "@/hooks/usePostData";
// import Link from "next/link";
// import { useEffect } from "react";

// export const SingleSeasonsPage = ({ id }) => {
//   const url = `https://b2xclusive.onrender.com/api/v1/track/season/${id}`;

//   const { isLoading, isError, data } = usePostData("season", url);

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

//   // Extract season data
//   const season = data?.data?.data;
//   const episodes = season?.episodes || [];

//   if (!season || episodes.length === 0) {
//     return (
//       <div>
//         <p className="text-gray-500 font-bold">No Episodes Found</p>
//       </div>
//     );
//   }

//   const trailerPosterUrl =
//     episodes[0]?.posterUrl?.url || "/default-placeholder.png";

//   return (
//     <div>
//       {/* Trailer Poster */}
//       <div className="w-[90%] md:w-5/6 mx-auto my-10">
//         <img
//           src={trailerPosterUrl}
//           alt={season.movie?.title || "Season Poster"}
//           className="w-full rounded-lg shadow-lg object-cover"
//         />
//       </div>

//       {/* Synopsis Section */}
//       <section className="w-[90%] md:w-5/6 mx-auto my-10">
//         <div className="space-y-4">
//           <p className="md:text-2xl text-xl font-bold">Synopsis</p>
//           <p className="text-gray-600">
//             {season.movie?.description || "No synopsis available."}
//           </p>
//         </div>
//       </section>

//       {/* Episodes Section */}
//       <section className="w-[90%] md:w-5/6 mx-auto my-10">
//         <h2 className="my-5 font-bold md:text-2xl text-xl">Episodes:</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {episodes.map((episode) => (
//             <Link href={`/season-menu/${season.id}/${episode.id}`}>
//               <div className="cursor-pointer shadow-lg hover:shadow-xl transition rounded-lg overflow-hidden">
//                 <img
//                   src={episode.posterUrl?.url || "/default-placeholder.png"}
//                   alt={episode.episodeTitle || "Episode Image"}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4 bg-white">
//                   <h3 className="text-lg font-bold">
//                     {episode.episodeTitle || "Untitled Episode"}
//                   </h3>
//                   <p className="text-gray-500 text-sm">
//                     {episode.description || "No description available."}
//                   </p>
//                   <p className="text-gray-400 text-xs">
//                     Duration: {episode.duration || "Unknown"}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

"use client";

import { usePostData } from "@/hooks/usePostData";
import Link from "next/link";
import { useState } from "react";
import { FaFileDownload } from "react-icons/fa";

export const SingleSeasonsPage = ({ id }) => {
  const [downloadingEpisodeId, setDownloadingEpisodeId] = useState(null);
  const baseUrl = "https://b2xclusive.onrender.com/api/v1";
  const url = `${baseUrl}/track/season/${id}`;

  const { isLoading, isError, data } = usePostData("season", url);

  const handleDownload = async (episodeId, key) => {
    try {
      console.log("Clicked....")
      setDownloadingEpisodeId(episodeId);
      
      // Construct the download URL with the specified format
 
      const downloadUrl = `${baseUrl}/track/download?type=episode&key=${key}&id=${episodeId}`;
      
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
      setDownloadingEpisodeId(null);
    }
  };

  if (isError) {
    return (
      <div className="w-[90%] md:w-5/6 mx-auto my-10">
        <p className="text-red-500 font-bold">Error Fetching Season Details</p>
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

  // Extract season data
  const season = data?.data?.data;
  const episodes = season?.episodes || [];

  if (!season || episodes.length === 0) {
    return (
      <div className="w-[90%] md:w-5/6 mx-auto my-10">
        <p className="text-gray-500 font-bold">No Episodes Found</p>
      </div>
    );
  }

  const trailerPosterUrl = 
    episodes[0]?.posterUrl?.url || "/default-placeholder.png";

  return (
    <div>
      {/* Trailer Poster */}
      <div className="w-[90%] md:w-5/6 mx-auto my-10">
        <img
          src={trailerPosterUrl}
          alt={season.movie?.title || "Season Poster"}
          className="w-full rounded-lg shadow-lg object-cover max-h-[600px]"
        />
      </div>

      {/* Synopsis Section */}
      <section className="w-[90%] md:w-5/6 mx-auto my-10">
        <div className="space-y-4">
          <h1 className="md:text-2xl text-xl font-bold">
            {season.movie?.title} - Season {season.seasonNumber || "Unknown"}
          </h1>
          <h2 className="md:text-xl text-lg font-bold">Synopsis</h2>
          <p className="text-gray-600">
            {season.movie?.description || "No synopsis available."}
          </p>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="w-[90%] md:w-5/6 mx-auto my-10">
        <h2 className="my-5 font-bold md:text-2xl text-xl">Episodes:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <div 
              key={episode.id}
              className="shadow-lg hover:shadow-xl transition rounded-lg overflow-hidden bg-white"
            >
              <Link href={`/season-menu/${season.id}/${episode.id}`}>
                <img
                  src={episode.posterUrl?.url || "/default-placeholder.png"}
                  alt={episode.episodeTitle || "Episode Image"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">
                    {episode.episodeTitle || "Untitled Episode"}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {episode.description || "No description available."}
                  </p>
                  <p className="text-gray-400 text-xs mb-3">
                    Duration: {episode.duration || "Unknown"}
                  </p>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button
                  className={`w-full py-2 ${
                    downloadingEpisodeId === episode.id 
                      ? 'bg-green-400' 
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white flex justify-center items-center gap-2 rounded-lg transition-colors`}
                  onClick={() => handleDownload(episode.id, episode.key)}
                  disabled={downloadingEpisodeId === episode.id}
                >
                  <FaFileDownload />
                  {downloadingEpisodeId === episode.id 
                    ? 'Initiating Download...' 
                    : 'Download Episode'
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};