import { ImageAdd02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRef, useState } from 'react'
import JoditComponent from '../../../components/shared/JoditComponent'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import { Button } from '../../../components/ui/button'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { useAddManageMarketMutation } from '../../../redux/manageMarketApi/manageMarketApi'
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AddNewMarket = () => {
  const navigate = useNavigate()
  const [addManageMarket, { isLoading }] = useAddManageMarketMutation()

  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([]) 
  const [imageFiles, setImageFiles] = useState<File[]>([]) 
  const [title, setTitle] = useState('')
  const [errors, setErrors] = useState<{ title?: string; images?: string; content?: string }>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newFiles = Array.from(files)
    setImageFiles((prev) => [...prev, ...newFiles]) 

    newFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setImages((prev) => [...prev, result]) 
        }
        reader.readAsDataURL(file)
      }
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index))
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const validateForm = () => {
    const newErrors: { title?: string; images?: string; content?: string } = {}
    if (!title.trim()) newErrors.title = 'Market title is required'
    if (imageFiles.length === 0) newErrors.images = 'At least one image is required'
    if (!content.trim()) newErrors.content = 'Market description is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSavePost = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData()

      
        const bodyData = {
          title: title,
          description: content
        }

      
        formData.append("data", JSON.stringify(bodyData))

       
        imageFiles.forEach((file) => {
          formData.append("market_update_images", file)
        })

        const res = await addManageMarket(formData).unwrap()

        console.log("response",res)

        if (res.success) {
          toast.success("Market update added successfully!")
          navigate("/content-manager/manage-markets") 
        }
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to add market update")
      }
    } else {
      toast.error("Please fill in all required fields")
    }
  }

  return (
    <div className="">
      <PageLayout title="Add Market Update">
        <PageContent>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 italic font-nunito-semibold-italic">Add Market Update</h2>
              <p className="text-sm text-gray-400 mt-1 italic">Create Market Insights</p>
            </div>

            <div className="p-10 space-y-10">
              {/* Upload Images Section */}
              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">* Upload Images</FieldLabel>
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div
                  onClick={handleUploadClick}
                  className="border-2 border-brand/50 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-brand/40 hover:bg-brand/5 transition-all group"
                >
                  <div className="p-3 bg-gray-50 rounded-full group-hover:bg-brand/10 transition-colors">
                    <HugeiconsIcon icon={ImageAdd02Icon} size={28} className="text-gray-400 group-hover:text-brand transition-colors" />
                  </div>
                  <span className="text-base text-gray-400 group-hover:text-brand/70 font-medium">Upload Images Here</span>
                </div>

                {/* Image Previews */}
                <div className="flex flex-wrap gap-5 mt-6">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group w-32 h-24 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg cursor-pointer"
                      >
                        <span className="text-white font-bold text-sm">×</span>
                      </button>
                    </div>
                  ))}
                </div>
              </Field>

              {/* Title Input */}
              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">* Market Update Title</FieldLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Market Update Title"
                  className="h-14 bg-white border-gray-200 focus:ring-brand focus:border-brand px-6 text-base"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </Field>

              {/* Description Section */}
              <Field>
                <FieldLabel className="text-base font-medium text-gray-600 block">* Market Update Description</FieldLabel>
                <JoditComponent content={content} setContent={setContent} />
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
              </Field>

              {/* Save Button */}
              <div className="pt-6">
                <Button
                  onClick={handleSavePost}
                  disabled={isLoading}
                  className="bg-brand hover:opacity-90 hover:bg-brand text-white px-10 h-auto py-4 text-base font-semibold shadow-lg shadow-brand/20 transition-all active:scale-[0.98] cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader className="animate-spin w-5 h-5" />
                      Saving...
                    </div>
                  ) : "Save The Post"}
                </Button>
              </div>
            </div>
          </div>
        </PageContent>
      </PageLayout>
    </div>
  )
}

export default AddNewMarket