import { useState, useEffect, useRef } from 'react'
import { PageContent, PageLayout } from '../../../components/shared/PageLayout'
import ChatFormalCard from './ChatFormalCard'
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'
import { ChatSidebar } from './ChatSidebar'

interface Message {
  id: number
  text: string
  sender: 'me' | 'other'
  time: string
}

const initialMessages: Message[] = [
  { id: 1, text: "I have a question regarding the handover timeline.", sender: "other", time: "04:45 PM" },
  { id: 2, text: "Yes, all clear! I've been working on the stretches you showed me.", sender: "me", time: "04:45 PM" },
  { id: 3, text: "I'm glad to hear that! See you tomorrow at the meeting!", sender: "other", time: "04:45 PM" },
  { id: 4, text: "Great! I look forward to it. Let's make it happen.", sender: "me", time: "04:45 PM" },
  { id: 5, text: "I'm excited to be a part of it. Let's make it happen!", sender: "other", time: "04:45 PM" },
  { id: 6, text: "I'm glad we're on the same page. Let's make it happen!", sender: "me", time: "04:45 PM" },
  { id: 7, text: "I'm glad we're on the same page. Let's make it happen!", sender: "other", time: "04:45 PM" },
  { id: 8, text: "I'm excited to be a part of it. Let's make it happen!", sender: "me", time: "04:45 PM" },
  { id: 9, text: "Great! I look forward to it. Let's make it happen.", sender: "other", time: "04:45 PM" },
  { id: 10, text: "I'm glad to hear that! See you tomorrow at the meeting!", sender: "other", time: "04:45 PM" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }



  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMsg: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setInputValue('');
  };

  return (
    <PageLayout title='Support Chat'>
      <PageContent>
        <div className='flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] lg:gap-10'>
          
          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:w-1/4 h-full">
            <div className="bg-white border h-full rounded-lg p-4">
              <ChatSidebar />
            </div>
          </div>
         
          {/* Chat Area */}
          <div className="flex-1 h-full lg:ml-0 ml-0">
            <ChatFormalCard
              name="Rakib Hasan"
              avater="https://api.dicebear.com/7.x/avataaars/svg?seed=Rakib"
              status="Active"
              bodyStyle="bg-white h-full flex flex-col"
            >
              <div className="relative h-full">
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex-1 overflow-y-auto min-h-0">
                    <ChatMessages messages={messages} />
                  </div>
                  <div ref={messagesEndRef} />
                  <div className="shrink-0">
                    <ChatInput 
                      value={inputValue} 
                      onChange={setInputValue} 
                      onSend={handleSend} 
                    />
                  </div>
                </div>
              </div>
            </ChatFormalCard>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  )
}