import { updateAxiosFunction } from '../../genericFunctions/axiosFunctions';
import { UpdateContactRequestDto } from './contact';

export const editContact = async (contactData, action) => {
  let endpoint = '';
  const contactEditRequest = new UpdateContactRequestDto();
  var response = {};

  if (action === 'editcontacts') {
    contactEditRequest.PhoneNumber = contactData.phoneNumber;
    if (contactData.phoneNumber2 !== '') {
      contactEditRequest.PhoneNumber2 = contactData.phoneNumber2;
    }
    contactEditRequest.Email = contactData.email;
    if (contactData.email2 !== '') {
      contactEditRequest.Email2 = contactData.email2;
    }
    if (contactData.extraDetails !== '') {
      contactEditRequest.ExtraDetails = contactData.extraDetails;
    }
    endpoint = `https://localhost:7280/api/Contact/update/${contactData.id}`;
    response = await updateAxiosFunction(endpoint, contactEditRequest);
  }

  return response;
};
