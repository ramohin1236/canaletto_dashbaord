import { HugeiconsIcon } from '@hugeicons/react'
import { SentIcon } from '@hugeicons/core-free-icons'

interface ChatInputProps {
  value: string
  onChange: (val: string) => void
  onSend: () => void
}

export const ChatInput = ({ value, onChange, onSend }: ChatInputProps) => {
  return (
    <div className="mt-4 pt-4 border-t flex items-center gap-3 bg-white">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Enter message..."
          className="w-full py-3 px-6 bg-white border border-zinc-200 rounded-md text-sm outline-none focus:border-[#D4B98E] transition-all"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
        />
      </div>
      <button 
        onClick={onSend}
        className="p-2 text-[#D4B98E] hover:scale-110 transition-transform active:scale-95"
      >
        <HugeiconsIcon icon={SentIcon} size={28} />
      </button>
    </div>
  )
}