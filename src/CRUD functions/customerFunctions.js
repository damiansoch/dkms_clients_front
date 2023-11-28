import { addAxiosFunction } from '../genericFunctions/axiosFunctions';
import { AddCustomerRequestDto } from './classes/customer';

export const addEditCustomer = async (customerData, action) => {
  const custommerAddRequest = new AddCustomerRequestDto();

  custommerAddRequest.FirstName = customerData.firstName;
  custommerAddRequest.LastName = customerData.lastName;
  custommerAddRequest.CompanyName = customerData.companyName;
  custommerAddRequest.PhoneNumber = customerData.phoneNumber;
  if (customerData.phoneNumber2 !== '') {
    custommerAddRequest.PhoneNumber2 = customerData.phoneNumber2;
  }
  custommerAddRequest.Email = customerData.email;
  if (customerData.email2 !== '') {
    custommerAddRequest.Email2 = customerData.email2;
  }
  if (customerData.extraDetails !== '') {
    custommerAddRequest.ExtraDetails = customerData.extraDetails;
  }

  let endpoint = '';
  if (action === 'addCustomer') {
    endpoint = `https://localhost:7280/api/Customer/create`;
  }

  var response = await addAxiosFunction(endpoint, custommerAddRequest);
  return response;
};
