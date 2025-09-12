import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, Heart, AlertCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'crisis' | 'normal';
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI mental health companion. I'm here to listen and provide support. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(Date.now() - 60000),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const crisisKeywords = ['suicide', 'kill myself', 'hurt myself', 'end it all', 'can\'t go on'];
  const anxietyKeywords = ['anxious', 'panic', 'worried', 'stressed', 'overwhelming'];
  const sadnessKeywords = ['sad', 'depressed', 'hopeless', 'empty', 'lonely'];

  const generateResponse = (userMessage: string): { content: string; type?: 'crisis' | 'normal' } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crisis detection
    if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        content: "I'm very concerned about what you've shared. Your safety is the most important thing right now. Please reach out to a crisis hotline immediately or go to your nearest emergency room. You don't have to face this alone - there are people who want to help. Would you like me to provide emergency contact information?",
        type: 'crisis'
      };
    }

    // Anxiety responses
    if (anxietyKeywords.some(keyword => lowerMessage.includes(keyword))) {
      const responses = [
        "It sounds like you're feeling anxious right now. That's completely understandable. Try taking a few deep breaths with me - breathe in for 4 counts, hold for 4, then out for 4. What's contributing to these anxious feelings?",
        "Anxiety can be overwhelming, but you're not alone in this. One technique that helps many people is grounding - can you name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste?",
        "I hear that you're feeling anxious. That takes courage to share. Sometimes anxiety is our mind's way of trying to protect us. What specific thoughts or situations are triggering these feelings?"
      ];
      return { content: responses[Math.floor(Math.random() * responses.length)] };
    }

    // Sadness responses
    if (sadnessKeywords.some(keyword => lowerMessage.includes(keyword))) {
      const responses = [
        "I'm sorry you're feeling this way. Your feelings are valid and it's okay to feel sad sometimes. Would you like to talk about what's been weighing on your mind lately?",
        "It takes strength to recognize and express when you're struggling. Depression can make everything feel heavy, but small steps can help. Have you been able to do any activities that usually bring you even a little joy?",
        "Thank you for trusting me with how you're feeling. Sadness is a natural human emotion, though I know it doesn't make it any less difficult. What kind of support would be most helpful for you right now?"
      ];
      return { content: responses[Math.floor(Math.random() * responses.length)] };
    }

    // General supportive responses
    const generalResponses = [
      "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about what you're experiencing?",
      "It sounds like you're going through something difficult. Your feelings are completely valid. What would be most helpful to talk about right now?",
      "I appreciate you opening up. Taking care of your mental health is so important. What brings you here today?",
      "That sounds challenging to deal with. You're taking a positive step by reaching out for support. How long have you been feeling this way?",
      "I'm glad you're here. Sometimes just having someone to talk to can make a difference. What's on your mind today?"
    ];

    return { content: generalResponses[Math.floor(Math.random() * generalResponses.length)] };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'bot',
        timestamp: new Date(),
        type: response.type,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          AI Mental Health Support
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A safe space to express your feelings and get immediate support. This AI companion is here to listen and help.
        </p>
      </div>

      {/* Disclaimer */}
      <Card className="p-4 bg-accent/10 border-accent/20">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-accent-vibrant flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-accent-foreground mb-1">Important Notice</p>
            <p className="text-accent-foreground/80">
              This AI is for support and guidance only. In case of emergency, please contact a crisis hotline or emergency services immediately. 
              This tool doesn't replace professional mental health care.
            </p>
          </div>
        </div>
      </Card>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto">
        <Card className="h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-muted/30">
            <div className="flex items-center space-x-3">
              <div className="gradient-primary p-2 rounded-full">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">MindCare AI Assistant</h3>
                <p className="text-sm text-muted-foreground">Always here to listen and support</p>
              </div>
              <div className="ml-auto">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Online
                </Badge>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`p-2 rounded-full ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'gradient-secondary'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`max-w-[70%] ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : message.type === 'crisis'
                      ? 'bg-destructive/10 border-l-4 border-destructive'
                      : 'bg-muted'
                  }`}>
                    <p className={`text-sm leading-relaxed ${
                      message.type === 'crisis' ? 'text-destructive font-medium' : ''
                    }`}>
                      {message.content}
                    </p>
                    {message.type === 'crisis' && (
                      <div className="mt-3 pt-3 border-t border-destructive/20">
                        <Button 
                          asChild 
                          size="sm" 
                          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        >
                          <Link to="/emergency">
                            <Phone className="mr-2 h-4 w-4" />
                            Get Emergency Help
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="gradient-secondary p-2 rounded-full">
                  <Bot className="h-4 w-4 text-white" />
                </div>
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

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-3">
              <Input
                placeholder="Share how you're feeling..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                className="gradient-primary text-primary-foreground shadow-soft hover:shadow-medium transition-gentle"
                disabled={!inputMessage.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This AI provides support but isn't a replacement for professional help.
            </p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4">
        <Button asChild variant="outline" className="p-6 h-auto flex-col space-y-2 hover:bg-secondary/50 transition-gentle">
          <Link to="/mood-tracker">
            <Heart className="h-8 w-8 text-primary" />
            <div className="text-center">
              <p className="font-medium">Track Your Mood</p>
              <p className="text-sm text-muted-foreground">Log how you're feeling today</p>
            </div>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="p-6 h-auto flex-col space-y-2 hover:bg-secondary/50 transition-gentle">
          <Link to="/resources">
            <MessageCircle className="h-8 w-8 text-secondary-vibrant" />
            <div className="text-center">
              <p className="font-medium">Browse Resources</p>
              <p className="text-sm text-muted-foreground">Find helpful articles and videos</p>
            </div>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="p-6 h-auto flex-col space-y-2 hover:bg-secondary/50 transition-gentle">
          <Link to="/emergency">
            <Phone className="h-8 w-8 text-destructive" />
            <div className="text-center">
              <p className="font-medium">Emergency Help</p>
              <p className="text-sm text-muted-foreground">Crisis support and hotlines</p>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Chat;