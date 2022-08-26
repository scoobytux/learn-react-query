import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHeroes = ({ queryKey }) => {
  return axios("http://localhost:4000/superheroes/" + queryKey[1]);
};

const DynamicParallelQueries = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map(id => ({
      queryKey: ["superheroes", id],
      queryFn: fetchSuperHeroes,
    }))
  );

  console.log(queryResults);

  return <div>DynamicParallelQueries.page</div>;
};

export default DynamicParallelQueries;
