export default async function handler(req, res) {
  // CORS headers toestaan
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Preflight OK
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const body = req.body;

  const params = new URLSearchParams();
  params.append("cid", "4786");
  params.append("sid", "34");
  params.append("optin_email", "1");
  params.append("optin_sms", "0");
  params.append("optin_phone", "1");

  params.append("first_name", body.first_name || "");
  params.append("last_name", body.last_name || "");
  params.append("email", body.email || "");
  params.append("phone", body.phone || "");
  params.append("postcode", body.postcode || "");
  params.append("address1", body.address1 || "");
  params.append("town", body.town || "");
  params.append("f_1684_sub_id", body.sub_id || "");
  params.append("f_1685_aff_id", body.aff_id || "");
  params.append("f_1322_transaction_id", body.transaction_id || "");

  try {
    const response = await fetch("https://crsadvertising.databowl.com/api/v1/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    const result = await response.text();
    console.log("✅ Databowl response:", result);

    res.status(200).json({ success: true, from_databowl: result });
  } catch (error) {
    console.error("❌ Fout bij proxy naar Databowl:", error);
    res.status(500).json({ error: "Proxy fout", detail: error.message });
  }
}
