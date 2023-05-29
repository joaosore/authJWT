const ListEnterpriseByCpf = async (data: any) => {
  const enterprise: string[] = [];
  data.list.map((cnpj: any) => {
    enterprise.push(cnpj);
  });
  return enterprise;
};

export { ListEnterpriseByCpf };
