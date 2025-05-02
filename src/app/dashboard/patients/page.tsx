import PatientsDashboard from "@/components/PatientsDashboard";
import db from "@/utils/db";

export const dynamic = 'force-dynamic';

export default async function PatientsPage() {

  const patients = await db.patient.findMany({
    orderBy: {
      createdAt: "desc",
    }
  })

  return (
    <div>
      <h1 className="text-2xl font-bold">Patients</h1>
      <PatientsDashboard patients={patients} />
    </div>
  )

}