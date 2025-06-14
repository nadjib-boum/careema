"use client";

import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { deleteReport } from "@/actions";


const DeleteReportButton = ({ reportId }: { reportId: string }) => {

  const handleDelete = async (reportId: string) => {

    try {

      await deleteReport(reportId);

      toast.success("Report delete successfully!")

    } catch {

      toast.error("Failed to delete report. Please try again.")

    }

  }

  return (
    <div className="block p-1 text-gray-600 cursor-pointer hover:text-red-500" onClick={() => handleDelete(reportId)}>
      <Trash2 size={20} />
    </div>
  )

}

export default DeleteReportButton;