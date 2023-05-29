interface IProps {
  arr: any[];
  col: string;
}

const CreateListArray = async ({ arr, col }: IProps): Promise<string[]> => {
  const result: string[] = [];

  await Promise.all(
    arr.map(item => {
      if (result.indexOf(item[col]) === -1) result.push(item[col]);
    }),
  );

  return result;
};

export { CreateListArray };
