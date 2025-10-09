import React, { useState, useEffect } from "react"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { OnboardingData } from "./OnboardingFlow"
import { FaUser, FaBirthdayCake, FaVenusMars, FaHeart } from "react-icons/fa"

interface BasicInfoStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
  onPrev: () => void
}

const getZodiacSign = (date: string): string => {
  const d = new Date(date)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const signs = [
    { sign: "Capricorn", start: [12, 22], end: [1, 19] },
    { sign: "Aquarius", start: [1, 20], end: [2, 18] },
    { sign: "Pisces", start: [2, 19], end: [3, 20] },
    { sign: "Aries", start: [3, 21], end: [4, 19] },
    { sign: "Taurus", start: [4, 20], end: [5, 20] },
    { sign: "Gemini", start: [5, 21], end: [6, 20] },
    { sign: "Cancer", start: [6, 21], end: [7, 22] },
    { sign: "Leo", start: [7, 23], end: [8, 22] },
    { sign: "Virgo", start: [8, 23], end: [9, 22] },
    { sign: "Libra", start: [9, 23], end: [10, 22] },
    { sign: "Scorpio", start: [10, 23], end: [11, 21] },
    { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
  ]
  for (const { sign, start, end } of signs) {
    if (
      (month === start[0] && day >= start[1]) ||
      (month === end[0] && day <= end[1])
    ) {
      return sign
    }
  }
  return "Unknown"
}

const getAge = (dateOfBirth: string): number => {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }
  return age
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    name: data.name,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    interestedIn: data.interestedIn,
  })

  useEffect(() => {
    if (formData.dateOfBirth) {
      const age = getAge(formData.dateOfBirth)
      const zodiacSign = getZodiacSign(formData.dateOfBirth)
      updateData({ ...formData, age, zodiacSign })
    } else {
      updateData(formData)
    }
  }, [formData, updateData])

  const genderOptions = ["Male", "Female", "Non-binary", "Custom"]
  const interestedInOptions = ["Men", "Women", "Everyone"]

  const handleInterestedInChange = (option: string) => {
    let newInterestedIn
    if (option === "Everyone") {
      newInterestedIn = formData.interestedIn.includes("Everyone")
        ? []
        : ["Everyone"]
    } else {
      const filtered = formData.interestedIn.filter((i) => i !== "Everyone")
      if (filtered.includes(option)) {
        newInterestedIn = filtered.filter((i) => i !== option)
      } else {
        newInterestedIn = [...filtered, option]
      }
    }
    setFormData((prev) => ({ ...prev, interestedIn: newInterestedIn }))
  }

  return (
    <div className="relative w-full flex justify-center">
      <Card className="w-full max-w-lg p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold mb-2 text-gray-900">
            Tell us about <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">yourself</span>
          </h2>
          <p className="text-gray-600">We’ll help you find better matches 💫</p>
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
              <FaUser className="text-pink-500" /> Your Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your first name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="h-12 text-base rounded-full border-gray-300 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>

          {/* DOB */}
          <div className="space-y-2">
            <Label htmlFor="dob" className="text-sm font-medium flex items-center gap-2">
              <FaBirthdayCake className="text-purple-500" /> Date of Birth
            </Label>
            <Input
              id="dob"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
              className="h-12 text-base rounded-full border-gray-300 focus:border-pink-500 focus:ring-pink-500"
            />
            {formData.dateOfBirth && (
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 rounded-full text-xs bg-pink-100 text-pink-600 font-medium">
                  🎂 {getAge(formData.dateOfBirth)} yrs
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-600 font-medium">
                  ✨ {getZodiacSign(formData.dateOfBirth)}
                </span>
              </div>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <FaVenusMars className="text-rose-500" /> Gender
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {genderOptions.map((gender) => (
                <Button
                  key={gender}
                  variant={formData.gender === gender ? "romantic" : "outline"}
                  onClick={() => setFormData((prev) => ({ ...prev, gender }))}
                  className={`h-12 text-base rounded-full transition-all ${
                    formData.gender === gender ? "shadow-lg scale-105" : ""
                  }`}
                >
                  {gender}
                </Button>
              ))}
            </div>
          </div>

          {/* Interested In */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <FaHeart className="text-pink-500" /> Interested In
            </Label>
            <div className="flex flex-wrap gap-3">
              {interestedInOptions.map((option) => (
                <Button
                  key={option}
                  variant={formData.interestedIn.includes(option) ? "romantic" : "outline"}
                  onClick={() => handleInterestedInChange(option)}
                  className={`h-12 px-6 text-base rounded-full transition-all ${
                    formData.interestedIn.includes(option) ? "shadow-lg scale-105" : ""
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BasicInfoStep
