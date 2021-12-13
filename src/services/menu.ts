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

export const getAllMenus = () => {
  return request({
    method: "GET",
    url: "/boss/menu/getAll",
  });
};

export const deleteMenu = (id: number) => {
  return request({
    method: "DELETE",
    url: `/boss/menu/${id}`,
  });
};

export const getMenuNodeList = () => {
  return request({
    method: "GET",
    url: "/boss/menu/getMenuNodeList",
  });
};

export const allocateRoleMenus = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/menu/allocateRoleMenus",
    data,
  });
};

export const getRoleMenus = (roleId: string | number) => {
  return request({
    method: "GET",
    url: "/boss/menu/getRoleMenus",
    params: {
      roleId,
    },
  });
};
