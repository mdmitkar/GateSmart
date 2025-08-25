"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface PasswordInputProps {
  id: string
  name: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  required?: boolean
}

export function PasswordInput({
  id,
  name,
  placeholder = "••••••••",
  value,
  onChange,
  className = "",
  required = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`pr-10 ${className}`}
      />
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
      </div>
    </div>
  )
}