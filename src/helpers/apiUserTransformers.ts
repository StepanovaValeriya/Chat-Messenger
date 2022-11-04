import { UserDTO } from "api/types";

export const apiUserTransformers = (data: UserDTO): UserType => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name || "",
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};
