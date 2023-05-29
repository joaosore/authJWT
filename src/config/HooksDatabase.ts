const IsNotDeleted = () => {
  return { delete: false };
};

const IsDeleted = () => {
  return { delete: true };
};

const SoftDelete = () => {
  const date = Date.now();
  return { updated_at: date, deleted_at: date, delete: true };
};

const DateUpdate = () => {
  const updated_at = Date.now();
  return updated_at;
};

export { SoftDelete, IsNotDeleted, IsDeleted, DateUpdate };
