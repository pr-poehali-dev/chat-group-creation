import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const chats = [
    { id: 1, name: 'Team Alpha', lastMessage: 'Новое сообщение', time: '14:23', unread: 2, encrypted: true },
    { id: 2, name: 'Проект Beta', lastMessage: 'Документы готовы', time: '13:45', unread: 0, encrypted: true },
    { id: 3, name: 'Общий чат', lastMessage: 'Встреча завтра в 10:00', time: '12:30', unread: 5, encrypted: true },
    { id: 4, name: 'Разработка', lastMessage: 'Код отправлен на ревью', time: '11:15', unread: 1, encrypted: true }
  ];

  const messages = [
    { id: 1, user: 'Александр', message: 'Привет всем! Как дела с проектом?', time: '14:20', avatar: 'А' },
    { id: 2, user: 'Мария', message: 'Все идет по плану. Завтра обсудим детали.', time: '14:21', avatar: 'М' },
    { id: 3, user: 'Вы', message: 'Отлично! Жду встречи.', time: '14:23', avatar: 'В', isOwn: true }
  ];

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-white">SecureChat</h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
                <Icon name="Settings" size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
                <Icon name="Bell" size={16} />
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Поиск чатов и сообщений..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-green-400 bg-green-400/10">
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Чаты
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
              <Icon name="Users" size={16} className="mr-2" />
              Группы
            </Button>
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {chats.map((chat, index) => (
              <Card 
                key={chat.id}
                className={`p-3 mb-2 cursor-pointer transition-all hover:bg-gray-700 ${
                  selectedChat === index ? 'bg-gray-700 border-green-500' : 'bg-gray-800 border-gray-700'
                }`}
                onClick={() => setSelectedChat(index)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-green-600 text-white">
                      {chat.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-white truncate flex items-center gap-2">
                        {chat.name}
                        {chat.encrypted && (
                          <Icon name="Lock" size={12} className="text-green-400" />
                        )}
                      </h3>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <Badge className="bg-green-600 text-white text-xs px-2 py-0.5">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Profile */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-blue-600 text-white">В</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-white">Ваш профиль</p>
              <p className="text-sm text-gray-400">В сети</p>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-green-600 text-white">
                  {chats[selectedChat]?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-white flex items-center gap-2">
                  {chats[selectedChat]?.name}
                  <Icon name="Lock" size={14} className="text-green-400" />
                </h2>
                <p className="text-sm text-gray-400">3 участника • Зашифрованный чат</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
                <Icon name="Phone" size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
                <Icon name="Video" size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
                <Icon name="Info" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? 'justify-end' : ''}`}>
                {!msg.isOwn && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-600 text-white text-sm">
                      {msg.avatar}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-1' : ''}`}>
                  {!msg.isOwn && (
                    <p className="text-sm font-medium text-gray-300 mb-1">{msg.user}</p>
                  )}
                  <Card className={`p-3 ${msg.isOwn ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-100'}`}>
                    <p className="text-sm">{msg.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${msg.isOwn ? 'text-green-100' : 'text-gray-400'}`}>
                        {msg.time}
                      </span>
                      <Icon name="Lock" size={10} className={msg.isOwn ? 'text-green-200' : 'text-gray-400'} />
                    </div>
                  </Card>
                </div>
                {msg.isOwn && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-green-600 text-white text-sm">
                      {msg.avatar}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 bg-gray-800 border-t border-gray-700">
          <div className="flex gap-3 items-end">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
              <Icon name="Paperclip" size={16} />
            </Button>
            <div className="flex-1">
              <Input
                placeholder="Введите сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && message.trim() && setMessage('')}
              />
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
              <Icon name="Smile" size={16} />
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={!message.trim()}
              onClick={() => message.trim() && setMessage('')}
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
          <div className="flex items-center justify-center mt-2">
            <Badge variant="secondary" className="bg-gray-700 text-green-400 text-xs">
              <Icon name="Shield" size={10} className="mr-1" />
              Сообщения защищены сквозным шифрованием
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;