export async function GET(request) {
  const api_key = process.env.API_KEY;
  const fullPath = decodeURIComponent(request.url);
  const query = fullPath.split('/api?url=')[1];
  const url = `http://ws.audioscrobbler.com/2.0/${query}&api_key=${api_key}&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ error: 'Error fetching data' }), {
      status: 500,
    });
  }
}
