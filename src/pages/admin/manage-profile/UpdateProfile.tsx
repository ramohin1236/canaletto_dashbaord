import { useState } from 'react'
import FormalCard from '../../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import Space from '../../../components/shared/Space'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'

interface UserProfile {
  profileImage: string
  fullName: string
  contactPhone: string
}

function UpdateProfile() {
  const [formData, setFormData] = useState<UserProfile>({
    profileImage: "https://krita-artists.org/uploads/default/original/3X/c/f/cfc4990e32f31acd695481944f2163e96ff7c6ba.jpeg",
    fullName: "Roberts Junior",
    contactPhone: "+1 919-555-0284"
  })

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile updated:', formData)
    // Add API call or state management logic here
  }

  return (
    <PageLayout title='Update profile'>
      <PageContent>
        <div className="mb-4">
          <div className="relative inline-block">
            <img
              src={formData.profileImage}
              alt="Profile"
              className='w-32 h-32 rounded-md object-cover cursor-pointer hover:opacity-80 transition-opacity'
              onClick={() => document.getElementById('profile-image-input')?.click()}
            />
            <input
              id="profile-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md opacity-0 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => document.getElementById('profile-image-input')?.click()}>
              <span className="text-white text-sm">Change Photo</span>
            </div>
          </div>
        </div>
        <FormalCard header={
          <div>
            <h1 className='text-lg text-[#666666] font-nunito-semibold-italic'>Update Profile</h1>
            <p className='text-sm text-[#B0B0B0] font-nunito-semibold-italic'>Review and update your details as needed.</p>
          </div>
        }>
          <form onSubmit={handleSubmit}>
            <div className='responsive-grid-2'>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Name</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="border-[#DDDDDD] focus:ring-brand/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-[#B0B0B0] font-nunito-semibold-italic text-sm">Contact Phone / WhatsApp</label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  className="border-[#DDDDDD] focus:ring-brand/20"
                />
              </div>
            </div>
            <Space size={4} />
            <Button type="submit" className='bg-linear-to-bl to-brand from-[#B08D59] text-white px-4 py-2 rounded-md'>Save the changes</Button>
          </form>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default UpdateProfile
