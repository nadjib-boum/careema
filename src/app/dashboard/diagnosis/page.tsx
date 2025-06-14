import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import db from "@/utils/db";
import { Delete, Eye, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DeleteReportButton from "@/components/DeleteReportButton";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default async function DiagnosisTablePage () {

  const reports = await db.diagnosis.findMany({
    include: {
      patient: {
        select:{
          name: true
        }
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="mb-3">
        <div className="text-2xl font-bold">Reports</div>
      </div>
      <Table>
        <TableCaption>A list of the recent reports.</TableCaption>
        <TableHeader className="bg-gray-100 dark:bg-gray-800">
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.patient.name}</TableCell>
              <TableCell>
              { report.isPositive ?
                <Badge variant={"secondary"} className="bg-red-400 text-white">postive</Badge> 
                :
                <Badge variant="secondary" className="bg-green-400 text-white">negative</Badge> }
              </TableCell>
              <TableCell>{report.createdAt.toLocaleString("en-us")}</TableCell>
              <TableCell className="flex items-center space-x-3">
                <Link href={`/dashboard/diagnosis/${report.id}`} target="_blank" className="block p-1 text-gray-600">
                  <Eye size={20} />
                </Link>
                <DeleteReportButton reportId={report.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

