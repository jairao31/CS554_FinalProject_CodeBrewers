import { useQuery } from "react-query";
import axios from "axios";

const searchQuery = async (query, type, publicId) => {
  const { data } = await axios.get(
    `http://localhost:3001/search/${query}/${type}/${publicId}`
  );
  return data;
};

export const useSearchQuery = (query, type, publicId, isEnabled) => {
  return useQuery(["searchQuery",isEnabled], () => searchQuery(query, type, publicId), {
    enabled: isEnabled,
  });
};
