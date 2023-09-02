import React from 'react';
import '../app/globals.css'
import Header from '../components/Header';
import EmployeeForm from '../components/EmployeeForm';

const AddEmployee = () => {

  const containerStyle = {
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <Header />
      <h2>Add Employee</h2>
      <EmployeeForm />
    </div>
  );
};

export default AddEmployee;
