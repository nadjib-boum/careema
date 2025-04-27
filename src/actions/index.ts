"use server"

import { Patient } from "@prisma/client"
import db from "@/utils/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const patientSchema = z.object({
  name: z.string().min(2),
  gender: z.enum(["male", "female"]),
  age: z.number().int(),
  phone: z.string().regex(/^\d{10}$/),
})

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

    const { name, age, gender, phone } = validatedData.data

    const patient = await db.patient.create({
      data: {
        name,
        gender,
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

export async function editPatient(formData: Partial<Pick<Patient, 'name' | 'age' | 'phone' | 'gender'>> & { id: string }) {

  try {

    const { id, name, age, gender, phone } = formData;

    const patient = await db.patient.update({
      where: {
        id,
      },
      data: {
        name,
        gender,
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