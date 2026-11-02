export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              OmniCRM Comercial SaaS
            </h1>
            <p className="text-slate-400">Gestão Comercial, Multicanal e Prospecção com Inteligência</p>
          </div>
          <div className="flex gap-3">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/20">
              ● Sistema Operacional
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-slate-400 text-sm font-medium">Contatos</h3>
            <p className="text-3xl font-bold mt-2">0</p>
            <span className="text-xs text-emerald-400 mt-1 inline-block">Ativos na base</span>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-slate-400 text-sm font-medium">Oportunidades</h3>
            <p className="text-3xl font-bold mt-2">R$ 0,00</p>
            <span className="text-xs text-blue-400 mt-1 inline-block">Funil de vendas</span>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-slate-400 text-sm font-medium">Canais Conectados</h3>
            <p className="text-3xl font-bold mt-2">0/4</p>
            <span className="text-xs text-amber-400 mt-1 inline-block">WhatsApp, Telegram, etc.</span>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-slate-400 text-sm font-medium">Prospecções Gratuitas</h3>
            <p className="text-3xl font-bold mt-2">Ativo</p>
            <span className="text-xs text-emerald-400 mt-1 inline-block">BrasilAPI & OSM</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prospecção de Empresas */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-200">🔍 Prospecção Gratuita de Empresas</h2>
            <p className="text-sm text-slate-400 mb-4">
              Consulte empresas por CNPJ usando a BrasilAPI oficial ou busque estabelecimentos comerciais sem custos.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Digite o CNPJ (somente números)"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              />
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-colors">
                Consultar Empresa (BrasilAPI)
              </button>
            </div>
          </div>

          {/* Assistente Comercial */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-slate-200">🤖 Assistente Inteligente CRM</h2>
              <p className="text-sm text-slate-400 mb-4">
                Comande o CRM por linguagem natural: listar contatos, verificar funil, criar tarefas.
              </p>
              <div className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-4 h-32 overflow-y-auto mb-4 text-sm text-slate-300">
                <p className="text-slate-500">// Exemplo: "Listar meus contatos recentes"</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite um comando para o assistente..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
