function removeDuplicatesArr(arr: string[]) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

export { removeDuplicatesArr };
