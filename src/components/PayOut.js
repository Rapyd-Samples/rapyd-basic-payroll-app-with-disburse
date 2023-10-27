import React, { useState } from 'react';

const PayOut = ({ employee }) => {

    const style = {
        backgroundColor: '#007BFF',
        color: '#FFFFFF',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
      }

    const [payoutText, setPayoutText] = useState("Payout");

    // Function to confirm FX and complte payout
    const CompletePayout = async (resData) => { 
    
      try {

          fetch('/api/complete-payout', {
          method: 'POST',
          body: JSON.stringify({
              payoutID: resData.id,
              amount: resData.sender_amount,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
          })
          .then((response) => response.json())
          .then((resJson) => {

            var resData = resJson.data.body

            console.log("complete-payout", resData)

            setPayoutText("Paid")

          });

      } catch (error) {
          console.error("Error in API route");
      }

    };


    // Function to confirm FX and complte payout
    const condirmFXandCompletePayout = async (resData) => { 
        
      try {

          fetch('/api/confirm-payout', {
          method: 'POST',
          body: JSON.stringify({
              payoutID: resData.id,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
          })
          .then((response) => response.json())
          .then((resJson) => {

            var confirmResData = resJson.data.body.data

            CompletePayout(confirmResData)

            console.log("confirmed-fx", confirmResData)

          });

      } catch (error) {
          console.error("Error in API route");
      }

    };


    const handleClick = () => {
        setPayoutText("Paying...")

        try {

            fetch('/api/request-payout', {
            method: 'POST',
            body: JSON.stringify({
              country: employee.countryCode,
              bank: employee.bankName,
              amount: employee.salaryAmount,
              first_name: employee.firstName,
              last_name: employee.lastName,
              account_number: employee.bankAccountNumber,
              identification_type: employee.idCardType,
              identification_value: employee.idCardNumber,
              phone_number: employee.phoneNumber,

            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
            })
            .then((response) => response.json())
            .then((resJson) => {
    
              var resData = resJson.data.body.data

              switch (resData.status) {
                case "Confirmation":
                  condirmFXandCompletePayout(resData)
                  break;
                case "Created":
                  CompletePayout(resData)
                  break;
                case "Hold":
                  setPayoutText("Hold")
                  break;
                case "Expired":
                  setPayoutText("Expired")
                  break;
                case "Pending":
                  setPayoutText("Pending")
                  break;
                case "Canceled":
                  setPayoutText("Canceled")
                  break;
                case "Completed":
                  setPayoutText("Paid")
                  break;
                case "Declined":
                  setPayoutText("Declined")
                  break;
                case "Error":
                  setPayoutText("Error")
                  break;
                default:
                  setPayoutText("Error")
                  break;
              }
    
              console.log("request-payout", resData)
    
            });
    
        } catch (error) {
            console.error("Error in API route");
        }

    };

  return (
    <div>
        <button style={style} onClick={handleClick}>{payoutText}</button>
    </div>
  );
};

export default PayOut;
