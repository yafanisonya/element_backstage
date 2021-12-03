import request from "@/utils/request";

export const createOrUpdateMenu = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/menu/saveOrUpdate",
    data,
  });
};

export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    method: "GET",
    url: "boss/menu/getEditMenuInfo",
    params: {
      id,
    },
  });
};
