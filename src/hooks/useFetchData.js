import { useQuery } from "react-query";

const useFetchData = (onSuccess, onError) => {
  useQuery("super-heroes", fetchSuperHeroes, {
    // catchTime: 5000,
    // staleTime: 10000,
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
    // refetchInterval: 2000,
    // refetchIntervalInBackground: true,
    // enabled: false,
    onSuccess,
    onError,
    // select: getHeroNames,
  });
};

export default useFetchData;
