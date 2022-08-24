import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => axios("http://localhost:4000/superheroes");

export const RQSuperHeroesPage = () => {
  // Note: react query takes longer get error with wrong api url
  //       because it automatically retries if the request failed
  const { isLoading, data, isError, error } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      // catchTime: 5000,
      // staleTime: 10000,
      // refetchOnMount: true,
      // refetchOnWindowFocus: true,
      // refetchInterval: 2000,
      // refetchIntervalInBackground: true,
    }
  );

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {data?.data.map(hero => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </>
  );
};
