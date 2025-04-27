"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTransition } from "react"
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
import { editPatient } from "@/actions"
import { useRouter } from "next/navigation"
import { Patient } from "@/generated/prisma"

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).optional(),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender.",
  }).optional(),
  age: z.coerce.number().int().min(1, {
    message: "You must be at least 1 years old.",
  }).optional(),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Phone number must be 10 digits.",
  }).optional(),
})

export default function EditForm ({ patient }: { patient: Patient }) {

  const { id, name, age, gender, phone } = patient;

  const [isPending, startTransition] = useTransition()
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      gender,
      age,
      phone,
    },
  })

  const router = useRouter()

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        
        const data = await editPatient({ id, ...values })

        if (data.error) throw new Error(data.error.message)

        toast.success("Patient updated successfully!")

        router.push("/dashboard/patients")

      } catch (error) {
        console.log (error)
        toast.error("Failed to submit form. Please try again.")
      }
    })
  }

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-bold mb-6">Edit Patient Information</h2>
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
            name="gender"
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
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
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