import { cn } from '../../../lib/utils'

interface Message {
  id: number
  text: string
  sender: 'me' | 'other'
  time: string
}

export const ChatMessages = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="overflow-y-auto space-y-6 pr-2">
      <div className="text-center text-[10px] text-zinc-400 font-bold tracking-widest uppercase my-4 sticky top-0 bg-white/90 backdrop-blur-sm py-2 z-10">Today</div>
      
      <div className="space-y-6 pb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
            <div className={cn(
              "max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
              msg.sender === 'me' 
                ? "bg-[#D4B785] text-[#666666] rounded-tr-none" 
                : "bg-[#EFF0F2] text-[#666666] rounded-tl-none"
            )}>
              {msg.text}
            </div>
            <span className="text-[10px] text-zinc-400 mt-1 px-1 font-medium">{msg.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}