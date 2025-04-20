export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const body = req.body;

  console.log("📦 Binnenkomende body:", body);

  const params = new URLSearchParams();

  // Vereiste IDs
  params.append("cid", "4786");
  params.append("sid", "34");

  // Opt-in waarden
  params.append("optin_email", "1");
  params.append("optin_sms", "0");
  params.append("optin_phone", "1");

  // Gegevens van formulier (form IDs moeten overeenkomen)
  params.append("f_3_firstname", body.first_name || "");
  params.append("f_4_lastname", body.last_name || "");
  params.append("f_1_email", body.email || "");
  params.append("f_12_phone1", body.phone || "");
  params.append("f_11_postcode", body.postcode || "");
  params.append("f_6_address1", body.address1 || "");
  params.append("f_9_towncity", body.town || "");

  // Sub-ID’s vanuit URL
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

    const data = await response.json();
    console.log("✅ Databowl response:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Fout bij verzenden naar Databowl:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
