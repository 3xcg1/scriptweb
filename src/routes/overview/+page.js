import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

export async function load({ fetch, url }) {
  const id = url.searchParams.get('id'); // Getting the file id from query parameter
  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/file/${id}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }
  });

  const res = await resp.json();
  if (resp.status === 200) {
    return {
      file: res
    }
  } else {
    return {
      file: []
    }
  }
}