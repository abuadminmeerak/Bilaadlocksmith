/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Message } from '../types';

interface ChatWidgetProps {
  messages?: Message[];
  onSendMessage?: (text: string) => void;
  driverName?: string;
  isDriverActive?: boolean;
}

export default function ChatWidget({
  messages: externalMessages,
  onSendMessage,
  driverName = "Abdur Rahman",
  isDriverActive = true,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fallback local messaging state if no props are passed
  const [localMessages, setLocalMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'tech',
      text: "Greetings! Locked out of your house, workspace, or car? Let us know your layout scenario or dial our mobile lock team at 945-946-0885.",
      timestamp: "9:41 AM"
    }
  ]);

  const messages = externalMessages || localMessages;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Simulate typing indicator when new user messages are sent
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const sendMessageAction = (text: string) => {
    if (onSendMessage) {
      onSendMessage(text);
    } else {
      const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const userMsg: Message = {
        id: `msg-local-${Date.now()}`,
        sender: 'user',
        text,
        timestamp: timestampStr
      };
      setLocalMessages((prev) => [...prev, userMsg]);

      // Automated local simulated responses to mock realism
      setTimeout(() => {
        let replyText = "Understood. BILAAD support has received your query. Our mobile lock specialists are standing by.";
        const query = text.toLowerCase();

        if (query.includes('key') || query.includes('cut') || query.includes('code')) {
          replyText = "We carry specialized transponder key programming apparatus and CNC key-cut machines inside our locksmith vans. Abdur can cut and program physical smart fobs on-scene.";
        } else if (query.includes('rate') || query.includes('cost') || query.includes('price') || query.includes('fee')) {
          replyText = "Our base rates for lock bypass, rekeys, and smart key alignments are transparently priced starting at $45 base. Give us a call at 945-946-0885 for a precise immediate breakdown.";
        } else if (query.includes('where') || query.includes('track') || query.includes('location')) {
          replyText = "We cover Austin, Lakeway, Georgetown, Marble Falls, Johnson City, and San Marcos metros. All trucks run on GPS trackers with average arrival times of 15 to 25 minutes.";
        }

        const botReply: Message = {
          id: `reply-local-${Date.now()}`,
          sender: 'tech',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setLocalMessages((prev) => [...prev, botReply]);
      }, 1600);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessageAction(inputValue);
    setInputValue('');
  };

  const handleQuickAction = (text: string) => {
    sendMessageAction(text);
  };

  const activeName = driverName;
  const isAbdur = activeName.toLowerCase().includes('abdur');

  return (
    <div
      id="chat-widget-container"
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-90'
      }`}
    >
      {/* Closed State Activation Toggle */}
      {!isOpen && (
        <button
          id="chat-toggle-button"
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-blue-900/30 hover:bg-blue-500 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center group border border-blue-400/20 relative cursor-pointer"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse"></span>
          <MessageSquare className="w-5 h-5 group-hover:scale-105 transition-transform" />
        </button>
      )}

      {/* Expanded Live Chat Panel */}
      {isOpen && (
        <div
          id="chat-window"
          className="w-[360px] bg-slate-900 rounded-[24px] shadow-2xl border border-slate-800 overflow-hidden flex flex-col transition-all duration-300 transform origin-bottom-right scale-100"
        >
          {/* Header Panel */}
          <div className="bg-slate-950 p-4 border-b border-slate-800/80 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-xs tracking-wider shadow-md">
                BL
              </div>
              <div>
                <h4 className="text-xs font-black tracking-wider text-slate-100 uppercase font-sans">BILAAD Support</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  {activeName} Active
                </div>
              </div>
            </div>
            <button
              id="close-chat-button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-500 hover:text-slate-300 transition-colors border border-transparent hover:border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message Stream */}
          <div className="p-4 flex-1 h-72 overflow-y-auto bg-slate-950/40 space-y-4 text-xs scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender !== 'user' && (
                  <div className="w-6 h-6 bg-slate-800 rounded-md flex items-center justify-center text-[9px] font-black tracking-wider text-slate-300 border border-slate-700/60 shrink-0 uppercase font-sans">
                    {msg.sender === 'system' ? 'SYS' : 'TECH'}
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-950/20 font-semibold'
                      : msg.sender === 'system'
                      ? 'bg-amber-500/10 border border-amber-500/20 text-amber-300 italic text-[10px] w-full text-center'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none font-medium'
                  }`}
                >
                  <div>{msg.text}</div>
                  <div className="text-[9px] mt-1 text-slate-500 text-right">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2.5 animate-pulse font-sans">
                <div className="w-6 h-6 bg-slate-800 rounded-md flex items-center justify-center text-[9px] font-black text-slate-400 border border-slate-700/60 shrink-0 uppercase">
                  TECH
                </div>
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl rounded-tl-none text-slate-400 max-w-[85%] italic flex items-center gap-1.5">
                  <span className="flex gap-0.5">
                    <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                  <span>
                    {isAbdur 
                      ? "Abdur is checking active vehicle transponder blanks..." 
                      : `${activeName} is checking dispatch details...`}
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Actions Suggestions Area */}
          <div className="px-3 pb-2 bg-slate-950/20 flex flex-wrap gap-1.5 border-t border-slate-800/20 pt-2 shrink-0">
            <button
              type="button"
              onClick={() => handleQuickAction("I need a smart key cut & coded.")}
              className="text-[10px] bg-slate-850 hover:bg-slate-800 text-blue-400 hover:text-white px-2.5 py-1 rounded-full border border-slate-800 transition-colors font-semibold cursor-pointer"
            >
              🔑 Code Smart Key
            </button>
            <button
              type="button"
              onClick={() => handleQuickAction("What is your emergency lockout rate?")}
              className="text-[10px] bg-slate-850 hover:bg-slate-800 text-blue-400 hover:text-white px-2.5 py-1 rounded-full border border-slate-800 transition-colors font-semibold cursor-pointer"
            >
              🚨 Emergency Rate
            </button>
            <button
              type="button"
              onClick={() => handleQuickAction("Where is my technician right now?")}
              className="text-[10px] bg-slate-850 hover:bg-slate-800 text-blue-400 hover:text-white px-2.5 py-1 rounded-full border border-slate-800 transition-colors font-semibold cursor-pointer"
            >
              📍 Track Tech
            </button>
          </div>

          {/* Message Input Bar */}
          <form
            id="chat-send-form"
            onSubmit={handleSubmit}
            className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about lock sizes or options..."
              className="flex-1 bg-slate-900 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-sans"
            />
            <button
              type="submit"
              id="send-chat-button"
              className="bg-blue-600 hover:bg-blue-50 text-white hover:text-blue-600 p-2.5 rounded-xl transition-all shrink-0 flex items-center justify-center shadow-md shadow-blue-950/50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
