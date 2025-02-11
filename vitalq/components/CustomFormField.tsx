/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"
import React from "react"
  
interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
}

const RenderField = ({ field, props}: {field: any; props: CustomProps}) => {
    const {fieldType, iconSrc, iconAlt, placeholder} = props;
    
    if (fieldType === FormFieldType.INPUT) {
        return (
          <div className="flex rounded-md border border-dark-600 bg-dark-400">
            {iconSrc && (
              <Image 
                src={iconSrc}
                height={24}
                width={24}
                alt={iconAlt || 'icon'}
                className='ml-2'
              />
            )}
            <FormControl>
              <Input 
                {...field}
                placeholder={placeholder}
                className="shad-input border-0"
              />
            </FormControl>
          </div>
        )
    }
    
    if (fieldType === FormFieldType.PHONE_INPUT) {
        return (
          <FormControl>
            <PhoneInput 
              defaultCountry="LK"
              placeholder={placeholder}
              international
              withCountryCallingCode
              value={field.value}
              onChange={(value) => field.onChange(value)}
              className="input-phone"
            />
          </FormControl>
        )
    }
    
    return null;
}

const CustomFormField = (props: CustomProps) => {
  const {control, name, label, fieldType} = props;
  
  return (
    <FormField
      control={control}
      name={name}  // Remove the quotes around {name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField