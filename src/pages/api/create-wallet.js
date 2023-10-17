import { makeRequest } from '../../utilities/rapyd.js'; // Import Rapyd base functions

export default async function handler(req, res) { //Function to handle nextjs request

    const body = {
        first_name: 'James', //Your First Name
        last_name: 'Twallet', //Your Last Name
        ewallet_reference_id: 'jaytwallt-12345', //Your Preferred Ref ID
        metadata: {
          merchant_defined: true
        },
        type: 'company',
        contact: {
          phone_number: '+14155588799', //Your Phone Number
          email: 'jay@dayrep.com', //Your Email
          first_name: 'James', //Your First Name
          last_name: 'Twallet', // Your Last Name
          mothers_name: 'Tcash', // Your Mother's Name
          contact_type: 'business',
          address: { //Your Address
            name: 'Tcash',
            line_1: 'anyehaere',
            line_2: '',
            line_3: '',
            city: 'lost',
            state: 'NY',
            country: 'US',
            zip: '11223',
            phone_number: '+14155588799',
            metadata: { number: 2 },
            canton: '',
            district: ''
          },
          identification_type: "PA",
          identification_number: "1234567890", //Your Identification Number 
          date_of_birth: '11/12/1913', //Your Date of Birth
          country: 'US', // Your Country
          metadata: {
            merchant_defined: true
          },
          business_details: {
            entity_type: 'association',
            name: "Prof", //Your Company Name
            registration_number: "7788999000", //Your company registration number
            industry_category: 'company',
            industry_sub_category: "business", //Your business category
            address: { //Your Address
                name: 'Tcash',
                line_1: 'anyehaere',
                line_2: '',
                line_3: '',
                city: 'lost',
                state: 'NY',
                country: 'US',
                zip: '11223',
                metadata: {
                    merchant_defined: true
                }
            }
          }
        }
    };

 console.log(body)

  // Set the Rapyd API URL
  const url = '/v1/user';
  
  //Make the API request to Rapyd
  const response = await makeRequest('POST', url, body);
  
  // Return the request response
  res.status(200).json({ data: response })

}