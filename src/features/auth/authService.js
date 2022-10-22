import { client } from '../../utils/config';

const logout = () => {
  client.authStore.clear();
};

const oAuthMethods = async () => {
  const authMethods = await client.users.listAuthMethods();
  const listItems = [];
  for (const provider of authMethods.authProviders) {
    listItems.push(provider);
  }
  return listItems;
};

const oAuthLogin = async (provider) => {
  try {
    const res = await client.users.authViaOAuth2(
      provider.name,
      provider.code,
      provider.codeVerifier,
      provider.redirectUrl
    );

    return res;
  } catch (err) {
    return err;
  }
};

const authService = {
  logout,
  oAuthMethods,
  oAuthLogin,
};

export default authService;
