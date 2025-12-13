import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, ChevronLeft } from 'lucide-react';
// We reuse the custom luxury icons from Layout
import { WhatsAppIcon, WeChatIcon } from './Layout'; 
// We import your existing AI service
import { getConciergeResponse } from '../services/geminiService';

export const Concierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'chat' | 'contact'>('chat'); // Toggle between AI chat and Human menu
  
  // Chat State
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Welcome to Jade Atlas Journeys. I am your digital concierge. Ask me about our destinations, itineraries, or dining culture.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (view === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, view, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      // Pass context about the current page to the AI
      const context = `Current page url: ${window.location.href}`;
      const response = await getConciergeResponse(userMsg, context);
      setMessages(prev => [...prev, { sender: 'ai', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: "I apologize, I am having trouble connecting at the moment. Please try again or connect with our team directly." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4">
      
      {/* THE WINDOW */}
      <div 
        className={`
          bg-white border border-jade-100 shadow-2xl rounded-sm w-80 md:w-96 overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col
          ${isOpen ? 'opacity-100 scale-100 translate-y-0 h-[500px]' : 'opacity-0 scale-95 translate-y-4 pointer-events-none h-0'}
        `}
      >
        {/* HEADER */}
        <div className="bg-jade-950 p-4 flex justify-between items-center shrink-0">
           {view === 'contact' ? (
             <button onClick={() => setView('chat')} className="text-jade-300 hover:text-gold-500 flex items-center gap-1 text-xs uppercase tracking-widest font-bold">
               <ChevronLeft className="w-4 h-4" /> Back to Chat
             </button>
           ) : (
             <div>
               <h3 className="font-serif text-lg text-mist-50">Jade Concierge</h3>
               <div className="flex items-center gap-2 mt-1">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                 <p className="text-[10px] uppercase tracking-widest text-jade-300">Online</p>
               </div>
             </div>
           )}
           
           <div className="flex items-center gap-3">
             {/* Toggle to Human Support */}
             {view === 'chat' && (
               <button 
                 onClick={() => setView('contact')}
                 className="text-gold-500 hover:text-white text-[10px] uppercase tracking-widest border border-gold-500 hover:bg-gold-500 hover:border-transparent px-2 py-1 rounded-sm transition-all"
                 title="Speak to a Human"
               >
                 Human Support
               </button>
             )}
             <button onClick={() => setIsOpen(false)} className="text-jade-400 hover:text-white">
               <X className="w-5 h-5" />
             </button>
           </div>
        </div>

        {/* BODY CONTENT (Switches based on View) */}
        <div className="flex-grow bg-mist-50 overflow-hidden relative">
          
          {/* VIEW 1: AI CHAT */}
          {view === 'chat' && (
            <div className="flex flex-col h-full">
              <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 text-sm leading-relaxed rounded-sm ${
                      msg.sender === 'user' 
                        ? 'bg-jade-900 text-white' 
                        : 'bg-white border border-jade-100 text-jade-800 shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-jade-100 p-3 rounded-sm shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-jade-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-jade-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-jade-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-jade-100">
                <div className="flex gap-2 relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your question..."
                    className="flex-grow bg-mist-50 border border-jade-200 rounded-sm px-3 py-3 pr-10 text-sm focus:outline-none focus:border-gold-500 text-jade-900 transition-colors"
                  />
                  <button 
                    onClick={handleSend} 
                    disabled={loading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-jade-900 hover:text-gold-600 disabled:opacity-50 p-1"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: HUMAN CONTACT OPTIONS (No Scheduling) */}
          {view === 'contact' && (
            <div className="p-6 h-full flex flex-col justify-center animate-fade-in">
               <p className="text-jade-900 font-serif text-xl mb-2 text-center">Connect with a Curator</p>
               <p className="text-jade-600 text-sm mb-8 text-center leading-relaxed">
                 Our Shanghai team is available for direct messaging. We typically reply within minutes.
               </p>

               <div className="space-y-3">
                 {/* Option 1: WhatsApp */}
                 <a href="#" className="flex items-center gap-4 p-4 bg-white border border-jade-100 hover:border-gold-500 hover:shadow-md transition-all group rounded-sm">
                    <div className="w-10 h-10 bg-jade-50 text-jade-900 rounded-full flex items-center justify-center">
                       <WhatsAppIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                       <span className="block text-sm font-bold text-jade-900 group-hover:text-gold-600 transition-colors">WhatsApp</span>
                       <span className="block text-[10px] text-jade-400 uppercase tracking-wider">Start Chat</span>
                    </div>
                 </a>

                 {/* Option 2: WeChat */}
                 <button onClick={() => alert('WeChat ID: JADE_ATLAS_VIP')} className="w-full flex items-center gap-4 p-4 bg-white border border-jade-100 hover:border-gold-500 hover:shadow-md transition-all group rounded-sm text-left">
                    <div className="w-10 h-10 bg-jade-50 text-jade-900 rounded-full flex items-center justify-center">
                       <WeChatIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                       <span className="block text-sm font-bold text-jade-900 group-hover:text-gold-600 transition-colors">WeChat</span>
                       <span className="block text-[10px] text-jade-400 uppercase tracking-wider">JADE_ATLAS_VIP</span>
                    </div>
                 </button>
               </div>
            </div>
          )}

        </div>
      </div>

      {/* THE FLOATING BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 relative
          ${isOpen ? 'bg-mist-50 text-jade-900 rotate-90' : 'bg-jade-900 text-gold-500 hover:bg-jade-800 hover:scale-105'}
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};