import { makeRequest } from '../../utilities/rapyd.js'; // Import Rapyd base functions

export default async function handler(req, res) { //Function to handle nextjs request

  const data = {
    "amount": 500000, //fixed amount of 500,000
    "currency": "USD",
    "ewallet": "{{YOUR WALLET ID}}", //{{YOUR WALLET ID}}
    "metadata": {
        "merchant_defined": true
    }
  }

  const url = '/v1/account/deposit'

  const response = await makeRequest('POST', url, data);
  
  // Return the request response
  res.status(200).json({ data: response })

}