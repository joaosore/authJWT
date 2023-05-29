interface IAuthTokenResponseDTO {
  token: string;
  refresh_token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    cpf: string;
    role_id: string;
  };
}

export { IAuthTokenResponseDTO };
