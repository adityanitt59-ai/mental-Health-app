import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, Heart, AlertCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  created_at?: string;
  type?: 'crisis' | 'normal';
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const crisisKeywords = ['suicide', 'kill myself', 'hurt myself', 'end it all', "can't go on"];

  // Fetch messages from Supabase
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) console.error('Error fetching messages:', error);
    else setMessages(data || []);
  };

  // Insert message into Supabase
  const addMessage = async (content: string, sender: 'user' | 'bot', type?: 'crisis' | 'normal') => {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ content, sender, type }])
      .select();

    if (error) console.error('Error inserting message:', error);
    else setMessages(prev => [...prev, ...(data || [])]);
  };

  // AI response generator
  const generateResponse = (userMessage: string): { content: string; type?: 'crisis' | 'normal' } => {
    const lowerMessage = userMessage.toLowerCase();

    if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        content: "I'm very concerned about what you've shared. Your safety is the most important thing right now. Please reach out to a crisis hotline immediately or go to your nearest emergency room.",
        type: 'crisis'
      };
    }

    return { content: "Thanks for sharing. I'm here to listen and support you." };
  };

  // Send message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Insert user message
    await addMessage(userMsg, 'user');

    // Simulate bot typing
    setTimeout(async () => {
      const response = generateResponse(userMsg);
      await addMessage(response.content, 'bot', response.type);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">AI Mental Health Support</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A safe space to express your feelings and get immediate support.
        </p>
      </div>

      {/* Disclaimer */}
      <Card className="p-4 bg-accent/10 border-accent/20">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-accent-vibrant flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-accent-foreground mb-1">Important Notice</p>
            <p className="text-accent-foreground/80">
              This AI is for support and guidance only. In case of emergency, contact a crisis hotline immediately.
            </p>
          </div>
        </div>
      </Card>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto">
        <Card className="h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div key={message.id} className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'gradient-secondary'}`}>
                  {message.sender === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                </div>
                <div className={`max-w-[70%] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground ml-auto' : message.type === 'crisis' ? 'bg-destructive/10 border-l-4 border-destructive' : 'bg-muted'}`}>
                    <p className={`text-sm leading-relaxed ${message.type === 'crisis' ? 'text-destructive font-medium' : ''}`}>{message.content}</p>
                    {message.type === 'crisis' && (
                      <div className="mt-3 pt-3 border-t border-destructive/20">
                        <Button asChild size="sm" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                          <Link to="/emergency"><Phone className="mr-2 h-4 w-4" />Get Emergency Help</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.created_at ? new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="gradient-secondary p-2 rounded-full"><Bot className="h-4 w-4 text-white" /></div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t flex space-x-3">
            <Input placeholder="Share how you're feeling..." value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} className="flex-1" />
            <Button onClick={handleSendMessage} className="gradient-primary text-primary-foreground" disabled={!inputMessage.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
