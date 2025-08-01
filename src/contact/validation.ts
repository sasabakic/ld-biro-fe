import * as Yup from "yup";

// Form types
export interface FormValues {
  name: string;
  email: string;
  businessType: string;
  message: string;
}

// Validation schema
export const contactValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Ime mora imati najmanje 2 karaktera")
    .required("Ime je obavezno"),
  email: Yup.string()
    .email("Neispravna email adresa")
    .required("Email je obavezan"),
  businessType: Yup.string().required("Molimo izaberite tip biznisa"),
  message: Yup.string()
    .min(10, "Poruka mora imati najmanje 10 karaktera")
    .required("Poruka je obavezna"),
});
