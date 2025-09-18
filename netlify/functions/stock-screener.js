exports.handler = async (event, context) => {
  const EODHD_API_KEY = process.env.EODHD_API_KEY;
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    const { sector, limit = 10 } = event.queryStringParameters || {};
    
    if (!sector) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Sector parameter required' })
      };
    }

    console.log(`Screening for ${sector} stocks`);

    // EODHD Screener API call
    const filters = JSON.stringify([["sector", "=", sector]]);
    const url = `https://eodhd.com/api/screener?api_token=${EODHD_API_KEY}&filters=${encodeURIComponent(filters)}&limit=${limit}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
    
  } catch (error) {
    console.error('EODHD Screener error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to screen stocks' })
    };
  }
};
