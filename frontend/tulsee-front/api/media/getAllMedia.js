import { useQuery } from "react-query";
import axios from "axios";

const getMedia = async (projectId) => {
  const { data } = await axios.get(
    `http://localhost:3001/media/project/${projectId}`
  );
  return data;
};

export const useGetAllMedia = (projectId, isEnabled) => {
  return useQuery("getAllMedia", () => getMedia(projectId), {
    enabled: isEnabled,
  });
};
