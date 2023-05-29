const ContactVariables = async (arr: string[]): Promise<string> => {
  let data = '';

  await Promise.all(
    arr.map((item, key) => {
      if (!item.toString()) {
        return;
      }
      if (key !== 0) {
        data = data + '_';
      }
      data = data + item.toString();
    }),
  );

  return data;
};

export { ContactVariables };
