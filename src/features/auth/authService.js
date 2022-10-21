import { client } from '../../utils/config';

const logout = () => {
  client.authStore.clear();
  window.location.reload();
};

const oAuthMethods = async () => {
  const authMethods = await client.users.listAuthMethods();
  const listItems = [];
  for (const provider of authMethods.authProviders) {
    listItems.push(provider);
  }
  return listItems;
};

const authService = {
  logout,
  oAuthMethods,
};

export default authService;
