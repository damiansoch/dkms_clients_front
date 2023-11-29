export class AddCustomerRequestDto {
  constructor() {
    // for customer
    this.FirstName = '';
    this.LastName = '';
    this.CompanyName = '';

    // for contact
    this.PhoneNumber = '';
    this.PhoneNumber2 = null;
    this.Email = '';
    this.Email2 = null;
    this.ExtraDetails = null;
  }
}
export class EditCustomerRequestDto {
  constructor() {
    // for customer
    this.FirstName = '';
    this.LastName = '';
    this.CompanyName = '';
  }
}
