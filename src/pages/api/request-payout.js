import { makeRequest } from '../../utilities/rapyd.js'; // Import Rapyd base functions
import {CurrencyCodes} from '../../utilities/currencyCodes.js' // Import currency and country codes

export default async function handler(req, res) { //Function to handle nextjs request

    var payout_currency

    // Get the selected country currency code
    CurrencyCodes.forEach(curcode => {
      if (curcode.country_code == req.body.country) {
          payout_currency = curcode.code;
      }
    });


    const body = {
      "beneficiary": {
          "payment_type": "regular",
          "address": "1 Main Street", //beneficiary Address
          "city": "Anytown", //beneficiary City
          "country": req.body.country, //beneficiary Country Code
          "first_name": req.body.first_name,
          "last_name": req.body.last_name,
          "state": "NY", //beneficiary State
          "postcode": "10101", //beneficiary Postcode
          "aba": "573675777", //for US bank account
          "account_number": req.body.account_number, 
          "identification_type": req.body.identification_type,
          "identification_value": req.body.identification_value,
          "phone_number": req.body.phone_number,
      },
      "beneficiary_country": req.body.country,
      "beneficiary_entity_type": "individual",
      "description": "Salary payout - wallet to bank account", //Your Secription
      "payout_method_type": req.body.bank,
      "ewallet": "{{YOUR WALLET ID}}", //Your Wallet ID
      "metadata": {
          "merchant_defined": true
      },
      "payout_amount": req.body.amount,
      "payout_currency": payout_currency,
      "sender": {
          "first_name": "John", //Your first name
          "last_name": "Doe", // Yout last name
          "identification_type": "work_permit", //Your ID Type
          "identification_value": "asdasd123123", //Ypur ID number
          "phone_number": "19019019011", //Your phone number
          "occupation": "professional", //Your occupation
          "source_of_income": "business",
          "date_of_birth": "11/12/1913", //Your DOB
          "address": "1 Main Street", //Your Address
          "postcode": "12345", //Your Postcode
          "country": "US",
          "city": "Anytown",//Your City
          "state": "NY",//Your State
          "purpose_code": "investment_income",
          "beneficiary_relationship": "employee"
      },
      "sender_country": "US", //Your Country
      "sender_currency": "USD", //Your Currency
      "sender_entity_type": "individual"
  }

  // Set the Rapyd API URL
  const url = '/v1/payouts';
  
  //Make the API request to Rapyd
  const response = await makeRequest('POST', url, body);
  
  // Return the request response
  res.status(200).json({ data: response })

}