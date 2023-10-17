import React, { useState, useEffect } from 'react';

const style = {
    cursor: 'pointer', 
    color: '#2525aa',
}

const WalletDetails = () => {

    const [WalletID, setWalletID] = useState("");

    useEffect(() => {
        const WalletIDLSDAta = localStorage.getItem('WalletID') || "";
        setWalletID(WalletIDLSDAta);
    }, []);

    // Function to generate wallet ID
    const generateWalletId = async () => { 
        
        try {

            fetch('/api/create-wallet', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
            })
            .then((response) => response.json())
            .then((resJson) => {
    
              var resData = resJson.data.body.data.id

              setWalletID(resData);
              localStorage.setItem('WalletID', resData);
    
            });
    
          } catch (error) {
            console.error("Error in API route");
          }

    };

     // Fund Wallet with a fixed amount
     const fundWallet = async () => { 
        
      try {

          fetch('/api/fund-wallet', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
          })
          .then((response) => response.json())
          .then((resJson) => {
  
            alert("Fixed amount added successfully")
  
          });
  
        } catch (error) {
          console.error("Error in API route");
        }

  };

    return (
    <div>
       {WalletID == "" ? 
       <small onClick={generateWalletId} style={style}>Generate Wallet ID</small> : 
       <div>
        <small>{WalletID}</small>
          <br></br>
        <small onClick={fundWallet} style={style}>Fund Wallet</small>
       </div>
       
       }
    </div>
    );
};

export default WalletDetails;
