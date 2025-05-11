import HeartDiseasePrediction, { type ResultData } from "@/components/HeartDiseasePrediction"
// import ReportDownloadButton from "@/components/ReportDownloadButton";
import db from "@/utils/db";

export default async function DiagnosisPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const diagnosis = await db.diagnosis.findUnique({
    where: {
      id: id
    },
    include: {
      patient: true
    }
  });

  if (!diagnosis) {
    return <div>Diagnosis not found</div>;
  }

  return (
    <HeartDiseasePrediction resultData={diagnosis.results as ResultData} patient={diagnosis.patient} />
  )

}