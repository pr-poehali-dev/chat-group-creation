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
    { id: 1, name: 'Shadow Collective', lastMessage: 'Тайное послание', time: '23:47', unread: 2, encrypted: true },
    { id: 2, name: 'Dark Council', lastMessage: 'Планы готовы', time: '22:15', unread: 0, encrypted: true },
    { id: 3, name: 'Midnight Guild', lastMessage: 'Встреча в полночь', time: '21:30', unread: 5, encrypted: true },
    { id: 4, name: 'Void Chambers', lastMessage: 'Код в тенях', time: '20:45', unread: 1, encrypted: true }
  ];

  const messages = [
    { id: 1, user: 'Raven', message: 'Тени сгущаются... план готов к исполнению', time: '23:45', avatar: 'R' },
    { id: 2, user: 'Nyx', message: 'Полночные врата открыты. Ждем сигнала.', time: '23:46', avatar: 'N' },
    { id: 3, user: 'Вы', message: 'Да будет так. В темноте - сила.', time: '23:47', avatar: 'В', isOwn: true }
  ];

  return (
    <div className="h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-900 border-r border-purple-900/50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-purple-900/50">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-purple-300">DarkCrypt</h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-black/50">
                <Icon name="Settings" size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-black/50">
                <Icon name="Bell" size={16} />
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
            <Input 
              placeholder="Поиск чатов и сообщений..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black/50 border-purple-800 text-purple-200 placeholder:text-purple-500"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 border-b border-purple-900/50">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-purple-400 bg-purple-400/10">
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Чаты
            </Button>
            <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-black/50">
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
                className={`p-3 mb-2 cursor-pointer transition-all hover:bg-black/50 ${
                  selectedChat === index ? 'bg-black/60 border-purple-500' : 'bg-black/30 border-gray-800'
                }`}
                onClick={() => setSelectedChat(index)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-purple-700 text-purple-100">
                      {chat.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-white truncate flex items-center gap-2">
                        {chat.name}
                        {chat.encrypted && (
                          <Icon name="Lock" size={12} className="text-purple-400" />
                        )}
                      </h3>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <Badge className="bg-purple-600 text-purple-100 text-xs px-2 py-0.5">
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
        <div className="p-4 border-t border-purple-900/50">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-purple-800 text-purple-200">В</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-purple-200">Dark Lord</p>
              <p className="text-sm text-purple-400">В тенях</p>
            </div>
            <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-black/50">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-gray-900 border-b border-purple-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-purple-700 text-purple-100">
                  {chats[selectedChat]?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-purple-200 flex items-center gap-2">
                  {chats[selectedChat]?.name}
                  <Icon name="Lock" size={14} className="text-purple-400" />
                </h2>
                <p className="text-sm text-purple-400">3 темных души • Зашифровано в пустоте</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-black/50">
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
                    <AvatarFallback className="bg-purple-800 text-purple-200 text-sm">
                      {msg.avatar}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-1' : ''}`}>
                  {!msg.isOwn && (
                    <p className="text-sm font-medium text-purple-300 mb-1">{msg.user}</p>
                  )}
                  <Card className={`p-3 ${msg.isOwn ? 'bg-purple-700 text-purple-100' : 'bg-black/60 text-purple-200'}`}>
                    <p className="text-sm">{msg.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${msg.isOwn ? 'text-purple-200' : 'text-purple-400'}`}>
                        {msg.time}
                      </span>
                      <Icon name="Lock" size={10} className={msg.isOwn ? 'text-purple-300' : 'text-purple-500'} />
                    </div>
                  </Card>
                </div>
                {msg.isOwn && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-purple-800 text-purple-200 text-sm">
                      {msg.avatar}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 bg-gray-900 border-t border-purple-900/50">
          <div className="flex gap-3 items-end">
            <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-black/50">
              <Icon name="Paperclip" size={16} />
            </Button>
            <div className="flex-1">
              <Input
                placeholder="Введите сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-black/50 border-purple-800 text-purple-200 placeholder:text-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && message.trim() && setMessage('')}
              />
            </div>
            <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-black/50">
              <Icon name="Smile" size={16} />
            </Button>
            <Button 
              className="bg-purple-700 hover:bg-purple-800 text-purple-100"
              disabled={!message.trim()}
              onClick={() => message.trim() && setMessage('')}
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
          <div className="flex items-center justify-center mt-2">
            <Badge variant="secondary" className="bg-black/60 text-purple-400 text-xs">
              <Icon name="Shield" size={10} className="mr-1" />
              Послания скрыты в тенях вечности
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;