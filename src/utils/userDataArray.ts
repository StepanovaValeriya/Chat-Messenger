export const userDataArray = (user: UserType) => {
  // eslint-disable-next-line array-callback-return, consistent-return
  return Object.entries(user).map(([title, data]) => {
    if (title !== "id" && title !== "avatar") {
      return { title, data };
    }
  });
};
