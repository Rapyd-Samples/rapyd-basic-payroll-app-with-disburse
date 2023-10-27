import { makeRequest } from '../../utilities/rapyd.js'; // Import Rapyd base functions

export default async function handler(req, res) { //Function to handle nextjs request

  // Set the Rapyd API URL
  const payoutID = req.body.payoutID;
  const amount = req.body.amount

  const url = '/v1/payouts/complete/'+payoutID+'/'+amount; 

  
  //Make the API request to Rapyd
  const response = await makeRequest('POST', url, {});
  
  // Return the request response
  res.status(200).json({ data: response })

}