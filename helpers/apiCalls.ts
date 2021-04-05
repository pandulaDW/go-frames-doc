import { request } from "graphql-request";

export const graphqlRequest = async <T>(query: string): Promise<T> => {
  const { GQL_BASE_URL, CMS_SPACE_ID, CMS_API_KEY } = process.env;
  const url = `https://${GQL_BASE_URL}/v1/spaces/${CMS_SPACE_ID}?access_token=${CMS_API_KEY}`;
  const response = await request<T>(url, query);
  return response;
};
