interface IRefreshTokenDTO {
  sub: string;
  email: string;
  enterprise_id: string | null;
  gov_access_token: string;
  gov_token_type: string;
  gov_id_token: string;
}

export { IRefreshTokenDTO };
