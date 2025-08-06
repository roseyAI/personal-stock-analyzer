exports.handler = async (event, context) => {
  const { symbol } = event.queryStringParameters;
  const API_KEY = process.env.ALPHA_VANTAGE_API_KEY || '6Z5XAIQXW8DB8AO6';
  
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
    );
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
