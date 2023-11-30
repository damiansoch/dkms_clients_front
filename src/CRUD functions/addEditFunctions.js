import {
  addAxiosFunction,
  updateAxiosFunction,
} from '../genericFunctions/axiosFunctions';
import { AddAddressRequestDto, AddJobRequestDto } from './classes/allClasses';
import { UpdateContactRequestDto } from './classes/allClasses';
import {
  AddCustomerRequestDto,
  EditCustomerRequestDto,
} from './classes/allClasses';

export const addEditObject = async (receivedData, action) => {
  let endpoint = '';

  var response = {};

  if (action === 'addCustomer') {
    const customerAddRequest = new AddCustomerRequestDto();
    customerAddRequest.FirstName = receivedData.firstName;
    customerAddRequest.LastName = receivedData.lastName;
    customerAddRequest.CompanyName = receivedData.companyName;
    customerAddRequest.PhoneNumber = receivedData.phoneNumber;
    if (receivedData.phoneNumber2 !== '') {
      customerAddRequest.PhoneNumber2 = receivedData.phoneNumber2;
    }
    customerAddRequest.Email = receivedData.email;
    if (receivedData.email2 !== '') {
      customerAddRequest.Email2 = receivedData.email2;
    }
    if (receivedData.extraDetails !== '') {
      customerAddRequest.ExtraDetails = receivedData.extraDetails;
    }
    endpoint = `https://localhost:7280/api/Customer/create`;
    response = await addAxiosFunction(endpoint, customerAddRequest);
  }
  if (action === 'editCustomer') {
    const customerEditRequest = new EditCustomerRequestDto();
    customerEditRequest.FirstName = receivedData.firstName;
    customerEditRequest.LastName = receivedData.lastName;
    customerEditRequest.CompanyName = receivedData.companyName;

    endpoint = `https://localhost:7280/api/Customer/update/${receivedData.id}`;
    response = await updateAxiosFunction(endpoint, customerEditRequest);
  }

  if (action === 'addaddresses') {
    const addAddressRequest = new AddAddressRequestDto();
    addAddressRequest.HouseNumber = receivedData.houseNumber;
    addAddressRequest.HouseName = receivedData.houseName;
    addAddressRequest.AddressLine1 = receivedData.addressLine1;
    addAddressRequest.AddressLine2 = receivedData.addressLine2;
    addAddressRequest.AddressLine3 = receivedData.addressLine3;
    addAddressRequest.EirCode = receivedData.eirCode;

    endpoint = `https://localhost:7280/api/Address/${receivedData.customerId}`;
    response = await addAxiosFunction(endpoint, addAddressRequest);
  }

  if (action === 'editcontacts') {
    const contactEditRequest = new UpdateContactRequestDto();
    contactEditRequest.PhoneNumber = receivedData.phoneNumber;
    if (receivedData.phoneNumber2 !== '') {
      contactEditRequest.PhoneNumber2 = receivedData.phoneNumber2;
    }
    contactEditRequest.Email = receivedData.email;
    if (receivedData.email2 !== '') {
      contactEditRequest.Email2 = receivedData.email2;
    }
    if (receivedData.extraDetails !== '') {
      contactEditRequest.ExtraDetails = receivedData.extraDetails;
    }
    endpoint = `https://localhost:7280/api/Contact/update/${receivedData.id}`;
    response = await updateAxiosFunction(endpoint, contactEditRequest);
  }

  if (action === 'addjobs') {
    console.log(receivedData);
    const jobAddRequest = new AddJobRequestDto();
    jobAddRequest.Name = receivedData.name;
    jobAddRequest.Description = receivedData.description;
    jobAddRequest.Price = receivedData.price;
    jobAddRequest.Deposit = receivedData.deposit;
    jobAddRequest.ToBeCompleted = receivedData.toBeCompleted;
    endpoint = `https://localhost:7280/api/Job/${receivedData.customerId}`;
    response = await addAxiosFunction(endpoint, jobAddRequest);
  }
  return response;
};
