"use client"

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, Heart, Activity, Check, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import type { Patient } from '@prisma/client';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';

export type ResultData = {
  model_results: Array<{
    model: string;
    prediction: number;
    probability: number;
  }>;
  avg_disease_probability: number;
  positive_predictions: number;
  is_diseased: boolean;
};

export default function HeartDiseasePrediction({ resultData, patient }: { resultData: ResultData, patient: Patient }) {
  
  const formatModelName = (name: string) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const toPercentage = (value: number) => {
    return (value * 100).toFixed(1) + '%';
  };

  const getRiskLevel = (probability: number) => {
    if (probability < 0.2) return { level: 'Low', color: 'bg-green-100 text-green-800' };
    if (probability < 0.4) return { level: 'Moderate', color: 'bg-yellow-100 text-yellow-800' };
    if (probability < 0.7) return { level: 'High', color: 'bg-orange-100 text-orange-800' };
    return { level: 'Very High', color: 'bg-red-100 text-red-800' };
  };

  const chartData = resultData.model_results.map(result => ({
    name: formatModelName(result.model),
    probability: parseFloat((result.probability * 100).toFixed(1))
  }));

  const overallRisk = getRiskLevel(resultData.avg_disease_probability);

  const reportRef = useRef<HTMLDivElement>(null);

  const handleReportDownload = async () => {

    console.log("Download report clicked");

    // const input = reportRef.current;
    // if (!input) return;

    // const canvas = await html2canvas(input, { scale: 2 });
    // const imgData = canvas.toDataURL('image/png');

    // const pdf = new jsPDF({
    //   orientation: 'portrait',
    //   unit: 'px',
    //   format: [canvas.width, canvas.height],
    // });

    // console.log (pdf)

    // pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    // pdf.save('report.pdf');

  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 space-y-6">

        <Card>
          <CardContent>
            <div className='text-2xl mb-3 ml-1 '>
              Patient Information
            </div>
            <Table className='w-1/2'>
              <TableBody>
                <TableRow>
                  <TableCell className='font-semibold'>Name</TableCell>
                  <TableCell>{patient.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-semibold'>Age</TableCell>
                  <TableCell>{patient.age} years old</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-semibold'>Sex</TableCell>
                  <TableCell>
                    { patient.sex == "Female" ? <Badge style={{ backgroundColor: "#FF90BB" }}>female</Badge> : <Badge style={{ backgroundColor: "#0081C9" }}>male</Badge> }
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className={resultData.is_diseased ? "border-red-300" : "border-green-300"}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Heart className={resultData.is_diseased ? "text-red-500" : "text-green-500"} />
              Heart Disease Risk Assessment
            </CardTitle>
            <CardDescription>
              Based on multiple machine learning models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Alert className={resultData.is_diseased ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}>
                <AlertCircle className={resultData.is_diseased ? "text-red-500" : "text-green-500"} />
                <AlertTitle className="text-lg font-semibold ml-2">
                  {resultData.is_diseased ? "Heart Disease Detected" : "No Heart Disease Detected"}
                </AlertTitle>
                <AlertDescription className="ml-2">
                  {resultData.is_diseased 
                    ? "The models suggest presence of heart disease. Please consult a healthcare professional."
                    : "The models suggest no presence of heart disease. Continue with regular check-ups."}
                </AlertDescription>
              </Alert>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="text-blue-500" />
                    Overall Disease Probability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Risk Level:</span>
                      <Badge className={overallRisk.color}>{overallRisk.level}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Probability:</span>
                        <span className="font-semibold">{toPercentage(resultData.avg_disease_probability)}</span>
                      </div>
                      <Progress 
                        value={resultData.avg_disease_probability * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Check className="text-blue-500" />
                    Model Consensus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Models Used:</span>
                      <span>{resultData.model_results.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Positive Predictions:</span>
                      <span>{resultData.positive_predictions} of {resultData.model_results.length}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${(resultData.positive_predictions / resultData.model_results.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-yellow-500" />
              Individual Model Probabilities
            </CardTitle>
            <CardDescription>
              Breakdown of predictions from each model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Probability (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Probability']} />
                  <Bar dataKey="probability" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {resultData.model_results.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{formatModelName(result.model)}</h3>
                    <Badge className={getRiskLevel(result.probability).color}>
                      {getRiskLevel(result.probability).level} Risk
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Probability:</span>
                      <span className="font-semibold">{toPercentage(result.probability)}</span>
                    </div>
                    <Progress 
                      value={result.probability * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="text-sm text-gray-500">
            Predictions are based on machine learning models and should be confirmed by healthcare professionals.
          </CardFooter>
        </Card>
      </div>
    </>
  );
}