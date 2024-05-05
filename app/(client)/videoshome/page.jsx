"use client";
import CategoriesHeading from "@/components/CategoriesHeading";
import RecentPost from "@/components/RecentPost";
import SectionHeader from "@/components/SectionHeader";
import TopMusic from "@/components/TopMusic";
import TopPlaylist from "@/components/TopPlaylist";
import Videos from "@/components/Videos";
import { useContext, useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSearch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import axios from "axios";

function VideosHome() {
  const [allVideo, setAllVideo] = useState([]);
  const [allPost, setAllPost] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://b2xclusive.onrender.com/api/v1/track/videos?page=${currentPage}`,
      );
      setAllVideo(response?.data?.data);
      console.log(allVideo);

      const postresponse = await axios.get(
        "https://b2xclusive.onrender.com/api/v1/post/posts",
      );
      setAllPost(postresponse?.data?.data);
      console.log(allPost);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error(error?.response?.data?.message || "Failed to video post", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allVideo.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total number of pages
  const totalPages = Math.ceil(allVideo.length / postsPerPage);

  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <SectionHeader title={"All videos"} desc={"some"} />

      <section className="w-full md:w-5/6 mx-auto py-4">
        <div className="p-6">
          <h1 className={` text-4xl font-bold`}>
            Find the most recent video release
          </h1>
          <p className={``}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum,
            consequatur.
          </p>
        </div>
      </section>

      <section className="w-full md:w-5/6 mx-auto p-4">
        <div className="flex gap-4 w-full">
          <div className=" md:w-4/6 rounded-full flex items-center z-10 border">
            <input
              type="text"
              placeholder="Search here"
              className={`  w-11/12 bg-transparent p-4 text-white outline-none `}
            />
            <button className="rounded-full bg-primarycolor flex items-center md:text-base text-[12px] py-2 gap-1 px-4 mr-2">
              <FaSearch /> Search
            </button>
          </div>

          <div className="w-2/6 p-4 bg-transparent outline-none border rounded-lg">
            <select
              name=""
              id=""
              className="w-full bg-transparent outline-none"
            >
              <option value="">Filter</option>
              <option value="">Realesed Date</option>
              <option value="">Artist</option>
            </select>
          </div>
        </div>
      </section>

      <section className=" md:w-5/6 p-4 md:p-8 mx-auto md:flex md:gap-8">
        <div className=" w-full md:w-3/6">
          <div className="w-full p-4 md:w-full flex flex-col gap-8">
            {currentPosts?.map((video) => (
              <Videos key={video.id} {...video} />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            {/* Previous button */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2"
            >
              Previous
            </button>
            {/* Page number buttons */}
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`border border-gray-500 text-primarycolor px-4 py-2 rounded-md mx-1 ${
                  currentPage === number ? "bg-black" : ""
                }`}
              >
                {number}
              </button>
            ))}
            {/* Next button */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-primarycolor text-white px-4 py-2 rounded-md ml-2"
            >
              Next
            </button>{" "}
          </div>
        </div>

        <div className=" p-4 md:w-2/5">
          {/* TOP ARTIST SECTION */}
          <CategoriesHeading title={"Top 10 Artist"} />

          <div className="grid grid-cols-2 py-4 md:flex flex-col gap-2">
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
          </div>

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

          {/* TOP PLAYLIST SECTION */}
          <CategoriesHeading title={"Top Playlist"} />

          <div className="grid grid-cols-2 py-4 md:flex flex-col gap-2">
            <TopPlaylist />
            <TopPlaylist />
            <TopPlaylist />
            <TopPlaylist />
          </div>

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

          {/* GET CONNECTED */}
          <CategoriesHeading title={"Get Connected"} />

          <div className="flex justify-between p-4">
            <FaFacebook className={`text-3xl `} />
            <FaTwitter className={`text-3xl `} />
            <FaLinkedin className={`text-3xl `} />
            <FaYoutube className={`text-3xl `} />
            <FaInstagram className={`text-3xl `} />
            <FaPinterest className={`text-3xl `} />
          </div>

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

          {/* Recent post section */}
          <CategoriesHeading title={"Recent Posts"} />

          <div className=" flex flex-col gap-1 pt-4 ">
            {allPost &&
              allPost
                ?.slice(0, 3)
                .map((post) => <RecentPost key={post.id} {...post} />)}
          </div>
        </div>
      </section>
    </>
  );
}
export default VideosHome;
