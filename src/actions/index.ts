"use server"

import { Patient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import db from "@/utils/db"
import { diagnosisFormSchema, type DiagnosisFormType, patientSchema } from "@/schema";
import DiagnosisService from "@/utils/diagnosis";


export async function addPatient(formData: unknown) {

  try {

    const validatedData = patientSchema.safeParse(formData)

    if (validatedData.error) {
      return {
        success: false,
        error: {
          message: "Invalid input",
          details: validatedData.error.errors,
        }
      }
    }

    const { name, age, sex, phone } = validatedData.data

    const patient = await db.patient.create({
      data: {
        name,
        sex,
        age,
        phone,
      }
    })

    return {
      success: true,
      data: {
        patient
      }
    }

  } catch (error) {

    return {
      success: false,
      error: {
        message: "Internal server error",
      }
    }

  }

}

export async function editPatient(formData: Partial<Pick<Patient, 'name' | 'age' | 'phone' | 'sex'>> & { id: string }) {

  try {

    const { id, name, age, sex, phone } = formData;

    const patient = await db.patient.update({
      where: {
        id,
      },
      data: {
        name,
        sex,
        age,
        phone,
      }
    })

    return {
      success: true,
      data: {
        patient
      }
    }

  } catch (error) {

    console.error(error)

    return {
      success: false,
      error: {
        message: "Internal server error",
      }
    }

  }

}

export async function deletePatient(id: string) {

  try {

    const patient = await db.patient.delete({
      where: {
        id,
      },
    })

    revalidatePath ("/dashboard/patients");

  } catch (error) {

    console.error(error)

    return {
      success: false,
      error: {
        message: "Internal server error",
      }
    }

  }

}

export async function submitDiagnosis(formData: DiagnosisFormType) {

  try {

    const validationResult = diagnosisFormSchema.safeParse(formData);
  
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.flatten());
      return {
        success: false,
        error: {
          message: "Invalid form data. Please check all fields and try again."
        }
      };
    }

    const patient = await db.patient.findUnique({
      where: {
        id: formData.patientId,
      },
    });

    if (!patient) {
      return {
        success: false,
        error: {
          message: "Patient not found."
        }
      };
    }
    
    const results = await DiagnosisService.generateDiagnosis({
      age: patient.age,
      sex: patient.sex,
      chest_pain_type: formData.chest_pain_type,
      resting_blood_pressure: formData.resting_blood_pressure,
      cholestoral: formData.cholestoral,
      fasting_blood_sugar: formData.fasting_blood_sugar,
      rest_ecg: formData.rest_ecg,
      Max_heart_rate: formData.Max_heart_rate,
      exercise_induced_angina: formData.exercise_induced_angina,
      oldpeak: formData.oldpeak,
      slope: formData.slope,
      vessels_colored_by_flourosopy: formData.vessels_colored_by_flourosopy,
      thalassemia: formData.thalassemia,
    });

    const diagnosis = await db.diagnosis.create({
      data: {
        chest_pain_type: formData.chest_pain_type,
        resting_blood_pressure: formData.resting_blood_pressure,
        cholestoral: formData.cholestoral,
        fasting_blood_sugar: formData.fasting_blood_sugar,
        rest_ecg: formData.rest_ecg,
        Max_heart_rate: formData.Max_heart_rate,
        exercise_induced_angina: formData.exercise_induced_angina,
        oldpeak: formData.oldpeak,
        slope: formData.slope,
        vessels_colored_by_flourosopy: formData.vessels_colored_by_flourosopy,
        thalassemia: formData.thalassemia,
        results,
        isPositive: results.is_diseased,
        patientId: formData.patientId,
      }
    });
    
    return {
      success: true,
      data: {
        diagnosis,
      }
    };

  } catch (error) {

    console.error("Form submission error:", error);

    return {
      success: false,
      error: {
        message: "Failed to submit form. Please try again later."
      }
    };

  }
}