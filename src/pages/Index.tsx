import { useState, useEffect } from 'react';
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
  const [nickname, setNickname] = useState('');
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [vpnEnabled, setVpnEnabled] = useState(false);
  const [vpnStatus, setVpnStatus] = useState('disconnected');
  const [dnsEnabled, setDnsEnabled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [recordingType, setRecordingType] = useState<'voice' | 'video' | null>(null);
  const [realIP] = useState(`192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`);
  const [vpnIP] = useState(`10.0.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`);

  const chats = [
    { id: 1, name: 'Безымянный #7731', lastMessage: 'Товар готов к отправке', time: '23:47', unread: 2, encrypted: true, hasVoice: true },
    { id: 2, name: 'Анон #4422', lastMessage: 'Встреча завтра в 14:00', time: '22:15', unread: 0, encrypted: true, hasVoice: false },
    { id: 3, name: 'Травник #9988', lastMessage: 'Новая партия поступила', time: '21:30', unread: 5, encrypted: true, hasVoice: true },
    { id: 4, name: 'Поставщик #3344', lastMessage: 'Цены обновлены', time: '20:45', unread: 1, encrypted: true, hasVoice: false }
  ];

  const messages = [
    { id: 1, user: 'Phantom#7731', message: 'Качество проверено. Все в порядке.', time: '23:45', avatar: 'P', isVoice: false },
    { id: 2, user: 'Phantom#7731', message: '🎙️ Голосовое сообщение (0:15)', time: '23:46', avatar: 'P', isVoice: true },
    { id: 3, user: 'Phantom#7731', message: '🎥 Видео-кружок (0:08)', time: '23:46', avatar: 'P', isVideo: true },
    { id: 4, user: 'Вы', message: 'Понял. Жду подтверждения.', time: '23:47', avatar: nickname?.charAt(0) || 'G', isOwn: true, isVoice: false }
  ];

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-80 bg-black border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-300">ShadowNet</h1>
                <div className={`w-2 h-2 rounded-full ${
                  vpnEnabled && vpnStatus === 'connected' ? 'bg-purple-500' : 
                  vpnEnabled && vpnStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-500'
                }`}></div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-400 hover:bg-gray-700/50 px-2"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Icon name="Settings" size={14} />
                </Button>
                {!nickname && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-purple-400 hover:bg-gray-700/50 text-xs"
                    onClick={() => setShowNicknameModal(true)}
                  >
                    Ник
                  </Button>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700/50">
                <Icon name="Settings" size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700/50">
                <Icon name="Bell" size={16} />
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
            <Input 
              placeholder="Поиск анонимных чатов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black/50 border-purple-800 text-purple-200 placeholder:text-purple-500"
            />
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="p-4 border-b border-gray-800 bg-gray-900/50">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Настройки безопасности</h3>
            
            {/* VPN Toggle */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={14} className="text-gray-400" />
                <span className="text-sm text-gray-300">VPN Туннель</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (vpnEnabled) {
                    setVpnEnabled(false);
                    setVpnStatus('disconnected');
                  } else {
                    setVpnEnabled(true);
                    setVpnStatus('connecting');
                    setTimeout(() => setVpnStatus('connected'), 1500);
                  }
                }}
                className={`text-xs px-3 ${
                  vpnEnabled ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {vpnEnabled ? 'ВКЛ' : 'ОФФ'}
              </Button>
            </div>

            {/* DNS Toggle */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon name="Globe" size={14} className="text-gray-400" />
                <span className="text-sm text-gray-300">DNS Сервер</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDnsEnabled(!dnsEnabled)}
                className={`text-xs px-3 ${
                  dnsEnabled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {dnsEnabled ? 'ВКЛ' : 'ОФФ'}
              </Button>
            </div>

            {/* Connection Info */}
            <div className="p-2 bg-black/30 rounded text-xs text-gray-400">
              <div className="flex justify-between mb-1">
                <span>Текущий IP:</span>
                <span className="text-gray-300">{vpnEnabled && vpnStatus === 'connected' ? vpnIP : realIP}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>DNS:</span>
                <span className="text-gray-300">{dnsEnabled ? '1.1.1.1' : 'Провайдер'}</span>
              </div>
              {vpnEnabled && vpnStatus === 'connected' && (
                <div className="flex justify-between">
                  <span>Нода:</span>
                  <span className="text-purple-400">NL-{Math.floor(Math.random()*99)} | Шифрование: AES-256</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div className="p-3 border-b border-gray-800">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Статус:</span>
              <span className={`${
                vpnEnabled && vpnStatus === 'connected' ? 'text-purple-400' : 
                vpnEnabled && vpnStatus === 'connecting' ? 'text-yellow-400' : 'text-gray-400'
              }`}>
                {vpnEnabled ? 
                  (vpnStatus === 'connected' ? 'Защищено' : 'Подключение...') : 
                  'Обычное соединение'
                }
              </span>
            </div>
            <div className="flex items-center gap-1">
              {!vpnEnabled && <Icon name="AlertTriangle" size={10} className="text-yellow-500" />}
              {dnsEnabled && <Icon name="Globe" size={10} className="text-blue-400" />}
              {vpnEnabled && vpnStatus === 'connected' && <Icon name="Shield" size={10} className="text-purple-400" />}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-gray-400 bg-gray-600/20">
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Чаты
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-700/50">
              <Icon name="Users" size={16} className="mr-2" />
              Онлайн
            </Button>
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {chats.map((chat, index) => (
              <Card 
                key={chat.id}
                className={`p-3 mb-2 cursor-pointer transition-all hover:bg-gray-800/50 ${
                  selectedChat === index ? 'bg-gray-800/70 border-gray-500' : 'bg-gray-900/50 border-gray-700'
                }`}
                onClick={() => setSelectedChat(index)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gray-700 text-gray-300">
                      ?
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-white truncate flex items-center gap-2">
                        {chat.name}
                        {chat.encrypted && (
                          <Icon name="Lock" size={12} className="text-purple-400" />
                        )}
                        {chat.hasVoice && (
                          <Icon name="Mic" size={12} className="text-blue-400" />
                        )}
                      </h3>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <Badge className="bg-gray-600 text-gray-200 text-xs px-2 py-0.5">
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
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className={`${
                nickname ? 'bg-purple-800 text-purple-200' : 'bg-gray-700 text-gray-400'
              }`}>
                {nickname ? nickname.charAt(0).toUpperCase() : '?'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-gray-300">{nickname || 'Аноним'}</p>
              <p className="text-sm text-gray-400">
                {vpnEnabled && vpnStatus === 'connected' ? 'Скрыт в сети' : 'Обычное соединение'}
              </p>
            </div>
            <div className="flex gap-1">
              {nickname && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-400 hover:bg-gray-700/50 px-2"
                  onClick={() => setShowNicknameModal(true)}
                >
                  <Icon name="Edit" size={14} />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-400 hover:bg-gray-700/50 px-2"
                onClick={() => {
                  setNickname('');
                  setVpnEnabled(false);
                  setVpnStatus('disconnected');
                  setDnsEnabled(false);
                }}
              >
                <Icon name="LogOut" size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-gray-700 text-gray-300">
                  ?
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-gray-300 flex items-center gap-2">
                  {chats[selectedChat]?.name}
                  <Icon name="Lock" size={14} className="text-purple-400" />
                  <Icon name="Eye" size={14} className="text-red-500" />
                </h2>
                <p className="text-sm text-gray-400">Скрытая комната • VPN туннель • Нулевое логирование</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-400 hover:bg-gray-700/50"
                onClick={() => setRecordingType('voice')}
              >
                <Icon name="Mic" size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-400 hover:bg-gray-700/50"
                onClick={() => setRecordingType('video')}
              >
                <Icon name="Video" size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700/50">
                <Icon name="Settings" size={16} />
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
                    <AvatarFallback className="bg-gray-700 text-gray-300 text-sm">
                      ?
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-1' : ''}`}>
                  {!msg.isOwn && (
                    <p className="text-sm font-medium text-gray-400 mb-1">{msg.user}</p>
                  )}
                  <Card className={`p-3 ${msg.isOwn ? 'bg-gray-700 text-gray-100' : 'bg-gray-800/80 text-gray-200'} ${msg.isVoice ? 'bg-blue-900/40' : ''} ${msg.isVideo ? 'bg-purple-900/40' : ''}`}>
                    <div className="flex items-center gap-2">
                      {msg.isVoice && <Icon name="Play" size={14} className="text-blue-400" />}
                      {msg.isVideo && <Icon name="Play" size={14} className="text-purple-400" />}
                      <p className="text-sm flex-1">{msg.message}</p>
                      {(msg.isVoice || msg.isVideo) && <span className="text-xs text-gray-400">{msg.isVideo ? '0:08' : '0:15'}</span>}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${msg.isOwn ? 'text-gray-300' : 'text-gray-400'}`}>
                        {msg.time}
                      </span>
                      <Icon name="Lock" size={10} className="text-purple-400" />
                    </div>
                  </Card>
                </div>
                {msg.isOwn && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gray-700 text-gray-300 text-sm">
                      ?
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 bg-gray-900 border-t border-gray-800">
          <div className="flex gap-3 items-end">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700/50">
              <Icon name="Paperclip" size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`hover:bg-gray-700/50 ${
                recordingType === 'voice' ? 'text-red-400 bg-red-900/20' : 'text-blue-400'
              }`}
              onClick={() => setRecordingType(recordingType === 'voice' ? null : 'voice')}
            >
              <Icon name="Mic" size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`hover:bg-gray-700/50 ${
                recordingType === 'video' ? 'text-red-400 bg-red-900/20' : 'text-purple-400'
              }`}
              onClick={() => setRecordingType(recordingType === 'video' ? null : 'video')}
            >
              <Icon name="Video" size={16} />
            </Button>
            <div className="flex-1">
              <Input
                placeholder="Зашифрованное сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-gray-200 placeholder:text-gray-500"
                onKeyPress={(e) => e.key === 'Enter' && message.trim() && setMessage('')}
              />
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700/50">
              <Icon name="Smile" size={16} />
            </Button>
            <Button 
              className="bg-gray-600 hover:bg-gray-700 text-gray-100"
              disabled={!message.trim()}
              onClick={() => message.trim() && setMessage('')}
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
          <div className="flex items-center justify-center mt-2">
            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary" className={`text-xs ${
              vpnEnabled && vpnStatus === 'connected' ? 
                'bg-purple-800/60 text-purple-400' : 
                'bg-yellow-800/60 text-yellow-400'
            }`}>
              <Icon name={vpnEnabled && vpnStatus === 'connected' ? 'Shield' : 'AlertTriangle'} size={10} className="mr-1" />
              {vpnEnabled && vpnStatus === 'connected' ? 
                'VPN защищен' : 
                'Обычное соединение - осторожно!'
              }
            </Badge>
              {recordingType && (
                <Badge variant="secondary" className="bg-red-900/20 text-red-400 text-xs animate-pulse">
                  <Icon name={recordingType === 'voice' ? 'Mic' : 'Video'} size={10} className="mr-1" />
                  Запись {recordingType === 'voice' ? 'звука' : 'видео'}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Nickname Modal */}
      {showNicknameModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <Card className="bg-gray-800 p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Псевдоним</h3>
            <p className="text-sm text-gray-400 mb-4">
              Можно остаться анонимом или создать ник для удобства
            </p>
            <Input
              placeholder="Например: DarkPhoenix, Ghost777..."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-200 mb-4"
            />
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  if (nickname.trim()) {
                    setShowNicknameModal(false);
                  }
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
                disabled={!nickname.trim()}
              >
                Сохранить
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setNickname('');
                  setShowNicknameModal(false);
                }}
                className="text-gray-400"
              >
                Отмена
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    // Автоподключение VPN отключено для выбора пользователя
  }, []);
};

export default Index;