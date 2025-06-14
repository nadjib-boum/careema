import AgeChart from "@/components/AgeChart";
import DiseaseChart from "@/components/DiseaseChart";
import SexChart from "@/components/SexChart";
import db from "@/utils/db";

export default async function DashboardPage() {

  const patients = await db.patient.findMany({
    select: {
      age: true,
      sex: true
    }
  });
  const patientsCount = patients.length;
  const maleCount = patients.filter((patient) => patient.sex == "Male").length;

  const femaleCount = patientsCount - maleCount;

  const diagnosisCount = await db.diagnosis.count();
  const diagnosisTodayCount = await db.diagnosis.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });

  const withCHDReportsCount = await db.diagnosis.count({
    where: {
      isPositive: true,
    },
  });

  const withoutCHDReportsCount = diagnosisCount - withCHDReportsCount;


  
  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Patients</h2>
          <p className="text-3xl font-bold">{patientsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Diagnoses</h2>
          <p className="text-3xl font-bold">{diagnosisCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Completed Today</h2>
          <p className="text-3xl font-bold">{diagnosisTodayCount}</p>
        </div>
      </div>
      {/* Charts */}
      <div>
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SexChart maleCount={maleCount} femaleCount={femaleCount} />
          </div>
          <div className="flex-1">
            <DiseaseChart withCHDReportsCount={withCHDReportsCount} withoutCHDReportsCount={withoutCHDReportsCount} />
          </div>
        </div>
        <div className="mt-6">
          <AgeChart patients={patients} />
        </div>
      </div>
    </div>
  )
}