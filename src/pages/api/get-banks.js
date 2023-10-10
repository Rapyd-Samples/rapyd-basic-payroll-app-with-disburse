import { makeRequest } from '../../utilities/rapyd.js'; // Import Rapyd base functions
import {CurrencyCodes} from '../../utilities/currencyCodes.js' // Import currency and country codes

export default async function handler(req, res) { //Function to handle nextjs request

  const country = req.body.country;
  var currency

  // Get the selected country currency code
  CurrencyCodes.forEach(curcode => {
    if (curcode.country_code == country) {
      currency = curcode.code;
    }
  });

  // Set the Rapyd API URL
  const url = '/v1/payouts/supported_types?category=bank&beneficiary_country='+country+'&payout_currency='+currency;
  
  //Make the API request to Rapyd
  const response = await makeRequest('get', url, {});
  
  // Return the request response
  res.status(200).json({ data: response })

}