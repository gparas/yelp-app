const options = {
  headers: {
    Authorization:
      'Bearer WCFP1SlL3XCcoqv4-s8YqGaspg0ZDLf1vihiqYrTrtctedn3_B4kZs8OAPQR-HFnd652kco9RaWuyUiy0DqN0b7dvWNsy1NDEeLxAI7XS8FtBtgWwmo0bSa-A1PdXHYx',
  },
  params: {
    term: 'arts',
  },
};

async function fetchData(endpoint) {
  const res = await fetch(endpoint, options);

  if (!res.ok) {
    throw new Error(res.status);
  }

  const data = await res.json();
  return data;
}

export default fetchData;
