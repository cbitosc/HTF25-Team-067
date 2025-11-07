import { Target, Users, Shield } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="relative py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">StudySync</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">
              Revolutionizing Collaborative Learning
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              StudySync is a Real-Time Study Room Chat Application designed to make collaborative
              learning effortless and engaging. It allows students to create or join virtual study
              rooms where they can chat instantly, share files, react with emojis, and mention peers
              for focused discussions.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Built with secure WebSocket communication, the platform ensures smooth, real-time
              interactions with features like message pinning, moderation controls, and persistent
              chat history — so learning never stops, even after logging out.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-purple-500/30 shadow-2xl">
              <div className="space-y-6">
                {[
                  { icon: Target, title: 'Our Mission', desc: 'To bring the classroom collaboration experience online' },
                  { icon: Users, title: 'Our Community', desc: 'Students helping students succeed together' },
                  { icon: Shield, title: 'Our Promise', desc: 'A safe, distraction-free learning environment' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                      <item.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Real-Time Sync', desc: 'Instant message delivery with WebSocket technology' },
            { title: 'Persistent History', desc: 'All chats saved securely for future reference' },
            { title: 'File Sharing', desc: 'Share PDFs, images, and documents seamlessly' },
            { title: 'Moderation Tools', desc: 'Keep discussions focused and productive' },
          ].map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">{feature.title}</h4>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
