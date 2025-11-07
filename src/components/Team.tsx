import { Github, Linkedin, Mail } from 'lucide-react';

export function Team() {
  const team = [
    {
      name: 'Akhil',
      role: 'Frontend & Integration',
      initial: 'A',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Jitentra',
      role: 'Backend & Testing',
      initial: 'J',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Yashwanth',
      role: 'Design & Database',
      initial: 'Y',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section id="team" className="relative py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Meet Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Team</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The brilliant minds behind StudySync
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

              <div className="relative p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-purple-500/20 group-hover:border-purple-500/50 transition-all duration-500 transform group-hover:scale-105">
                <div className="text-center">
                  <div className={`w-32 h-32 mx-auto mb-6 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110`}>
                    <span className="text-white text-5xl font-bold">{member.initial}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-purple-400 font-medium mb-6">{member.role}</p>

                  <div className="flex items-center justify-center space-x-4">
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group/btn">
                      <Github size={20} className="text-gray-400 group-hover/btn:text-white transition-colors" />
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group/btn">
                      <Linkedin size={20} className="text-gray-400 group-hover/btn:text-white transition-colors" />
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group/btn">
                      <Mail size={20} className="text-gray-400 group-hover/btn:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-lg">
            Built with passion during our college hackathon
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
