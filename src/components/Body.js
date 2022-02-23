import React, { useEffect, useRef, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { fetchData, getURL } from "../utils";
import { carouselConfigs } from "../data";
import Carousel from "./Carousel/Carousel";

function Body() {
  const [movieGenres, setMovieGenres] = useState({ data: [] });
  const [topRatedMovies, setTopRatedMovies] = useState({
    data: [],
    currentPage: 1,
  });
  const [popularMovies, setPopular] = useState({ data: [], currentPage: 1 });
  const [upcomingMovies, setUpcoming] = useState({ data: [], currentPage: 1 });
  const [topRatedTV, setTopRatedTV] = useState({ data: [], currentPage: 1 });
  const [popularTV, setPopularTV] = useState({ data: [], currentPage: 1 });
  const [airingTodayTV, setAiringTodayTV] = useState({
    data: [],
    currentPage: 1,
  });

  function getStateFromName(name) {
    switch (name) {
      case "movieGenres":
        return { setAction: setMovieGenres, data: movieGenres };
      case "topRatedMovies":
        return { setAction: setTopRatedMovies, data: topRatedMovies };
      case "popularMovies":
        return { setAction: setPopular, data: popularMovies };
      case "upcomingMovies":
        return { setAction: setUpcoming, data: upcomingMovies };
      case "topRatedTV":
        return { setAction: setTopRatedTV, data: topRatedTV };
      case "popularTV":
        return { setAction: setPopularTV, data: popularTV };
      case "airingTodayTV":
        return { setAction: setAiringTodayTV, data: airingTodayTV };
      default:
    }
  }

  function setState(dataType, newData, currentData, replace = false) {
    const { setAction } = getStateFromName(dataType);

    setAction({
      ...currentData,
      currentPage: ++currentData.currentPage,
      data: replace ? newData : [...currentData.data, ...newData],
    });
  }

  function execFetch(dataType) {
    const { data: currentData } = getStateFromName(dataType);
    const url = getURL(dataType, currentData.currentPage);
    const addToState = (newData) => setState(dataType, newData, currentData);
    const fetchStatus = fetchData(dataType, url, addToState);
    return { ...fetchStatus };
  }

  const contentCarousels = carouselConfigs.map((carousel) => {
    return (
      <div key={`carousel-${carousel.dataType}`} className="mb-2">
        <div className="flex justify-between mx-4">
          <span className="font-semibold uppercase">{carousel.title}</span>
          <span className="uppercase cursor-pointer">
            <div className="flex items-center">
              <span className="pr-2 text-[#909296]">View All</span>
              <MdOutlineArrowForwardIos className="w-4 h-4" />
            </div>
          </span>
        </div>
        <div className="w-full">
          <Carousel
            carouselItems={getStateFromName(carousel.dataType).data.data}
            itemBreakpoints={carousel.itemBreakpoints}
            isFullSize={carousel.isFullSize}
            fetch={carousel.fetch}
            execFetch={execFetch}
            dataType={carousel.dataType}
          />
        </div>
      </div>
    );
  });

  const loadInitialData = useRef(execFetch);

  useEffect(() => {
    loadInitialData.current("movieGenres");
    loadInitialData.current("topRatedMovies");
    loadInitialData.current("popularMovies");
    loadInitialData.current("upcomingMovies");
    loadInitialData.current("topRatedTV");
    loadInitialData.current("popularTV");
    loadInitialData.current("airingTodayTV");
  }, []);

  return (
    <div className="m-3 text-white md:px-10 2xl:px-20">
      <div className="mb-2">
        <div className="mx-4">
          <span className="font-semibold uppercase">Movie Genres</span>
        </div>
        <div className="flex w-full">
          <Carousel
            carouselItems={movieGenres.data}
            itemBreakpoints={{ base: 2, md: 3, lg: 4, xl: 5 }}
          />
        </div>
      </div>
      {contentCarousels}
    </div>
  );
}

export default Body;
