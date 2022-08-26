import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = ({ queryKey }) => {
  return axios("http://localhost:4000/users/" + queryKey[1]);
};

const fetchCourseByChannelId = ({ queryKey }) => {
  return axios("http://localhost:4000/channels/" + queryKey[1]);
};

const DependentQueries = ({ email }) => {
  const { data: user } = useQuery(["user", email], fetchUserByEmail);
  const channelId = user?.data.channelId;

  const { data: course } = useQuery(
    ["course", channelId],
    fetchCourseByChannelId,
    {
      enable: !!channelId,
    }
  );

  console.log(channelId);

  return <div>Dependent.page</div>;
};

export default DependentQueries;
