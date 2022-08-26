import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios("http://localhost:4000/friends");
};

const ParallelQueries = () => {
  const { data: superHeroes } = useQuery("superheroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friends", fetchFriends);

  return <div>ParallelQueries.page</div>;
};

export default ParallelQueries;
