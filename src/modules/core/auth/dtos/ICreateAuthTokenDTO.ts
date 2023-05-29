interface ICreateAuthTokenDTO {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
  gov_access_token?: string;
  gov_token_type?: string;
  gov_id_token?: string;
}

export { ICreateAuthTokenDTO };
