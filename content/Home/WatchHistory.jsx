"use client"
import { useEffect, useState } from "react";
import ContinueWatchingCard from "@/components/Cards/ContinueWatchingCard/ContinueWatchingCard";
import { FaArrowRight } from "react-icons/fa";

const WatchHistory = () => {
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    const animeData = JSON.parse(localStorage.getItem("watch_history") || "{}");

    // Using Object.keys to map over the object
    const data = Object.keys(animeData)
      .slice(0, 4)
      .sort((keyA, keyB) => {
        const dateA = new Date(animeData[keyA]?.updatedDate || 0);
        const dateB = new Date(animeData[keyB]?.updatedDate || 0);
        return dateB - dateA;
      })
      .map(key => {
        const item = animeData[key];
        return {
          id: key,
          animeid: item.animeid,
          episode: item.episode,
          thumbnail: item.thumbnail,
          title: item.title || '', // title might be undefined, so we provide a fallback
          videoURL: item.videoURL || '', // same for videoURL
          currentTime: item.currentTime || 0, // fallback for currentTime
          duration: item.duration || 0, // fallback for duration
          date: item.updatedDate || 0 // fallback for duration
        };
      });

    setMappedData(data);
  }, []);


  return mappedData.length < 1 ? null : (
    <div className="w-full max-w-[96rem] relative mx-5">
      <div className="flex justify-between">
        <h1 className="text-[#f6f4f4ea] font-medium text-2xl font-['poppins'] max-[450px]:text-[1.2rem]">| Continue Watching</h1>

        <div className="text-[#ffffffbd] flex items-center gap-1 cursor-pointer hover:text-slate-500 transition">See All <FaArrowRight /></div>
      </div>

      <div className="mt-8 mb-24 grid grid-cols-[repeat(auto-fit,minmax(343px,1fr))] max-[725px]:grid-cols-[repeat(auto-fit,minmax(285px,1fr))] gap-3">
        {mappedData.map(data => (
          <ContinueWatchingCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
}

export default WatchHistory;
