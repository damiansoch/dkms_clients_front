import {
  addAxiosFunction,
  updateAxiosFunction,
} from '../genericFunctions/axiosFunctions';
import {
  AddCustomerRequestDto,
  EditCustomerRequestDto,
} from './classes/customer';

export const addEditCustomer = async (customerData, action) => {
  let endpoint = '';
  const customerAddRequest = new AddCustomerRequestDto();
  const customerEditRequest = new EditCustomerRequestDto();
  var response = {};

  if (action === 'addCustomer') {
    customerAddRequest.FirstName = customerData.firstName;
    customerAddRequest.LastName = customerData.lastName;
    customerAddRequest.CompanyName = customerData.companyName;
    customerAddRequest.PhoneNumber = customerData.phoneNumber;
    if (customerData.phoneNumber2 !== '') {
      customerAddRequest.PhoneNumber2 = customerData.phoneNumber2;
    }
    customerAddRequest.Email = customerData.email;
    if (customerData.email2 !== '') {
      customerAddRequest.Email2 = customerData.email2;
    }
    if (customerData.extraDetails !== '') {
      customerAddRequest.ExtraDetails = customerData.extraDetails;
    }
    endpoint = `https://localhost:7280/api/Customer/create`;
    response = await addAxiosFunction(endpoint, customerAddRequest);
  }
  if (action === 'editCustomer') {
    customerEditRequest.FirstName = customerData.firstName;
    customerEditRequest.LastName = customerData.lastName;
    customerEditRequest.CompanyName = customerData.companyName;

    endpoint = `https://localhost:7280/api/Customer/update/${customerData.id}`;
    response = await updateAxiosFunction(endpoint, customerEditRequest);
  }

  return response;
};
