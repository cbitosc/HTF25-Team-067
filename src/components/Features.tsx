import { MessageSquare, Share2, Smile, AtSign, Bell, Lock } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Real-Time Chat',
      description: 'Experience instant messaging with WebSocket technology. Chat with peers without any delay.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Share2,
      title: 'File Sharing',
      description: 'Share PDFs, images, and documents effortlessly. Support for multiple file formats.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Smile,
      title: 'Emoji Reactions',
      description: 'React to messages with emojis. Express yourself and engage with content instantly.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: AtSign,
      title: 'Mentions & Tags',
      description: 'Mention peers directly in conversations. Get their attention for important discussions.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Never miss important messages. Get notified when mentioned or when new activity occurs.',
      color: 'from-red-500 to-rose-500',
    },
    {
      icon: Lock,
      title: 'Secure Login',
      description: 'Your data is safe with email authentication. Private rooms with moderation controls.',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section id="features" className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMzksMTkyLDI0NiwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Powerful <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Features</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need for seamless collaborative learning in one platform
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className={`inline-flex p-4 bg-gradient-to-br ${feature.color} rounded-2xl shadow-lg shadow-purple-500/20 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white" size={32} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                <div className="mt-6 flex items-center text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="mr-2">Learn more</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl border border-purple-500/30 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              And Many More Features Coming Soon!
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6">
              We're constantly working on new features to enhance your learning experience.
              Stay tuned for video calls, whiteboard collaboration, and AI-powered study assistants.
            </p>
            <div className="flex items-center justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
