import { useState, useEffect } from "react";

const KEY = "f84fc31d";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // callback?.();

      const controller = new AbortController();

      async function fetchMovies() {

        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
      // `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            // { signal: controller.signal }
            `https://raw.githubusercontent.com/Nmohd/data/main/movies.json`
          );

          if (!res.ok)
            throw new Error(
              "Something went wrong API calls may be reach to finale "
            );

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      // async function fetchMovies() {
      //   const options = {
      //     method: "GET",
      //     headers: {
      //       Type: "get-movies-by-title",
      //       "X-RapidAPI-Key":
      //         "b8e7adb569msh9707d57f483dd0ap1111b4jsn41475e29ec23",
      //       "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
      //     },
      //   };

      //   try {
      //     setIsLoading(true);
      //     setError("");

      //     const res = await fetch(
      //       `https://movies-tv-shows-database.p.rapidapi.com/?title=${query}`,
      //       options,
      //       { signal: controller.signal }
      //     );

      //     if (!res.ok)
      //       throw new Error(
      //         "Something went wrong API calls may be reach to finale "
      //       );

      //     const data = await res.json();
      //     console.log(data.movie_results);
      //     if (data.movie_results === "False") throw new Error("Movie not found");

      //     setMovies(data.movie_results);
      //     console.log(movies)
      //     setError("");
      //   } catch (err) {
      //     if (err.name !== "AbortError") {
      //       console.log(err.message);
      //       setError(err.message);
      //     }
      //   } finally {
      //     setIsLoading(false);
      //   }
      // }

      // if (query.length < 3) {
      //   setMovies([]);
      //   setError("");
      //   return;
      // }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
