"use client";

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Define the Patient type
type Patient = {
  name: string;
  age: number;
};

// Props type for our component
interface PatientAgeDistributionProps {
  patients: Patient[];
}

// Type for our processed data
type AgeRangeData = {
  range: string;
  count: number;
}

export default function AgeChart({ patients = [] }: PatientAgeDistributionProps) {
  const [ageRangeData, setAgeRangeData] = useState<AgeRangeData[]>([]);

  useEffect(() => {
    // Process patients data into age ranges
    const ranges: Record<string, number> = {};
    
    // Initialize all ranges with 0
    for (let i = 0; i < 10; i++) {
      const start = i * 10;
      const end = start + 9;
      ranges[`${start}-${end}`] = 0;
    }
    
    // Count patients in each range
    patients.forEach(patient => {
      const ageDecade = Math.floor(patient.age / 10);
      if (ageDecade >= 0 && ageDecade < 10) {
        const start = ageDecade * 10;
        const end = start + 9;
        const range = `${start}-${end}`;
        ranges[range] = (ranges[range] || 0) + 1;
      }
    });
    
    // Convert to array format for the chart
    const data = Object.keys(ranges).map(range => ({
      range,
      count: ranges[range]
    }));
    
    // Sort by age range
    data.sort((a, b) => {
      const aStart = parseInt(a.range.split('-')[0]);
      const bStart = parseInt(b.range.split('-')[0]);
      return aStart - bStart;
    });
    
    setAgeRangeData(data);
  }, [patients]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Patient Age Distribution</CardTitle>
        <CardDescription>Number of patients by age range</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageRangeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`${value} patient${value !== 1 ? 's' : ''}`, 'Count']}
                labelFormatter={(label) => `Age ${label}`}
              />
              <Bar 
                dataKey="count" 
                fill="var(--color-2)" 
                name="Patients" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium">Detailed Statistics:</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {ageRangeData.map((item) => (
              <div key={item.range} className="p-2 bg-gray-100 rounded-md">
                <p className="text-sm font-medium">{item.range}</p>
                <p className="text-lg">{item.count} patient{item.count !== 1 ? 's' : ''}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}