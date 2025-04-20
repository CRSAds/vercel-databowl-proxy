export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const body = req.body;

  // Check of formulierdata aanwezig is
  const {
    firstname_sp,
    lastname_sp,
    email_sp,
    postcode_sp,
    address_sp,
    towncity_sp,
    phone_sp,
    sub1,
  } = body;

  // Bouw payload op
  const payload = new URLSearchParams({
    cid: '4786',
    sid: '34',
    optin_email: '1',
    optin_phone: '1',
    optin_sms: '0',
    f_3_firstname: firstname_sp || '',
    f_4_lastname: lastname_sp || '',
    f_1_email: email_sp || '',
    f_11_postcode: postcode_sp || '',
    f_6_address1: address_sp || '',
    f_9_towncity: towncity_sp || '',
    f_12_phone1: phone_sp || '',
    f_1684_sub_id: sub1 || '',
  });

  try {
    const response = await fetch('https://crsadvertising.databowl.com/api/v1/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    const result = await response.json();
    return res.status(response.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
