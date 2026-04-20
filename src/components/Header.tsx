import { AnimatePresence, motion } from "framer-motion"
import {
  Bell,
  Menu,
  PanelLeft,
  Wand2,
  X
} from "lucide-react"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import logo from "../assets/brand-logo.svg"
import { IMAGE } from '../constant/image.index'
import { cn } from "../lib/utils"
import { useGetProfileQuery } from '../redux/services/profileApis'
import { MENU } from './menu'
import Sidebar from './Sidebar'
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
const Header = ({ sidebarOpen, setSidebarOpen, role }: { sidebarOpen: boolean, setSidebarOpen: (open: boolean) => void, role: string }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuItems = MENU[role as keyof typeof MENU]
  const navigate = useNavigate()
  const [showNotification, setShowNotification] = useState(false)
  const { data: profile } = useGetProfileQuery()

  const notificationData = [
    {
      _id: "1",
      title: "New Client Added",
      message: "Rakib Hasan has successfully created an investor account.",
      createAt: "5 min ago"
    },
    {
      _id: "2",
      title: "New Project Added",
      message: "A new project added by Syed Rakib Hasan.",
      createAt: "10 min ago"
    },
    {
      _id: "3",
      title: "Project Update",
      message: "The project phase has been changed to On-Track.",
      createAt: "15 min ago"
    },
    {
      _id: "4",
      title: "New Client Assigned",
      message: "Jannatul Huda has been assigned to the project.",
      createAt: "20 min ago"
    },
    {
      _id: "5",
      title: "New Client Review",
      message: "Rakib Hasan has left a review for the client.",
      createAt: "25 min ago"
    }
  ]


  const getRoleStatus = (role: string) => {
    if (!role) return null
    switch (role.toLowerCase()) {
      case "super_admin":
        return "Super Admin"
      case "admin":
        return "Admin"
      case "property_manager":
        return "Property Manager"
      case "support_member":
        return "Support Member"
      case "content_manager":
        return "Content Manager"
      case "properties_manager":
        return "Properties Manager"
      default:
        return "User"
    }
  }

  return (
    <div className="relative bg-background overflow-hidden">

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-linear-gradient-to-br from-purple-600 to-blue-600 text-white">
                <Wand2 className="size-5" />
              </div>
              <div>
                <img src={logo} alt="Canaletto Dashboard" className="h-8 w-auto" />
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Sidebar sidebarOpen={mobileMenuOpen} role="content_admin" />
              {menuItems?.map((item) => (
                <div key={item.title} className="mb-1">
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
                      location.pathname.includes(item.path) ? "bg-linear-to-br from-[#D4B785] text-white to-[#B08D59]" : "hover:bg-muted",
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={cn("transition-all duration-300 ease-in-out", sidebarOpen ? "md:pl-64" : "md:pl-0")}>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <PanelLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => setShowNotification(!showNotification)} variant="ghost" size="icon" className="w-12 h-12 rounded-md bg-amber-50 border border-border relative">
                      {!showNotification ? <Bell className="h-5 w-5 text-brand" /> : <X className="h-5 w-5" />}
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        2
                      </span>
                      {
                        showNotification && (
                          <AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-16 right-4 w-80 bg-background border border-border rounded-lg shadow-lg"
                            >
                              <div className="p-4">
                                <div className="flex items-center justify-between">
                                  <h1>Notifications</h1>
                                  <Button className='text-xs text-[#007BFF] underline cursor-pointer' type="button" variant="link">
                                    Mark all as read
                                  </Button>
                                </div>
                                <div className="flex flex-col gap-4 w-full overflow-y-auto h-70vh">
                                  {
                                    notificationData.map((notification) => (
                                      <div className='border border-[#DDDDDD] rounded-md bg-[#FBF8F3] p-4' key={notification._id}>
                                        <div className="flex gap-4">
                                          <img className='w-12 h-12' src={IMAGE.notify} alt="notify" />
                                          <h1 className='text-start word-wrap text-wrap'>{notification.message}</h1>
                                        </div>
                                      </div>
                                    ))
                                  }
                                </div>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        )
                      }
                    </Button>

                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="w-12 h-12 flex items-center justify-center rounded-md bg-amber-50 border border-border overflow-hidden">
                {
                  profile?.data?.profile_image ? (
                    <img className='w-full h-full' src={profile?.data?.profile_image} alt="profile" />
                  ) : (
                    <h1 className='text-xs text-brand'>{profile?.data?.name?.charAt(0)?.toUpperCase()}</h1>
                  )
                }
              </div>
              <div className="flex items-start gap-1 flex-col ">
                <h1 className="text-xs text-brand">{profile?.data?.name}</h1>
                <div className="bg-green-500/20 flex items-center gap-1 px-3 py-1 text-xs text-green-700 capitalize rounded-md">
                  <div className='w-2 h-2 text-xs rounded-full bg-green-600' />
                  <small className='text-[10px]'>{getRoleStatus(role)}</small>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Header
