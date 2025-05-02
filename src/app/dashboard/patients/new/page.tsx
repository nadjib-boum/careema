"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addPatient } from "@/actions"

import { patientSchema, type PatientFormType } from "@/schema";

export default function () {
  const [isPending, startTransition] = useTransition()
  
  const form = useForm<PatientFormType>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      sex: "Male",
      age: 0,
      phone: "",
    },
  })

  const router = useRouter()

  function onSubmit(values: PatientFormType) {
    startTransition(async () => {
      try {
        
        const data = await addPatient(values)

        if (data.error) throw new Error(data.error.message)

        toast.success("Patient created successfully!")

        router.push("/dashboard/patients")

      } catch (error) {
        console.error("Error submitting form:", error)  
        toast.error("Failed to submit form. Please try again.")
      }
    })
  }

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Gender Field */}
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Age Field */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter your age" 
                    {...field}
                    onChange={e => field.onChange(e.target.valueAsNumber || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormDescription>
                  Must be a 10-digit phone number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Submit Button */}
          <Button type="submit" disabled={isPending} style={{ backgroundColor: "var(--color-1)" }}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  )
}