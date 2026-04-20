import { EyeIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { ColumnDef } from '@tanstack/react-table'
import { useNavigate, useParams } from 'react-router-dom'
import FormalCard from '../../../components/shared/cards/FormalCard'
import DynamicTable from '../../../components/shared/DynamicTable'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import Space from '../../../components/shared/Space'
import { Button } from '../../../components/ui/button'
import { cn } from '../../../lib/utils'
import { useGetSingleClientQuery } from '../../../redux/propertyManager/client/clientApi'
import { Loader } from 'lucide-react'

interface AssignedProperty {
  _id: string
  name: string
  type: string
  status: string
  progress: string
  projectImage: string
}

const ClientDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()


  const { data: clientResponse, isLoading } = useGetSingleClientQuery(id as string)

  const client = clientResponse?.data?.clientData
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-brand" size={40} />
      </div>
    )
  }

  const fullName = client?.name || "N/A"
  const email = client?.email || "N/A"
  const phone = client?.phone || "N/A"
  const isBlocked = client?.user?.isBlocked
  const status = isBlocked ? "Blocked" : "Active"
  const profileImage = client?.profile_image
  const firstLetter = fullName.trim().charAt(0).toUpperCase()

  const assignedPropertiesColumns: ColumnDef<AssignedProperty>[] = [
    {
      id: 'name',
      header: 'Property Name',
      cell: ({ row }: { row: { original: AssignedProperty } }) => {
        return (
          <div className="flex items-center gap-2">
            <img src={row.original.projectImage} alt="Project" className='w-10 h-10 rounded-md object-cover' />
            <span className="font-medium">{row.original.name}</span>
          </div>
        )
      },
    },
    {
      id: 'type',
      header: 'Type',
      cell: ({ row }) => row.original.type,
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => row.original.status,
    },
    {
      id: 'progress',
      header: 'Progress',
      cell: ({ row }) => row.original.progress,
    },
    {
      id: "action",
      header: 'Action',
      cell: ({ row }) => (
        <Button
          onClick={() => navigate(`/admin/properties/${row.original._id}`)}
          size="sm"
          variant="outline">
          <HugeiconsIcon icon={EyeIcon} />
        </Button>
      ),
    }
  ]

  const assignedProperties = [
    {
      _id: '1',
      name: 'The Wilds',
      type: 'Residential Living',
      status: 'Under Construction',
      progress: '45 %',
      projectImage: "https://cdn.britannica.com/05/157305-004-53D5D212.jpg"
    }
  ]

  return (
    <PageLayout title='Client details'>
      <PageContent>
        <div className="w-32 h-32 mb-6">
          {profileImage ? (
            <img
              src={profileImage}
              alt={fullName}
              className='w-full h-full rounded-md object-cover border'
            />
          ) : (
            <div className="w-full h-full rounded-md bg-brand/10 text-brand flex items-center justify-center text-4xl font-bold border border-brand/20 rounded-xl">
              {firstLetter}
            </div>
          )}
        </div>

        <FormalCard header="Personal Information">
          <div className="responsive-grid-2 gap-y-6">
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Full Name</h1>
              <h1 className='text-[#666666] font-medium'>{fullName}</h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Email</h1>
              <h1 className='text-[#666666] font-medium'>{email}</h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Contact Phone</h1>
              <h1 className='text-[#666666] font-medium'>{phone}</h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Joined On</h1>
              <h1 className='text-[#666666] font-medium'>
                {client?.joinedOn ? new Date(client.joinedOn).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric'
                }) : "N/A"}
              </h1>
            </div>
            <div>
              <h1 className='text-[#B0B0B0] font-nunito-semibold-italic text-sm'>Status</h1>
              <h1 className={cn(
                'font-semibold',
                isBlocked ? 'text-red-600' : 'text-green-600'
              )}>
                {status}
              </h1>
            </div>
          </div>
        </FormalCard>

        <Space size={4} />

        <FormalCard header="Assigned Properties">
          <DynamicTable 
          header={false} 
          columns={assignedPropertiesColumns} 
          data={assignedProperties} />
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default ClientDetails;