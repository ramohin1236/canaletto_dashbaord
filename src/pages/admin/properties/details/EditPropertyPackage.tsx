import { useState, type ChangeEvent } from 'react'
import toast from 'react-hot-toast'
import FormalCard from '../../../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../../../components/shared/PageLayout'
import { Button } from '../../../../components/ui/button'
import { Field, FieldLabel } from '../../../../components/ui/field'
import { Input } from '../../../../components/ui/input'

const EditPropertyPackage = () => {
  const [title, setTitle] = useState("")
  const [brief, setBrief] = useState("")
  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    const newErrors: any = {}
    if (!title.trim()) newErrors.title = "Property package title is required"
    if (!brief.trim()) newErrors.brief = "Property package brief is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSavePost = () => {
    if (validateForm()) {
      const formData = {
        title,
        brief
      }
      console.log("Property Package Data:", formData)
      toast.success("Property package saved successfully!")
    } else {
      toast.error("Please fill in all required fields")
    }
  }
  return (
    <PageLayout title="Edit Property Package">
      <PageContent>
        <FormalCard header={
          <div>
            <h1 className="text-lg text-[#666666] font-nunito-semibold-italic">
              Edit Property Package
            </h1>
            <p className="text-sm text-[#B0B0B0] font-nunito-semibold-italic">
              Edit Property Package related Brief to the selected property.
            </p>
          </div>
        }>
          <div className="p-4 space-y-10">
            {/* Title Input */}
            <Field>
              <FieldLabel className="text-base font-medium text-gray-600 block">
                * Property Package Title
              </FieldLabel>
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Property Package Title"
                className="h-14 bg-white border-gray-200 focus:ring-brand focus:border-brand px-6 text-base"
              />
            </Field>

            {/* Brief Textarea */}
            <Field>
              <FieldLabel className="text-base font-medium text-gray-600 block">
                * Property Package Brief
              </FieldLabel>
              {errors.brief && <p className="text-red-500 text-sm mt-1">{errors.brief}</p>}
              <textarea
                value={brief}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBrief(e.target.value)}
                placeholder="Enter Property Package Brief"
                className="w-full min-h-30 bg-white border border-gray-200 focus:ring-brand focus:border-brand px-6 py-4 text-base rounded-lg resize-none focus:outline-none focus:ring-1"
              />
            </Field>

            <div className="pt-6">
              <Button
                onClick={handleSavePost}
                className="bg-brand hover:opacity-90 text-white px-10 h-auto py-4 text-base font-semibold shadow-lg shadow-brand/20 transition-all active:scale-[0.98] cursor-pointer"
              >
                Save Property Package
              </Button>
            </div>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default EditPropertyPackage