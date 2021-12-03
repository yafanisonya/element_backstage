import request from "@/utils/request";

export const getAllResources = () => {
  return request({
    method: "GET",
    url: "/boss/resource/getAll",
  });
};
