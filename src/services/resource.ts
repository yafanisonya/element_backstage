import request from "@/utils/request";

export const getAllResources = () => {
  return request({
    method: "GET",
    url: "/boss/resource/getAll",
  });
};

export const getResourcePages = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/resource/getResourcePages",
    data,
  });
};
