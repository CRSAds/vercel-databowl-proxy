export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // Debug: Log ontvangen body
  console.log('Ontvangen body:', req.body);

  const formData = req.body;

  const response = await fetch("https://crsadvertising.databowl.com/api/v1/lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(formData).toString()
  });

  const result = await response.text();
  console.log("Databowl response:", result);

  res.status(200).send(result);
}

export const config = {
  api: {
    bodyParser: true,
  },
};
