import EditForm from "@/components/EditForm";
import db from "@/utils/db";

export default async function EditPage({  params }: { params: { id: string } }) {

  const patient = await db.patient.findUnique({
    where: {
      id: params.id,
    }
  })

  if (!patient) {
    return (
      <h1 className="text-2xl font-bold">Patient not found</h1>
    )
  }

  return (
    <EditForm patient={patient} />
  )

}