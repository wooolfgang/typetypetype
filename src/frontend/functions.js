function fetchSubreddit(url) {
  fetch('https://www.reddit.com/r/' + url + '.json')
    .then(res => {
      return res.json();
    })
    .then((data) => {
      let links = '';
      return data;
    })
}

async function getUser(token) {
  const payload = await client.passport.verifyJWT(token.accessToken);
  const user = await client.service('api/users').get(payload.userId);
  return user;
}

async function getToken(username, password) {
  const token = await client.authenticate({
    username: username,
    password: password,
    strategy: 'local'
  });
  return token;
}

export { fetchSubreddit, getUser, getToken };