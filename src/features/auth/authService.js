import { client } from '../../utils/config';

const login = async ({ email, password }, isAdmin) => {
  if (isAdmin) {
    const user = client.admins.authViaEmail(email, password);
    client.authStore.exportToCookie(user);
    return user;
  } else {
    const user = client.users.authViaEmail(email, password);
    client.authStore.exportToCookie(user);
    return user;
  }
};

const register = async ({ email, password, passwordConfirm }) => {
  const user = await client.users.create({
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  });
  return user;
};

const logout = () => {
  client.authStore.clear();
  window.location.reload();
};

const oAuthMethods = async (callback) => {
  const authMethods = await client.users.listAuthMethods();
  const listItems = [];
  for (const provider of authMethods.authProviders) {
    listItems.push(provider);
  }
  callback(listItems);
  return listItems;
};

const authService = {
  login,
  register,
  logout,
  oAuthMethods,
};

export default authService;
