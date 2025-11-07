import { useState, useEffect, useRef } from 'react';
import { Send, Smile, Paperclip, X, Pin, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

type DemoProps = {
  isOpen: boolean;
  onClose: () => void;
};

type DemoMessage = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profile?: {
    display_name: string;
  };
};

export function Demo({ isOpen, onClose }: DemoProps) {
  const { user, profile } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const demoRoomId = '00000000-0000-0000-0000-000000000001';

  useEffect(() => {
    if (isOpen && user) {
      loadMessages();
      subscribeToMessages();
    }
  }, [isOpen, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          user_id,
          content,
          created_at,
          profiles:user_id (
            display_name
          )
        `)
        .eq('room_id', demoRoomId)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) throw error;

      const formattedMessages = data?.map((msg: any) => ({
        id: msg.id,
        user_id: msg.user_id,
        content: msg.content,
        created_at: msg.created_at,
        profile: msg.profiles,
      })) || [];

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel(`room:${demoRoomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${demoRoomId}`,
        },
        async (payload) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('id', payload.new.user_id)
            .maybeSingle();

          const newMessage: DemoMessage = {
            id: payload.new.id,
            user_id: payload.new.user_id,
            content: payload.new.content,
            created_at: payload.new.created_at,
            profile: profileData || undefined,
          };

          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('messages').insert({
        room_id: demoRoomId,
        user_id: user.id,
        content: message.trim(),
        message_type: 'text',
      });

      if (error) throw error;
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinDemoRoom = async () => {
    if (!user) return;

    try {
      const { error } = await supabase.from('room_participants').upsert(
        {
          room_id: demoRoomId,
          user_id: user.id,
        },
        { onConflict: 'room_id,user_id' }
      );

      if (error && !error.message.includes('duplicate')) {
        throw error;
      }
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      joinDemoRoom();
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Sign In Required</h3>
            <p className="text-gray-300">Please sign in to try the demo</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl h-[80vh] bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl overflow-hidden flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>

        <div className="relative flex items-center justify-between p-6 border-b border-purple-500/30">
          <div>
            <h2 className="text-2xl font-bold text-white">Demo Study Room</h2>
            <p className="text-gray-400 text-sm">Try out the real-time chat features</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="relative flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Send className="text-white" size={32} />
                </div>
                <p className="text-gray-400">No messages yet. Start the conversation!</p>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.user_id === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] ${
                    msg.user_id === user?.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : 'bg-slate-800/80'
                  } rounded-2xl p-4 backdrop-blur-sm border border-purple-500/20`}
                >
                  {msg.user_id !== user?.id && (
                    <div className="text-purple-400 text-sm font-semibold mb-1">
                      {msg.profile?.display_name || 'Anonymous'}
                    </div>
                  )}
                  <div className="text-white">{msg.content}</div>
                  <div className="text-gray-400 text-xs mt-2">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="relative p-6 border-t border-purple-500/30">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <button
              type="button"
              className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              <Paperclip size={20} />
            </button>
            <button
              type="button"
              className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              <Smile size={20} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send size={20} />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
