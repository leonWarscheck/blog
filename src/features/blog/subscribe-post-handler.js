import axios from 'axios';

export default async function postHandler(req, res) {
  if (req.method === 'POST') {
    try {
      const API_KEY = process.env.MAILCHIMP_API_KEY;
      const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
      const DATACENTER = process.env.MAILCHIMP_API_SERVER;
      const mailchimpEndpoint = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

      const email = req.body.email;

      const response = await axios.post(
        mailchimpEndpoint,
        {
          email_address: email,
          status: 'subscribed',
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
          },
        },
      );

      console.log('mailchimp api response:', response.data);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
