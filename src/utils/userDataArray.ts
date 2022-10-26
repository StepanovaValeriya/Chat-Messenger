export const userDataArray = (user: UserType) => {
  return Object.entries(user).map(([title, data]) => {
    if (title !== "id" && title !== "avatar") {
      return { title: title, data: data };
    }
  });
};
