import { useQuery } from "react-query";
import axios from "axios";
import { getBaseUrl } from "../base";

const searchQuery = async (query, type, publicId) => {
  const { data } = await axios.get(
    `${getBaseUrl()}/search/${query}/${type}/${publicId}`
  );
  return data;
};

export const useSearchQuery = (query, type, publicId, isEnabled) => {
  return useQuery(["searchQuery",query], () => searchQuery(query, type, publicId), {
    enabled: isEnabled
  });
};
