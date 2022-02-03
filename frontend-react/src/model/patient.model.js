class PatientModel {
  constructor() {
    this.SocialID = null;
    this.PassportID = null;
    this.FirstName = null;
    this.LastName = null;
    this.status = "Active";
    this.Gender = null;
    this.BirthDate = null;
    this.AdresssLine = null;
    this.City = null;
    this.Country = null;
    this.PostalCode = null;
    this.Telephone = null;
    this.Email = null;
    this.RelativeContactName = null;
    this.RelativeTelephone = null;
    this.RelativeEmail = null;
    this.BloodType = null;
    this.Medication = null;
    this.Allergy = null;
    this.ActiveDisease = null;
    this.OldDisease = null;
    this.immunization = null;
    this.Photo = null;
    this.DocURL = null;
    this.Notes = null;
    this.CreatedDate = new Date();
    this.ModifiedDate = null;
  }
}

export default new PatientModel();
