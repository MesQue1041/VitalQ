/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {
  Form
} from "@/components/ui/form"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}
 

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
 
 
const PatientForm = () => {
  const router= useRouter();
  const [isLoading, setisLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
  
 
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {

    setisLoading(true);
    try {
      // const userData = { name, email, phone};

      // const user = await createUser(userData);

      // if(user) router.push(`/patients/${user.$id}/register`)


    } catch (error) {
        console.log(error);
    }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>
      
      <CustomFormField 
      fieldType={FormFieldType.INPUT}
      control={form.control}
      name="name"
      label="Full Name"
      placeholder="John Doe"
      iconSrc="/assets/icons/user.svg"
      iconAlt="user"
      />

<CustomFormField 
      fieldType={FormFieldType.INPUT}
      control={form.control}
      name="email"
      label="Email"
      placeholder="johndoe@nibm.lk"
      iconSrc="/assets/icons/email.svg"
      iconAlt="user"
      />

<CustomFormField 
      fieldType={FormFieldType.PHONE_INPUT}
      control={form.control}
      name="phone"
      label="Phone number"
      placeholder="(+94) 77-1234-567"

      />


      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
     </form>
  </Form>
  )
}

export default PatientForm