export const carouselConfigs = [
  {
    title: "Top Rated Movies",
    itemBreakpoints: { base: 2, md: 3, lg: 4, xl: 5 },
    fetch: true,
    dataType: "topRatedMovies",
  },
  {
    title: "Popular Movies",
    itemBreakpoints: { base: 1, md: 2, lg: 3, xl: 4 },
    fetch: true,
    dataType: "popularMovies",
  },
  {
    title: "Upcoming Movies",
    itemBreakpoints: { base: 3, md: 3, lg: 4, xl: 5 },
    fetch: true,
    dataType: "upcomingMovies",
  },
  {
    title: "Top Rated TV",
    itemBreakpoints: { base: 2, md: 3, lg: 4, xl: 5 },
    fetch: true,
    dataType: "topRatedTV",
  },
  {
    title: "Popular TV",
    itemBreakpoints: { base: 1, md: 2, lg: 3, xl: 4 },
    fetch: true,
    dataType: "popularTV",
  },
  {
    title: "TV Airing Today",
    itemBreakpoints: { base: 2, md: 3, lg: 4, xl: 5 },
    fetch: true,
    dataType: "airingTodayTV",
  },
];
