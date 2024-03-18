import AlbumCover from "@/components/AlbumCover";
import Event from "@/components/Event";
import TopMusic from "@/components/TopMusic";
import TopPlaylist from "@/components/TopPlaylist";
import Image from "next/image";
import Link from "next/link";
import {
  FaBackward,
  FaBook,
  FaForward,
  FaMicrophone,
  FaMusic,
} from "react-icons/fa";

export default function Home() {
  return (
    <main>
      <section className="herosection">
        <p>The B2EXCLUSIVE Blog</p>
        <h1 className="text-4xl font-extrabold text-center">
          Stories, Thoughts <br /> Ideas and More
        </h1>

        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, non
          optio. Ipsa culpa quibusdam necessitatibus!
        </p>

        <div className="flex gap-4">
          <Link
            className="py-1 px-4 rounded-full border border-white"
            href={"#"}
          >
            Continue
          </Link>
          <Link
            className="py-1 px-4 rounded-full border border-white"
            href={"#"}
          >
            Explore
          </Link>
        </div>
      </section>

      <section className="md:w-5/6 mx-auto md:flex gap-4 p-4">
        <div className="w-full h-48 relative">
          <Image
            src={"/talk.jpeg"}
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
            alt="music"
          />

          <div className="absolute top-6 left-6 flex flex-col">
            <h1 className="font-bold text-xl">The Top 50</h1>
            <p>Trending Discussions</p>
            <FaBook className="text-2xl" />
          </div>
        </div>
        <div className="w-full h-48 relative">
          <Image
            src={"/pod.jpeg"}
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
            alt="music"
          />

          <div className="absolute top-6 left-6 flex flex-col">
            <h1 className="font-bold text-xl">Trending Discussions</h1>
            <p>Latests Gists</p>
            <FaMicrophone className="text-2xl" />
          </div>
        </div>
        <div className="w-full relative bg-black">
          <Image
            src={"/music.jpeg"}
            className="w-full h-48 object-cover"
            width={1000}
            height={1000}
            alt="music"
          />

          <div className="absolute top-6 left-6 flex flex-col">
            <h1 className="font-bold text-xl">Trending Musics</h1>
            <p>Nigeria</p>
            <FaMusic className="text-2xl" />
          </div>
        </div>
      </section>

      <section className="w-full md:w-5/6 mx-auto md:flex p-4 gap-4">
        <div className="w-full md:w-3/4">
          {/* NEW ALBUM SECTION */}
          <div className="p-4 bg-gray-900 mt-4">
            <h1 className="font-bold">New Album Releases</h1>
          </div>

          <div className="py-4 flex gap-4">
            <AlbumCover />
            <AlbumCover />
            <AlbumCover />
          </div>

          <div className="flex items-end justify-between">
            <div className="w-3/4 h-[3px] bg-primarycolor"></div>
            <div className="flex gap-4">
              <FaBackward className="border w-12 h-12 p-2" />
              <FaForward className="border w-12 h-12 p-2" />
            </div>
          </div>

          {/* UPCOMING EVENTS SECTION*/}
          <div className="p-4 bg-gray-900 mt-4">
            <h1 className="font-bold">Upcoming Events</h1>
          </div>

          <div className="flex flex-col gap-4 my-4">
            <Event />
            <Event />
            <Event />
          </div>

          <div className="flex items-end justify-between">
            <div className="w-3/4 h-[3px] bg-primarycolor"></div>
            <div className="flex gap-4">
              <FaBackward className="border w-12 h-12 p-2" />
              <FaForward className="border w-12 h-12 p-2" />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/4">
          {/* TOP ARTIST SECTION */}
          <div className="p-4 bg-gray-900 my-4">
            <h1 className="font-bold">Top 10 Artists</h1>
          </div>

          <div className="flex flex-col gap-2">
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
          </div>
          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

          {/* TOP PLAYLIST SECTION */}
          <div className="p-4 bg-gray-900 my-4">
            <h1 className="font-bold">Top Playlists</h1>
          </div>

          <div className="flex flex-col gap-2">
            <TopPlaylist />
          </div>
        </div>
      </section>
    </main>
  );
}
