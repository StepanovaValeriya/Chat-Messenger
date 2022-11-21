export const userDataArray = (user: UserType) => {
  return Object.entries(user)
    .map(([title, data]) => {
      if (title !== "id" && title !== "avatar") {
        const value = data || "";
        return { title, data: value };
      }

      return null;
    })
    .filter((item) => Boolean(item));
};
