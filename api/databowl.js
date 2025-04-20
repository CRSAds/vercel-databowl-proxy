export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // eventueel alleen jouw domein hier
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ CORS preflight response
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const databowlURL = 'https://crsadvertising.databowl.com/api/v1/lead';

  try {
    const response = await fetch(databowlURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(req.body).toString()
    });

    const text = await response.text();

    res.status(200).json({
      result: 'created',
      response: text
    });
  } catch (err) {
    console.error('❌ Error sending to Databowl:', err);
    res.status(500).json({ error: 'Failed to forward to Databowl' });
  }
}
