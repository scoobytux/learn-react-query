import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = ({ queryKey }) => {
  const [resourceName, _page] = queryKey;
  const params = { _limit: 2, _page };
  return axios(`http://localhost:4000/${resourceName}`, { params });
};

const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["colors", pageNumber],
    fetchColors,
    {
      keepPreviousData: true,
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
      {data?.data.map(color => (
        <div key={color.id}>
          <h2>
            {color.id} - {color.label}
          </h2>
        </div>
      ))}
      <button
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        Prev
      </button>
      <button
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={pageNumber === 4}
      >
        Next
      </button>
      {isFetching && <p>loading ...</p>}
    </>
  );
};

export default PaginatedQueries;
