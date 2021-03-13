import fetch from 'node-fetch';

export default async function () {
  const body = {
    refresh_token: 'da0d741104b31b2e019ba341c171e6f4e13d50bd',
    client_id: 'b4ab0309e1d9839',
    client_secret: '4d27eded33fc6ec6f48d2588ecd8abb8c0dce214',
    grant_type: 'refresh_token',
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(
    'https://api.imgur.com/oauth2/token',
    requestOptions,
  );
  const json = await response.json();
  return json.access_token;
}
