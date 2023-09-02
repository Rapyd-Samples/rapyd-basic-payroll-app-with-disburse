import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EmployeeSalaryForm = () => {
  const router = useRouter();

  const countryCodes = [
    { code: 'US', name: 'United States (US)' },
    { code: 'GB', name: 'United Kingdom (GB)' },
    { code: 'PH', name: 'Philippines (PH)' },
    { code: 'CA', name: 'Canada (CA)' },
    { code: 'AU', name: 'Australia (AU)' },
    { code: 'DE', name: 'Germany (DE)' },
    { code: 'FR', name: 'France (FR)' },
    { code: 'JP', name: 'Japan (JP)' },
    { code: 'BR', name: 'Brazil (BR)' },
  ];

  const CurrencyCodes = [
    { code: 'USD' },
    { code: 'GBP' },
    { code: 'PHP' },
    { code: 'CAD' },
    { code: 'AUD' },
    { code: 'EUR' },
    { code: 'JPY' },
    { code: 'BRL' },
  ];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    countryCode: '',
    company: '',
    role: '',
    employmentDate: '',
    idCardType: '',
    idCardNumber: '',
    bankName: '',
    bankAccountNumber: '',
    bankAccountCurrencyCode: '',
    salaryAmount: '',
    status: 'active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve existing employee data from localStorage
    const storedEmployeeData = JSON.parse(localStorage.getItem('employeeData')) || [];

    // Append the new employee data to the existing array
    const updatedEmployeeData = [...storedEmployeeData, formData];

    // Save the updated data back to localStorage
    localStorage.setItem('employeeData', JSON.stringify(updatedEmployeeData));

    // Clear the form after submission
    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      phoneNumber: '',
      countryCode: '',
      company: '',
      role: '',
      employmentDate: '',
      idCardType: '',
      idCardNumber: '',
      bankName: '',
      bankAccountNumber: '',
      bankAccountCurrencyCode: '',
      salaryAmount: '',
      status: 'active',
    });

    console.log('Form submitted:', formData);
    
    router.push('/list-employees');

    window.alert('Employee added successfully');
  };

  const formContainerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const inputStyle = {
    display: 'block',
    margin: '10px 0',
    padding: '5px',
    width: '100%',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    margin: '20px 0',
    cursor: 'pointer',
  };


  return (
    <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
        <label>
            First Name:
            <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={inputStyle}
            />
        </label>
        <label>
            Last Name:
            <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={inputStyle}
            />
        </label>
        <label>
            Full Address:
            <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
            />
        </label>
        <label>
            Email:
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            />
        </label>
        <label>
            Phone Number:
            <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={inputStyle}
            />
        </label>
        <label>
            Country Code:
            <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            style={inputStyle}
            >
            <option value="">Select Country Code</option>
            {countryCodes.map((country, index) => (
                <option key={index} value={country.code}>
                {country.name}
                </option>
            ))}
            </select>
        </label>
        <label>
            Currency Code:
            <select
            name="bankAccountCurrencyCode"
            value={formData.bankAccountCurrencyCode}
            onChange={handleChange}
            style={inputStyle}
            >
            <option value="">Select Currency Code</option>
            {CurrencyCodes.map((currency, index) => (
                <option key={index} value={currency.code}>
                {currency.code}
                </option>
            ))}
            </select>
        </label>
        <label>
            Company:
            <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            style={inputStyle}
            />
        </label>
        <label>
            Role:
            <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={inputStyle}
            />
        </label>
        <label>
            Employment Date:
            <input
            type="date"
            name="employmentDate"
            value={formData.employmentDate}
            onChange={handleChange}
            style={inputStyle}
            />
        </label>
        <label>
            Identification Card Type:
            <select
            name="idCardType"
            value={formData.idCardType}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select ID Type</option>
            <option value="National ID">National ID</option>
            <option value="Driver's License">Driver's License</option>
            <option value="International Passport">International Passport</option>
          </select>
        </label>
        <label>
            Identification Card Number:
            <input
            type="text"
            name="idCardNumber"
            value={formData.idCardNumber}
            onChange={handleChange}
            style={inputStyle}
            />
        </label>
        <label>
            Bank:
            <select
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Bank</option>
            {/* Get the list of available banks in the selected country from Rapyd */}
          </select>
        </label>
        <label>
            Bank Account Number:
            <input
            type="text"
            name="bankAccountNumber"
            value={formData.bankAccountNumber}
            onChange={handleChange}
            style={inputStyle}
            />
        </label>
        <label>
            Salary Amount:
            <input
            type="text"
            name="salaryAmount"
            value={formData.salaryAmount}
            onChange={handleChange}
            style={inputStyle}
            />
        </label>
        <button type="submit" style={buttonStyle}>Submit</button>
        </form>
    </div>
  );
};

export default EmployeeSalaryForm;
