import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const fetchSuperHeroDetails = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios("http://localhost:4000/superheroes/" + heroId);
};

const RQSuperHero = () => {
  const { heroId } = useParams();

  const getHeroDetails = data => {
    const hero = data.data;
    return (
      <div>
        <div>{hero.id}</div>
        <div>{hero.name}</div>
        <div>{hero.alterEgo}</div>
      </div>
    );
  };

  const { isLoading, error, isError, data, isFetching } = useQuery(
    ["hero-details", heroId],
    fetchSuperHeroDetails,
    {
      select: getHeroDetails,
    }
  );

  if (isLoading || isFetching) {
    return <h2>Loading ...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Super hero details</h2>
      {data}
    </>
  );
};

export default RQSuperHero;
