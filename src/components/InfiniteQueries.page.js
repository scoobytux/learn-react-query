import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

const fetchColors = ({ queryKey: resourceName, pageParam: _page }) => {
  const params = { _limit: 2, _page };

  return axios(`http://localhost:4000/${resourceName}`, { params });
};

const InfiniteQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery("colors", fetchColors, {
    getNextPageParam: (_, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      {data?.pages.map((group, i) => (
        <>
          {group.data.map(color => (
            <h2 key={color.id}>
              {color.id} - {color.label}
            </h2>
          ))}
        </>
      ))}
      <button onClick={fetchNextPage} disabled={!hasNextPage}>
        Load more
      </button>
      {isFetching && !isFetchingNextPage ? "Fetching..." : null}
    </>
  );
};

export default InfiniteQueries;
