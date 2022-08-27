import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const fetchSuperHeroes = () => axios("http://localhost:4000/superheroes");
const addSuperHero = hero => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

const RQSuperHeroesPage = () => {
  const onSuccess = data => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = error => {
    console.log("Perform side effect after encountering error", error);
  };

  const getHeroNames = data => data.data.map(hero => hero.name);
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addSuperHero, {
    onSuccess: data => {
      queryClient.setQueryData("super-heroes", oldQueryData => {
        return { ...oldQueryData, data: [...oldQueryData.data, data.data] };
      });
    },
  });

  // Note: react query takes longer get error with wrong api url
  //       because it automatically retries if the request failed
  const { isLoading, data, isError, error, refetch, isFetching } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      // catchTime: 5000,
      // staleTime: 10000,
      // refetchOnMount: true,
      // refetchOnWindowFocus: true,
      // refetchInterval: 2000,
      // refetchIntervalInBackground: true,
      // enabled: false,
      // onSuccess,
      // onError,
      // select: getHeroNames,
    }
  );

  const handleAddHero = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    mutate(hero);
  };

  if (isLoading || isFetching) {
    return <h2>Loading ...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={e => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHero}>Add hero</button>
      </div>
      <button onClick={refetch}>Fetch heroes</button>
      {data?.data.map(hero => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
      {/* {data.map(heroName => (
        <div key={heroName}>{heroName}</div>
      ))} */}
    </>
  );
};

export default RQSuperHeroesPage;
