export default async function getData(url, path = '') {
  return await fetch(`${url}/${path}`, {
    method: path === 'create-account' ? 'POST' : 'GET',
    headers: {
      'Authorization': `Basic ${localStorage.getItem('token')}`,
    }
  })
    .then(res => res.json())
    .then(({ payload, error }) => {
      return payload ? Promise.resolve(payload) : Promise.reject(error);
    })
}
