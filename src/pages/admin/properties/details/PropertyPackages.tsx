import { AddSquareIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Eye, Pen, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import FormalCard from '../../../../components/shared/cards/FormalCard'
import IconWrapper from '../../../../components/shared/cards/IconWrapper'
import NoData from '../../../../components/shared/NoData'
import { PageContent, PageLayout } from '../../../../components/shared/PageLayout'
import { Button } from '../../../../components/ui/button'
import TakeConfirm from '../../../../components/ui/take-confirm'

function PropertyPackages() {

  const navigate = useNavigate()
  const siteUpdates = [
    {
      id: 1,
      title: 'Site Update 1',
    },
    {
      id: 2,
      title: 'Site Update 2'
    },
  ]

  const renderAction = () => {
    return (
      <Link to={`/admin/properties/packages/add`}>
        <Button className="bg-brand text-white" variant="outline">
          <HugeiconsIcon icon={AddSquareIcon} /> Add New Package
        </Button>
      </Link>
    )
  }

  const deleteAction = (id: number) => {
    console.log('Delete action', id)
  }
  return (
    <PageLayout title='The Wilds Project / Property Packages'>
      <PageContent>
        <FormalCard header='Property Packages' action={renderAction()}>
          {siteUpdates.length > 0 ? (
            <div className="flex flex-col">
              {siteUpdates.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className={`flex items-center justify-between py-4 ${index !== siteUpdates.length - 1 ? 'border-b border-muted-foreground/10' : ''
                    }`}
                >
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-600 font-medium">{pkg.title}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <IconWrapper onClick={() => navigate(`/admin/properties/packages/edit/${pkg.id}`)} className="bg-[#F0FDF4] border border-[#D1FAE5] text-green-500 hover:bg-[#D1FAE5] w-8 h-8 p-2 transition-colors cursor-pointer">
                      <Pen size={14} />
                    </IconWrapper>

                    <TakeConfirm
                      title="Delete Property Package"
                      description="Are you sure you want to delete this property package?"
                      confirmText="Delete"
                      cancelText="Cancel"
                      onConfirm={() => deleteAction(pkg?.id)}
                    >
                      <IconWrapper className="bg-[#FFF5F5] border border-[#FEE2E2] text-red-500 hover:bg-[#FEE2E2] w-8 h-8 p-2 transition-colors cursor-pointer">
                        <Trash2 size={14} />
                      </IconWrapper>
                    </TakeConfirm>

                    <IconWrapper onClick={() => {
                      navigate(`/admin/properties/packages/details/${pkg.id}`)
                    }} className="bg-[#FAF5FF] border border-[#F3E8FF] text-purple-500 hover:bg-[#F3E8FF] w-8 h-8 p-2 transition-colors cursor-pointer">
                      <Eye size={14} />
                    </IconWrapper>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NoData message="No Property Packages Available" />
          )}
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default PropertyPackages
