"use client";

import { Button } from "./ui/button"

type ReportDownloadButtonProps = {
  component: React.ReactNode;
}

const ReportDownloadButton = ({ component }: ReportDownloadButtonProps) => {

  const handleReportDownload = () => {}


  return (
    null
  )

  // const { t } = useTranslation();
  // const { report } = useReport();

  // const handleDownload = () => {
  //   if (report) {
  //     const blob = new Blob([JSON.stringify(report)], { type: 'application/json' });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'report.json';
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     URL.revokeObjectURL(url);
  //   }
  // };

  // return (
  //   <Button onClick={handleDownload} variant="contained" color="primary">
  //     {t('download_report')}
  //   </Button>
  // );
}

export default ReportDownloadButton;