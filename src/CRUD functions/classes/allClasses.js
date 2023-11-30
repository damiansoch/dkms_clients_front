export class AddAddressRequestDto {
  constructor() {
    this.HouseNumber = null; // Default value for HouseNumber
    this.HouseName = null; // Default value for HouseName
    this.AddressLine1 = null; // Default value for AddressLine1
    this.AddressLine2 = null; // Default value for AddressLine2
    this.AddressLine3 = null; // Default value for AddressLine3
    this.EirCode = null; // Default value for EirCode
  }
}
export class UpdateContactRequestDto {
  constructor() {
    this.PhoneNumber = '';
    this.PhoneNumber2 = null;
    this.Email = '';
    this.Email2 = null;
    this.ExtraDetails = null;
  }
}
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

export class AddJobRequestDto {
  constructor() {
    this.Name = '';
    this.Description = '';
    this.Price = 0.0;
    this.Deposit = 0.0;
    this.ToBeCompleted = '';
  }
}
