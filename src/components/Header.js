import React from 'react';

const headerStyle = {
  backgroundColor: '#cacaca', 
  color: '#171717',           
  padding: '20px 0',  
  textAlign: 'center',  
};

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>Payroll Application</h1>
    </header>
  );
};

export default Header;
