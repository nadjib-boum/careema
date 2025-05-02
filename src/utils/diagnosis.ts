import { DiagnosisFormType } from "@/schema";
import fetch from "node-fetch";

class DiagnosisServiceBase {

  async generateDiagnosis (data: Omit<DiagnosisFormType, "patientId"> & { age: number; sex: string; }) {
 
    const res = await fetch(`${process.env.DIAGNOSIS_SERVICE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const { success, results } = await res.json() as { success: boolean, results: any };

    if (!success) {
      throw new Error("Failed to generate diagnosis");
    }

    return results;

  }

}


const DiagnosisService = new DiagnosisServiceBase();

export default DiagnosisService;