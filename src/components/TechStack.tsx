export function TechStack() {
  const technologies = [
    {
      name: 'React',
      category: 'Frontend',
      color: 'from-cyan-400 to-blue-500',
      description: 'UI Library',
    },
    {
      name: 'Node.js',
      category: 'Backend',
      color: 'from-green-400 to-emerald-600',
      description: 'Runtime Environment',
    },
    {
      name: 'Express',
      category: 'Backend',
      color: 'from-gray-400 to-gray-600',
      description: 'Web Framework',
    },
    {
      name: 'MongoDB',
      category: 'Database',
      color: 'from-green-500 to-green-700',
      description: 'NoSQL Database',
    },
    {
      name: 'Socket.io',
      category: 'Real-Time',
      color: 'from-purple-400 to-purple-600',
      description: 'WebSocket Library',
    },
    {
      name: 'Tailwind CSS',
      category: 'Styling',
      color: 'from-cyan-300 to-blue-400',
      description: 'CSS Framework',
    },
    {
      name: 'TypeScript',
      category: 'Language',
      color: 'from-blue-500 to-blue-700',
      description: 'Type Safety',
    },
    {
      name: 'Supabase',
      category: 'Backend',
      color: 'from-emerald-400 to-green-600',
      description: 'Database & Auth',
    },
  ];

  return (
    <section id="tech" className="relative py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Tech <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built with modern, cutting-edge technologies for optimal performance
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group relative p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 80}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <span className="text-white font-bold text-2xl">{tech.name.charAt(0)}</span>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-1">{tech.name}</h3>
                  <p className="text-sm text-purple-400 font-medium mb-2">{tech.category}</p>
                  <p className="text-xs text-gray-400">{tech.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-2xl border border-blue-500/30">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-300 font-medium">Type Safe</div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-2xl border border-purple-500/30">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">Real-Time</div>
              <div className="text-gray-300 font-medium">Data Sync</div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-pink-900/30 to-pink-800/30 rounded-2xl border border-pink-500/30">
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">Secure</div>
              <div className="text-gray-300 font-medium">Authentication</div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-lg mb-4">
            Leveraging the best tools to deliver a seamless experience
          </p>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-full border border-purple-500/30">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-sm font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </section>
  );
}
