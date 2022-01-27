class PatientModel {
  constructor() {
    this.SocialID = undefined;
    this.FirstName = undefined;
    this.LastName = undefined;
    this.status = undefined;
    this.Gender = undefined;
    this.BirthDate = undefined;
    this.AdresssLine = undefined;
    this.City = undefined;
    this.Country = undefined;
    this.PostalCode = undefined;
    this.Telephone = undefined;
    this.Email = undefined;
    this.RelativeContactName = undefined;
    this.RelativeTelephone = undefined;
    this.RelativeEmail = undefined;
    this.BloodType = undefined;
    this.Medication = undefined;
    this.Allergy = undefined;
    this.ActiveDisease = undefined;
    this.OldDisease = undefined;
    this.immunization = undefined;
    this.Photo = undefined;
    this.DocURL = undefined;
    this.Notes = undefined;
  }
}

export default new PatientModel();
