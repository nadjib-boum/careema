import { z } from "zod";

export const diagnosisFormSchema = z.object({
  
  chest_pain_type: z.enum(
    ["Non-anginal pain", "Typical angina", "Atypical angina", "Asymptomatic"], 
    {
      required_error: "Please select chest pain type",
    }
  ),
  
  resting_blood_pressure: z.number({
    required_error: "Resting blood pressure is required",
    invalid_type_error: "Resting blood pressure must be a number",
  }).positive("Resting blood pressure must be positive"),
  
  cholestoral: z.number({
    required_error: "Cholesterol level is required",
    invalid_type_error: "Cholesterol level must be a number",
  }).positive("Cholesterol level must be positive"),
  
  fasting_blood_sugar: z.enum(
    ["Lower than 120 mg/ml", "Greater than 120 mg/ml"], 
    {
      required_error: "Please select fasting blood sugar level",
    }
  ),
  
  rest_ecg: z.enum(
    ["Normal", "ST-T wave abnormality", "Left ventricular hypertrophy"], 
    {
      required_error: "Please select resting ECG result",
    }
  ),
  
  Max_heart_rate: z.number({
    required_error: "Maximum heart rate is required",
    invalid_type_error: "Maximum heart rate must be a number",
  }).positive("Maximum heart rate must be positive"),
  
  exercise_induced_angina: z.enum(["Yes", "No"], {
    required_error: "Please select if you have exercise induced angina",
  }),
  
  oldpeak: z.number({
    required_error: "ST depression (oldpeak) is required",
    invalid_type_error: "ST depression must be a number",
  }).positive("ST depression must be positive"),
  
  slope: z.enum(["Downsloping", "Flat", "Upsloping"], {
    required_error: "Please select slope of peak exercise ST segment",
  }),
  
  vessels_colored_by_flourosopy: z.enum(
    ["Zero", "One", "Two", "Three", "Four"], 
    {
      required_error: "Please select number of major vessels colored by fluoroscopy",
    }
  ),
  
  thalassemia: z.enum(
    ["Normal", "Fixed Defect", "Reversable Defect"], 
    {
      required_error: "Please select thalassemia type",
    }
  ),

  patientId: z.string({
    required_error: "Patient ID is required", 
  })

});

export type DiagnosisFormType = z.infer<typeof diagnosisFormSchema>;

export const patientSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  sex: z.enum(["Male", "Female"], {
    required_error: "Please select a gender.",
  }),
  age: z.coerce.number().int().min(1, {
    message: "You must be at least 1 years old.",
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Phone number must be 10 digits.",
  }),
})

export type PatientFormType = z.infer<typeof patientSchema>;