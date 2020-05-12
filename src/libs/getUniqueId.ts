export const getUniqueId = (prefix: string) => {
  let index = 0;

  return () => {
    const id = `${prefix}-${index}`;
    index += 1;

    return id;
  };
};
