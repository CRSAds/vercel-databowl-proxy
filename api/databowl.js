export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Access-Control-Allow-Origin", "*");

  const {
    firstname_sp,
    lastname_sp,
    email_sp,
    zip,
    address,
    city,
    phone_sp,
    sub1,
  } = req.body;

  const payload = new URLSearchParams({
    cid: "4786",
    sid: "34",
    optin_email: "1",
    optin_phone: "1",
    optin_sms: "0",
    f_3_firstname: firstname_sp || "",
    f_4_lastname: lastname_sp || "",
    f_1_email: email_sp || "",
    f_11_postcode: zip || "",
    f_6_address1: address || "",
    f_9_towncity: city || "",
    f_12_phone1: phone_sp || "",
    f_1684_sub_id: sub1 || "",
  });

  try {
    const response = await fetch("https://crsadvertising.databowl.com/api/v1/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    const result = await response.json();
    console.log("✅ Databowl response:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Fout bij verzenden naar Databowl:", error);
    res.status(500).json({ error: "Er is iets misgegaan" });
  }
}
