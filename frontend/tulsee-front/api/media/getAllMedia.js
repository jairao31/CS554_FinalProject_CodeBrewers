import { useQuery } from "react-query";
import axios from "axios";
import { getBaseUrl } from "../base";

const getMedia = async (projectId) => {
  const { data } = await axios.get(
    `${getBaseUrl()}/media/project/${projectId}`
  );
  return data;
};

export const useGetAllMedia = (projectId, isEnabled) => {
  return useQuery("getAllMedia", () => getMedia(projectId), {
    enabled: isEnabled,
  });
};
