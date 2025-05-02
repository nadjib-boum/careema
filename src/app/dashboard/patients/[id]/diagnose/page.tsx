"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { submitDiagnosis } from "@/actions";
import { diagnosisFormSchema, type DiagnosisFormType } from "@/schema";


export default function DiagnosisPage() {

  const params = useParams();
  const router = useRouter();

  const patientId = params.id as string;

  console.log("patientId", patientId)

  if (!params.id) {
    return <div>Patient ID not found</div>;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DiagnosisFormType>({
    resolver: zodResolver(diagnosisFormSchema),
    defaultValues: {
      chest_pain_type: undefined,
      resting_blood_pressure: undefined,
      cholestoral: undefined,
      fasting_blood_sugar: undefined,
      rest_ecg: undefined,
      Max_heart_rate: undefined,
      exercise_induced_angina: undefined,
      oldpeak: undefined,
      slope: undefined,
      vessels_colored_by_flourosopy: undefined,
      thalassemia: undefined,
      patientId
    },
  });

  async function onSubmit(formData: DiagnosisFormType) {

    try {

      setIsSubmitting(true);

      const { success, data } = await submitDiagnosis(formData)
      
      if (success && data) {
        
        router.push(`/dashboard/diagnosis/${data.diagnosis.id}`);

      } else {
        toast.error("Submission failed");
      }

    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Heart Disease Risk Assessment Form</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input type="hidden" {...form.register("patientId")} value={patientId} />

            {/* Chest Pain Type */}
            <FormField
              control={form.control}
              name="chest_pain_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chest Pain Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select chest pain type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Non-anginal pain">Non-anginal pain</SelectItem>
                      <SelectItem value="Typical angina">Typical angina</SelectItem>
                      <SelectItem value="Atypical angina">Atypical angina</SelectItem>
                      <SelectItem value="Asymptomatic">Asymptomatic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resting Blood Pressure */}
            <FormField
              control={form.control}
              name="resting_blood_pressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resting Blood Pressure (mmHg)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1" 
                      placeholder="Enter resting blood pressure" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cholesterol */}
            <FormField
              control={form.control}
              name="cholestoral"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cholesterol (mg/dl)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1" 
                      placeholder="Enter cholesterol level" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fasting Blood Sugar */}
            <FormField
              control={form.control}
              name="fasting_blood_sugar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fasting Blood Sugar</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fasting blood sugar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Lower than 120 mg/ml">Lower than 120 mg/ml</SelectItem>
                      <SelectItem value="Greater than 120 mg/ml">Greater than 120 mg/ml</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rest ECG */}
            <FormField
              control={form.control}
              name="rest_ecg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resting ECG Results</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resting ECG result" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="ST-T wave abnormality">ST-T wave abnormality</SelectItem>
                      <SelectItem value="Left ventricular hypertrophy">Left ventricular hypertrophy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Max Heart Rate */}
            <FormField
              control={form.control}
              name="Max_heart_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Heart Rate</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1" 
                      placeholder="Enter maximum heart rate" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Exercise Induced Angina */}
            <FormField
              control={form.control}
              name="exercise_induced_angina"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Induced Angina</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ST Depression (Oldpeak) */}
            <FormField
              control={form.control}
              name="oldpeak"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ST Depression (Oldpeak)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1" 
                      placeholder="Enter ST depression value" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slope */}
            <FormField
              control={form.control}
              name="slope"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slope of Peak Exercise ST Segment</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select slope type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Downsloping">Downsloping</SelectItem>
                      <SelectItem value="Flat">Flat</SelectItem>
                      <SelectItem value="Upsloping">Upsloping</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Vessels Colored by Fluoroscopy */}
            <FormField
              control={form.control}
              name="vessels_colored_by_flourosopy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Major Vessels Colored by Fluoroscopy</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of vessels" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Zero">Zero</SelectItem>
                      <SelectItem value="One">One</SelectItem>
                      <SelectItem value="Two">Two</SelectItem>
                      <SelectItem value="Three">Three</SelectItem>
                      <SelectItem value="Four">Four</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thalassemia */}
            <FormField
              control={form.control}
              name="thalassemia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thalassemia</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select thalassemia type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Fixed Defect">Fixed Defect</SelectItem>
                      <SelectItem value="Reversable Defect">Reversable Defect</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full md:w-auto" style={{ backgroundColor: "var(--color-1)" }} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Assessment"}
          </Button>
        </form>
      </Form>
      
    </div>
  );
}