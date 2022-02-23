import axios from "axios";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function fetchData(dataType, url, callBack) {
  const baseImgURL = "https://image.tmdb.org/t/p/w500/";
  const standardDataCallback = ({ data: { results } }) =>
    results.map((content) => ({
      image: `${baseImgURL}${content.poster_path || content.backdrop_path}`,
      title: content.original_title || content.name,
      overview: content.overview,
      releaseDate: content.releaseDate,
      language: content.original_language,
    }));

  function getCallbackFromDataType(dataType) {
    switch (dataType) {
      case "movieGenres":
        return ({ data }) =>
          data.genres.map((genre) => ({
            text: genre.name,
            height: "h-40",
          }));
      case "topRatedMovies":
      case "popularMovies":
      case "upcomingMovies":
      case "topRatedTV":
      case "popularTV":
      case "airingTodayTV":
        return standardDataCallback;
      default:
        return;
    }
  }

  const dataCallback = getCallbackFromDataType(dataType);

  axios
    .get(url)
    .then(dataCallback)
    .then(callBack)
    .then(() => ({ message: "success", statusCode: "200" }))
    .catch((err) => ({ message: err.message, statusCode: err.statusCode }));
}

function getURL(dataType, page = 1) {
  const baseURL = "https://api.themoviedb.org/3/";
  switch (dataType) {
    case "movieGenres":
      return `${baseURL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
    case "topRatedMovies":
      return `${baseURL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    case "popularMovies":
      return `${baseURL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    case "upcomingMovies":
      return `${baseURL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;
    case "topRatedTV":
      return `${baseURL}tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    case "popularTV":
      return `${baseURL}tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    case "airingTodayTV":
      return `${baseURL}tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`;
    default:
      return;
  }
}

function generateBreakpointWidths(breakpointConfig) {
  /* postcss: 
      w-1/2 w-1/3 w-1/4 w-1/5 w-1/6 w-1/7
      sm:w-1/2 sm:w-1/3 sm:w-1/4 sm:w-1/5 sm:w-1/6 sm:w-1/7
      md:w-1/2 md:w-1/3 md:w-1/4 md:w-1/5 md:w-1/6 md:w-1/7
      lg:w-1/2 lg:w-1/3 lg:w-1/4 lg:w-1/5 lg:w-1/6 lg:w-1/7
      xl:w-1/2 xl:w-1/3 xl:w-1/4 xl:w-1/5 xl:w-1/6 xl:w-1/7
  */
  return Object.keys(breakpointConfig)
    .filter(
      (breakpoint) =>
        ["base", "sm", "md", "lg", "xl"].indexOf(breakpoint) !== -1
    )
    .map((breakpoint) => {
      const itemsPerPage = breakpointConfig[breakpoint];
      let prefix = breakpoint === "base" ? "w-" : `${breakpoint}:w-`;
      let suffix = itemsPerPage === 1 ? "full" : "1/" + itemsPerPage;
      return prefix + suffix;
    })
    .join(" ");
}

export { fetchData, getURL, generateBreakpointWidths };
