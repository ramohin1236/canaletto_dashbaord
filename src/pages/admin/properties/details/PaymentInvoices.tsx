import { AddSquareIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Download, Eye, Loader, Pen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import NoData from '../../../../components/shared/NoData'
import FormalCard from '../../../../components/shared/cards/FormalCard'
import IconWrapper from '../../../../components/shared/cards/IconWrapper'
import { PageContent, PageLayout } from '../../../../components/shared/PageLayout'
import { Button } from '../../../../components/ui/button'
import TakeConfirm from '../../../../components/ui/take-confirm'
import { useDeletePaymentPlanMutation, useGetPropertyPlanQuery } from '../../../../redux/paymentApi/paymentApi'
import { useGetPropertyInvoiceQuery } from '../../../../redux/paymentApi/paymentInvoiceApi'

// format date
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

// download helper
const handleDownload = (fileUrl: string, fileName: string) => {
  if (!fileUrl) return
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = fileName || 'download'
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const invoicesData = [
  { id: '1', name: 'Invoice01 .Pdf', status: 'Open', statusColor: 'text-orange-500' },
  { id: '2', name: 'Invoice02 .Pdf', status: 'Partially Paid', statusColor: 'text-blue-500' },
  { id: '3', name: 'Invoice03 .Pdf', status: 'Paid', statusColor: 'text-green-500' },
]

function PaymentInvoices() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'plan'>('invoices')
  const navigate = useNavigate()
  const state = useLocation().state
  const propertyId = state?.id

  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data: paymentInvoiceResponse } = useGetPropertyInvoiceQuery(propertyId, {
    skip: !propertyId,
  })

  const paymentInvoiceData = paymentInvoiceResponse?.data?.data ?? []
  console.log("paymentInvoiceData",paymentInvoiceData)

  const { data: paymentPlanResponse, isLoading: isPlanLoading } = useGetPropertyPlanQuery(propertyId, {
    skip: !propertyId,
  })
  const paymentPlanData = paymentPlanResponse?.data?.data ?? []

  const [deletePaymentPlan] = useDeletePaymentPlanMutation()

  const deleteAction = async (id: string) => {
    setDeletingId(id)
    try {
      const response = await deletePaymentPlan(id).unwrap()
      if (response.success) {
        toast.success(response.message || "Payment plan deleted successfully!")
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete payment plan")
    } finally {
      setDeletingId(null)
    }
  }

  const renderAction = activeTab === 'plan' ? (
    <Button
      onClick={() => navigate('/admin/properties/payment-plan/add', { state: { id: propertyId } })}
      className="bg-brand text-white"
      variant="outline"
    >
      <HugeiconsIcon icon={AddSquareIcon} /> Add New Plan
    </Button>
  ) : undefined

  return (
    <PageLayout title={`The Wilds\nProject / Payment Invoices`}>
      <PageContent>
        {/* Delete blur overlay */}
        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader size={40} className="animate-spin text-brand" />
              <span className="text-sm font-medium text-gray-500">Deleting...</span>
            </div>
          </div>
        )}

        <FormalCard header="Payment Invoices" bodyStyle="p-0" action={renderAction}>
          <div className="flex flex-col">
            {/* Toggle Header */}
            <div className="flex items-center gap-6 p-4 border-b border-muted-foreground/10">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="payment_view"
                  checked={activeTab === 'invoices'}
                  onChange={() => setActiveTab('invoices')}
                  className="w-4 h-4 accent-gray-600 cursor-pointer"
                />
                <span className={`text-sm font-medium ${activeTab === 'invoices' ? 'text-gray-600' : 'text-gray-400'} group-hover:text-gray-600`}>
                  Payment Invoices
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="payment_view"
                  checked={activeTab === 'plan'}
                  onChange={() => setActiveTab('plan')}
                  className="w-4 h-4 accent-gray-600 cursor-pointer"
                />
                <span className={`text-sm font-medium ${activeTab === 'plan' ? 'text-gray-600' : 'text-gray-400'} group-hover:text-gray-600`}>
                  Payment Plan
                </span>
              </label>
            </div>

            {/* Payment Invoices Tab (dummy) */}
            {activeTab === 'invoices' && (
              <div className="flex flex-col">
                {invoicesData.length > 0 ? invoicesData.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 ${index !== invoicesData.length - 1 ? 'border-b border-muted-foreground/10' : ''}`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-600 font-medium">{item.name}</span>
                      <span className={`text-xs ${item.statusColor}`}>{item.status}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/properties/invoices/${item.id}`)}
                        className="p-2 rounded-md bg-[#FAF5FF] text-purple-500 hover:bg-[#F3E8FF] transition-colors cursor-pointer"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                )) : (
                  <NoData message="No Payment Invoice Available" />
                )}
              </div>
            )}

            {/* Payment Plan Tab (real API) */}
            {activeTab === 'plan' && (
              <div className="flex flex-col">
                {/* Loading skeleton */}
                {isPlanLoading && (
                  <div className="flex flex-col divide-y divide-gray-100">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 animate-pulse">
                        <div className="space-y-2">
                          <div className="w-40 h-3 bg-gray-200 rounded" />
                          <div className="w-24 h-2 bg-gray-100 rounded" />
                        </div>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4].map((j) => (
                            <div key={j} className="w-8 h-8 bg-gray-200 rounded-md" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Real data */}
                {!isPlanLoading && paymentPlanData.length > 0 && paymentPlanData.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 ${index !== paymentPlanData.length - 1 ? 'border-b border-muted-foreground/10' : ''}`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-600 font-medium">{item.name}</span>
                      <span className="text-xs text-gray-400">{formatDate(item.createdAt)}</span>
                    </div>

                    <div className="flex gap-2 items-center">
                      {/* Edit */}
                      <IconWrapper
                        onClick={() => navigate(`/admin/properties/payment-plan/edit/${item.id}`, {
                          state: { id: item.id, name: item.name, file_url: item.file_url }
                        })}
                        className="bg-[#F0FDF4] border border-[#D1FAE5] text-green-500 hover:bg-[#D1FAE5] w-8 h-8 p-2 transition-colors cursor-pointer"
                      >
                        <Pen size={14} />
                      </IconWrapper>

                      {/* Delete */}
                      <TakeConfirm
                        title="Delete Payment Plan"
                        description="Are you sure you want to delete this payment plan?"
                        confirmText="Delete"
                        cancelText="Cancel"
                        onConfirm={() => deleteAction(item.id)}
                      >
                        <IconWrapper className="bg-[#FFF5F5] border border-[#FEE2E2] text-red-500 hover:bg-[#FEE2E2] w-8 h-8 p-2 transition-colors cursor-pointer">
                          <Trash2 size={14} />
                        </IconWrapper>
                      </TakeConfirm>

                      {/* View */}
                      <IconWrapper
                        onClick={() => navigate(`/admin/properties/payment-plan/${item.id}`, { state: { id: item.id } })}
                        className="bg-[#FAF5FF] border border-[#F3E8FF] text-purple-500 hover:bg-[#F3E8FF] w-8 h-8 p-2 transition-colors cursor-pointer"
                      >
                        <Eye size={14} />
                      </IconWrapper>

                      {/* Download */}
                      <IconWrapper
                        onClick={() => handleDownload(item.file_url, item.name)}
                        className="bg-[#F0F9FF] border border-[#E0F2FE] text-blue-500 hover:bg-[#E0F2FE] w-8 h-8 p-2 transition-colors cursor-pointer"
                      >
                        <Download size={14} />
                      </IconWrapper>
                    </div>
                  </div>
                ))}

                {/* Empty state */}
                {!isPlanLoading && paymentPlanData.length === 0 && (
                  <NoData message="No Payment Plan Available" />
                )}
              </div>
            )}
          </div>
        </FormalCard>
      </PageContent>
    </PageLayout>
  )
}

export default PaymentInvoices
