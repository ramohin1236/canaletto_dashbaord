import FormalCard from '../../../../components/shared/cards/FormalCard'
import { PageContent, PageLayout } from '../../../../components/shared/PageLayout'

function PropertyPackageDetails() {
  return (
    <PageLayout title='The Wilds Project / Property Packages'>
      <PageContent>
        <FormalCard header='Property Package Details'>
          <div className="flex items-start gap-4 flex-col">
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Package Title</h1>
              <h1 className='text-[#666666] font-medium'>Essential Support</h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Package Brief</h1>
              <h1 className='text-[#666666] font-medium'>We find the right people so you don't have to. From professional listings to deep-dive tenant screening, this package focuses exclusively on securing a qualified lease. It’s the perfect solution for owners who want a professional start but prefer to handle day-to-day management themselves.</h1>
            </div>
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default PropertyPackageDetails
