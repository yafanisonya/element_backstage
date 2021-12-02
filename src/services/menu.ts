import request from "@/utils/request";

export const createOrUpdateMenu = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/menu/saveOrUpdate",
    data,
  });
};
