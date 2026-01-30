import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProfile, UserProfile } from '@/contexts/UserProfileContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import MessageBubble from '@/components/chat/MessageBubble';
import QuickReplyButtons from '@/components/chat/QuickReplyButtons';
import TypingIndicator from '@/components/chat/TypingIndicator';
import ProfileProgress from '@/components/chat/ProfileProgress';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

type ProfileStep = 'welcome' | 'age' | 'state' | 'income' | 'category' | 'occupation' | 'complete';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

const ChatPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { profile, updateProfile } = useUserProfile();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState<ProfileStep>('welcome');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [quickReplyOptions, setQuickReplyOptions] = useState<{ key: string; label: string }[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void) => {
    setIsTyping(true);
    setShowQuickReplies(false);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1000);
  };

  const getIncomeOptions = () => [
    { key: 'below1', label: t('income.below1') },
    { key: '1to3', label: t('income.1to3') },
    { key: '3to5', label: t('income.3to5') },
    { key: '5to10', label: t('income.5to10') },
    { key: 'above10', label: t('income.above10') },
  ];

  const getCategoryOptions = () => [
    { key: 'general', label: t('category.general') },
    { key: 'obc', label: t('category.obc') },
    { key: 'sc', label: t('category.sc') },
    { key: 'st', label: t('category.st') },
    { key: 'ews', label: t('category.ews') },
  ];

  const getOccupationOptions = () => [
    { key: 'farmer', label: t('occupation.farmer') },
    { key: 'student', label: t('occupation.student') },
    { key: 'selfEmployed', label: t('occupation.selfEmployed') },
    { key: 'salaried', label: t('occupation.salaried') },
    { key: 'unemployed', label: t('occupation.unemployed') },
    { key: 'other', label: t('occupation.other') },
  ];

  const askNextQuestion = (step: ProfileStep) => {
    switch (step) {
      case 'welcome':
        simulateTyping(() => {
          addMessage(t('chat.welcome'), false);
          setCurrentStep('age');
          setTimeout(() => {
            simulateTyping(() => {
              addMessage(t('profile.age'), false);
            });
          }, 500);
        });
        break;
      case 'age':
        simulateTyping(() => {
          addMessage(t('profile.age'), false);
        });
        break;
      case 'state':
        simulateTyping(() => {
          addMessage(t('profile.state'), false);
        });
        break;
      case 'income':
        simulateTyping(() => {
          addMessage(t('profile.income'), false);
          setQuickReplyOptions(getIncomeOptions());
          setShowQuickReplies(true);
        });
        break;
      case 'category':
        simulateTyping(() => {
          addMessage(t('profile.category'), false);
          setQuickReplyOptions(getCategoryOptions());
          setShowQuickReplies(true);
        });
        break;
      case 'occupation':
        simulateTyping(() => {
          addMessage(t('profile.occupation'), false);
          setQuickReplyOptions(getOccupationOptions());
          setShowQuickReplies(true);
        });
        break;
      case 'complete':
        simulateTyping(() => {
          addMessage(
            language === 'en'
              ? 'Great! Based on your profile, I found some schemes you may be eligible for. Let me show you the results.'
              : 'बहुत बढ़िया! आपकी प्रोफाइल के आधार पर, मुझे कुछ योजनाएं मिलीं जिनके लिए आप पात्र हो सकते हैं। मैं आपको परिणाम दिखाता हूं।',
            false
          );
          setTimeout(() => navigate('/schemes'), 2000);
        });
        break;
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      askNextQuestion('welcome');
    }
  }, []);

  const handleUserResponse = (value: string, field: keyof UserProfile) => {
    addMessage(value, true);
    updateProfile(field, value);
    setShowQuickReplies(false);

    const steps: ProfileStep[] = ['age', 'state', 'income', 'category', 'occupation', 'complete'];
    const currentIndex = steps.indexOf(currentStep);
    const nextStep = steps[currentIndex + 1];
    
    if (nextStep) {
      setCurrentStep(nextStep);
      setTimeout(() => askNextQuestion(nextStep), 500);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const value = inputValue.trim();
    setInputValue('');

    switch (currentStep) {
      case 'age':
        handleUserResponse(value, 'age');
        break;
      case 'state':
        handleUserResponse(value, 'state');
        break;
      case 'income':
        handleUserResponse(value, 'income');
        break;
      case 'category':
        handleUserResponse(value, 'category');
        break;
      case 'occupation':
        handleUserResponse(value, 'occupation');
        break;
      default:
        addMessage(value, true);
    }
  };

  const handleQuickReply = (key: string) => {
    const option = quickReplyOptions.find(o => o.key === key);
    if (!option) return;

    switch (currentStep) {
      case 'income':
        handleUserResponse(option.label, 'income');
        break;
      case 'category':
        handleUserResponse(option.label, 'category');
        break;
      case 'occupation':
        handleUserResponse(option.label, 'occupation');
        break;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-background">
      {/* Progress Bar */}
      <ProfileProgress />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-2xl mx-auto">
          {messages.map(message => (
            <MessageBubble
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          {isTyping && <TypingIndicator />}
          
          {/* Quick Replies */}
          {showQuickReplies && !isTyping && (
            <div className="flex justify-start">
              <QuickReplyButtons options={quickReplyOptions} onSelect={handleQuickReply} />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chat.placeholder')}
            className="flex-1"
            disabled={isTyping || currentStep === 'complete'}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping || currentStep === 'complete'}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
