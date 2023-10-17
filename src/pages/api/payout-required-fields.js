import { makeRequest } from '../../utilities/rapyd.js'; // Import Rapyd base functions
import {CurrencyCodes} from '../../utilities/currencyCodes.js' // Import currency and country codes

export default async function handler(req, res) { //Function to handle nextjs request

  const country = req.body.country;
  const bank = req.body.bank;
  const sender_country = 'US';
  const sender_currency = 'USD';
  const sender_entity_type = 'company';
  const beneficiary_entity_type = 'individual';
  const payout_amount = req.body.amount;

  var currency

  // Get the selected country currency code
  CurrencyCodes.forEach(curcode => {
    if (curcode.country_code == country) {
      currency = curcode.code;
    }
  });

  // Set the Rapyd API URL
  const url = '/v1/payouts/'+bank+'/details?sender_country='+sender_country+'&sender_currency='+sender_currency+'&beneficiary_country='+country+'&payout_currency='+currency+'&sender_entity_type='+sender_entity_type+'&beneficiary_entity_type='+beneficiary_entity_type+'&payout_amount='+payout_amount;
  
  //Make the API request to Rapyd
  const response = await makeRequest('get', url, {});
  
  // Return the request response
  res.status(200).json({ data: response })

}