import React from 'react';

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp?: Date;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ content, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed ${
          isUser
            ? 'bg-chat-user text-chat-user-foreground rounded-br-md'
            : 'bg-chat-ai text-chat-ai-foreground rounded-bl-md'
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default MessageBubble;
