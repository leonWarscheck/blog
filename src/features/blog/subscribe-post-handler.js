import axios from 'axios';

// Gets exported via `subscribe-api.js` api route, which acts as an intermediary
// between subscribeform components and mailchimp.
export default async function postHandler(request, serverResponseObject) {
  // Handles `POST` requests from subscribeforms.
  if (request.method === 'POST') {
    try {
      const API_KEY = process.env.MAILCHIMP_API_KEY;
      const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
      const DATACENTER = process.env.MAILCHIMP_API_SERVER;
      const mailchimpEndpoint = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

      const email = request.body.email;

      // Sends full request incl. credentials to mailchimp and recieves
      // corresponding responses.
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

      // All following methods on serverResponseObject return responses to the
      // subscribeform-components at `const response = await
      // axios.post('/api/subscribe-api', { email });`.
      serverResponseObject.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      serverResponseObject
        .status(500)
        .json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    serverResponseObject
      .status(405)
      .json({ success: false, error: 'Method Not Allowed' });
  }
}
