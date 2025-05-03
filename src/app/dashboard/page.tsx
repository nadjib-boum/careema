import AgeChart from "@/components/AgeChart";
import DiseaseChart from "@/components/DiseaseChart";
import SexChart from "@/components/SexChart";
import db from "@/utils/db";


const samplePatients = [
  // 0-9 age range (5 patients)
  { name: "Emma Johnson", age: 3 },
  { name: "Liam Smith", age: 5 },
  { name: "Olivia Brown", age: 7 },
  { name: "Noah Davis", age: 2 },
  { name: "Sophia Wilson", age: 9 },
  
  // 10-19 age range (8 patients)
  { name: "Mason Lee", age: 12 },
  { name: "Isabella Moore", age: 15 },
  { name: "Lucas Taylor", age: 17 },
  { name: "Mia Anderson", age: 11 },
  { name: "Ethan Thomas", age: 18 },
  { name: "Ava Jackson", age: 14 },
  { name: "Jacob White", age: 16 },
  { name: "Charlotte Harris", age: 13 },
  
  // 20-29 age range (12 patients)
  { name: "Michael Martin", age: 24 },
  { name: "Abigail Thompson", age: 27 },
  { name: "Alexander Garcia", age: 22 },
  { name: "Emily Martinez", age: 29 },
  { name: "William Robinson", age: 26 },
  { name: "Elizabeth Clark", age: 21 },
  { name: "Daniel Rodriguez", age: 28 },
  { name: "Sofia Lewis", age: 25 },
  { name: "Matthew Walker", age: 23 },
  { name: "Amelia Hall", age: 20 },
  { name: "Henry Young", age: 27 },
  { name: "Victoria Allen", age: 24 },
  
  // 30-39 age range (15 patients)
  { name: "David King", age: 36 },
  { name: "Chloe Wright", age: 33 },
  { name: "Joseph Scott", age: 39 },
  { name: "Grace Green", age: 35 },
  { name: "Samuel Baker", age: 31 },
  { name: "Ella Adams", age: 38 },
  { name: "Benjamin Nelson", age: 34 },
  { name: "Scarlett Carter", age: 32 },
  { name: "Gabriel Hill", age: 37 },
  { name: "Lily Mitchell", age: 30 },
  { name: "Carter Perez", age: 39 },
  { name: "Layla Roberts", age: 36 },
  { name: "Owen Turner", age: 33 },
  { name: "Zoe Phillips", age: 35 },
  { name: "Luke Campbell", age: 31 },
  
  // 40-49 age range (18 patients)
  { name: "John Parker", age: 45 },
  { name: "Madison Evans", age: 42 },
  { name: "Christopher Edwards", age: 48 },
  { name: "Riley Collins", age: 41 },
  { name: "Andrew Stewart", age: 47 },
  { name: "Nora Sanchez", age: 43 },
  { name: "Ryan Morris", age: 49 },
  { name: "Hannah Rogers", age: 44 },
  { name: "Thomas Reed", age: 40 },
  { name: "Addison Cook", age: 46 },
  { name: "Joshua Morgan", age: 43 },
  { name: "Zoey Bell", age: 48 },
  { name: "Christian Murphy", age: 45 },
  { name: "Penelope Bailey", age: 42 },
  { name: "Nathan Rivera", age: 47 },
  { name: "Claire Cooper", age: 44 },
  { name: "Justin Richardson", age: 41 },
  { name: "Audrey Cox", age: 49 },
  
  // 50-59 age range (14 patients)
  { name: "Kevin Howard", age: 54 },
  { name: "Stella Ward", age: 51 },
  { name: "Nicholas Torres", age: 58 },
  { name: "Skylar Peterson", age: 56 },
  { name: "Tyler Gray", age: 52 },
  { name: "Lucy Ramirez", age: 59 },
  { name: "Brandon James", age: 55 },
  { name: "Paisley Watson", age: 53 },
  { name: "Jonathan Brooks", age: 57 },
  { name: "Violet Kelly", age: 50 },
  { name: "Zachary Sanders", age: 54 },
  { name: "Aubrey Price", age: 58 },
  { name: "Jose Bennett", age: 52 },
  { name: "Brooklyn Wood", age: 56 },
  
  // 60-69 age range (10 patients)
  { name: "Aaron Barnes", age: 65 },
  { name: "Leah Ross", age: 62 },
  { name: "Steven Henderson", age: 68 },
  { name: "Evelyn Coleman", age: 61 },
  { name: "Adam Jenkins", age: 67 },
  { name: "Lillian Perry", age: 64 },
  { name: "Charles Powell", age: 69 },
  { name: "Kennedy Long", age: 63 },
  { name: "Jason Hughes", age: 66 },
  { name: "Nova Foster", age: 60 },
  
  // 70-79 age range (8 patients)
  { name: "Gregory Washington", age: 74 },
  { name: "Eleanor Butler", age: 71 },
  { name: "Brian Simmons", age: 78 },
  { name: "Hazel Bryant", age: 76 },
  { name: "Mark Russell", age: 73 },
  { name: "Ruby Griffin", age: 79 },
  { name: "Vincent Diaz", age: 75 },
  { name: "Alice Hayes", age: 72 },
  
  // 80-89 age range (6 patients)
  { name: "Harold Ford", age: 85 },
  { name: "Sadie Reynolds", age: 82 },
  { name: "Gerald Hamilton", age: 88 },
  { name: "Willow Graham", age: 81 },
  { name: "Raymond Sullivan", age: 86 },
  { name: "Camila Wallace", age: 84 },
  
  // 90-99 age range (3 patients)
  { name: "Walter Woods", age: 93 },
  { name: "Margaret West", age: 91 },
  { name: "Arthur Jordan", age: 96 }
];



export default async function DashboardPage() {

  const patientsCount = await db.patient.count();
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


  const maleCount = await db.patient.count({
    where: {
      sex: "Male"
    }
  });

  const femaleCount = patientsCount - maleCount;
  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Patients</h2>
          <p className="text-3xl font-bold">{patientsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Pending Diagnoses</h2>
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
          <AgeChart patients={samplePatients} />
        </div>
      </div>
    </div>
  )
}