import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  CheckCircle, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  CreditCard, 
  ArrowRight,
  Building2,
  Gavel,
  ShieldAlert,
  MapPin as MapPinIcon,
  Calendar as CalendarIcon,
  DollarSign,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

// --- Constants & Mock Data ---

const HERO_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCaBSwfB7RN0lHyeNLj30vPs5DqeSWKbf8X59XlDpCjQsbufBJeCDpt2n_pOD70wcfmpKOfMePm4qPh_R1IPIH0PQY4wSWDCpTh2w4cRdMrAcoPSYJjexJdh-SHXo-9ayySD3tF8NUwd1tlgvX9t_ZgTWTxQsWkZD-3hxFNDz-NRLMuyphDx8OZtLvrVkC20Da8eawKxadbBtLX8y0ZWD1mycujhBplEhe0y6hdm1LWejeJyeRH3TTxbUS-uC-HUr9Hpz0xkzOTLbtY";
const PROFILE_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDMPmt8vogOt3IzPrv0xIx9jBr7zHQkY9GTJy19UkN9zo4erCR_YJMofKHVQAoGkn28OgNH5ZX4380PtLHFvis6AOMlf49n21IK-iNk7iR15FpOd_nV9fvYWc5AYC6MgwDmQkDgShpqoT79mlLeUQvqiThrByqDKPRgdxElxJ0TS1tb7BvSMc0TOTPQ0Wci9moNjO4IrmBJfFURaxuqna5Kssu2xkb92lCjUDHGpDQpsRWYjY9PYgTFsXNb0uHBXx2rP78c64aOowTS";

// Nenhuma mock data necessária

// Fallback utility to assign icons/colors to real data
const mapApiDataToExam = (apiExam: any, index: number) => {
  const icons = [Building2, Gavel, ShieldAlert];
  const iconColors = ["text-blue-600 bg-blue-50", "text-indigo-600 bg-indigo-50", "text-slate-600 bg-slate-100"];
  const statusColors: Record<string, string> = {
    'ABERTAS': "bg-green-100 text-green-700",
    'EM BREVE': "bg-amber-100 text-amber-700",
    'ENCERRADAS': "bg-red-100 text-red-700"
  };

  let statusKey = (apiExam.status || '').toUpperCase();
  if (statusKey.includes('ABERTA')) statusKey = 'ABERTAS';
  else if (statusKey.includes('BREVE')) statusKey = 'EM BREVE';

  return {
    id: apiExam.id || index,
    institution: apiExam.titulo || apiExam.institution,
    role: apiExam.escolaridade || apiExam.role,
    location: apiExam.estado || apiExam.location,
    deadline: apiExam.data_abertura || apiExam.deadline,
    salary: apiExam.taxa_inscricao ? `Taxa: R$ ${apiExam.taxa_inscricao}` : (apiExam.salary || "A definir"),
    status: (apiExam.status || "INSCRIÇÕES ABERTAS").toUpperCase(),
    statusColor: statusColors[statusKey] || statusColors['ABERTAS'],
    icon: icons[index % icons.length],
    iconColor: iconColors[index % iconColors.length],
    link: apiExam.link
  };
};

// --- Components ---

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Building2 size={24} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-blue-600">ConcursoLink</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Abertos</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Em Breve</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Notícias</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Guia do Candidato</a>
          </nav>

          {/* Auth / Profile */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
              Entrar
            </button>
            <button className="text-sm font-bold bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
              Cadastrar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 shadow-lg">
          <a href="#" className="block text-sm font-semibold text-slate-600">Abertos</a>
          <a href="#" className="block text-sm font-semibold text-slate-600">Em Breve</a>
          <a href="#" className="block text-sm font-semibold text-slate-600">Notícias</a>
          <a href="#" className="block text-sm font-semibold text-slate-600">Guia do Candidato</a>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button className="w-full text-center text-sm font-bold text-blue-600 bg-blue-50 py-3 rounded-lg">Entrar</button>
            <button className="w-full text-center text-sm font-bold bg-slate-900 text-white py-3 rounded-lg">Cadastrar</button>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-20 pb-32 lg:pb-48 flex items-center justify-center overflow-hidden min-h-[600px]">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/60 z-10" />
        <img 
          src={HERO_IMAGE_URL} 
          alt="Modern office building" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center mt-12 lg:mt-0">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 max-w-4xl tracking-tight">
          Encontre o seu futuro no <span className="text-blue-400">serviço público</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-200 font-medium max-w-2xl mb-12">
          Milhares de editais abertos em todo o Brasil. Comece sua carreira hoje com a plataforma mais completa.
        </p>
      </div>
    </section>
  );
};

const SearchWidget = ({ onSearch }: { onSearch: (filters: any) => void }) => {
  const [activeTab, setActiveTab] = useState('concursos');
  const [escolaridade, setEscolaridade] = useState('');
  const [estado, setEstado] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');
  const [taxaInscricao, setTaxaInscricao] = useState('');

  return (
    <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 lg:-mt-32 mb-20">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('concursos')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'concursos' ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Search size={18} /> Concursos
          </button>
          <button 
            onClick={() => setActiveTab('editais')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'editais' ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <FileText size={18} /> Editais
          </button>
          <button 
            onClick={() => setActiveTab('resultados')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'resultados' ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <CheckCircle size={18} /> Resultados
          </button>
        </div>

        {/* Form Fields */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Field: Escolaridade */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <GraduationCap size={16} /> Escolaridade
              </label>
              <div className="relative">
                <select 
                  value={escolaridade}
                  onChange={(e) => setEscolaridade(e.target.value)}
                  className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none transition-all">
                  <option value="">Qualquer nível</option>
                  <option value="Fundamental">Fundamental</option>
                  <option value="Médio">Médio</option>
                  <option value="Técnico">Técnico</option>
                  <option value="Superior">Superior</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Field: Estado */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MapPin size={16} /> Estado (UF)
              </label>
              <div className="relative">
                <select 
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none transition-all">
                  <option value="">Brasil (Todos)</option>
                  <option value="SP">São Paulo (SP)</option>
                  <option value="RJ">Rio de Janeiro (RJ)</option>
                  <option value="MG">Minas Gerais (MG)</option>
                  <option value="DF">Distrito Federal (DF)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Field: Data */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Calendar size={16} /> Data de Abertura
              </label>
              <input 
                type="date" 
                value={dataAbertura}
                onChange={(e) => setDataAbertura(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>

            {/* Field: Taxa */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <CreditCard size={16} /> Taxa de Inscrição
              </label>
              <div className="relative">
                <select 
                  value={taxaInscricao}
                  onChange={(e) => setTaxaInscricao(e.target.value)}
                  className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none transition-all">
                  <option value="">Qualquer valor</option>
                  <option value="0">Grátis</option>
                  <option value="50">Até R$ 50,00</option>
                  <option value="150">R$ 50 - R$ 150</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-end">
            <button 
              onClick={() => onSearch({ escolaridade, estado, data_abertura: dataAbertura, taxa_inscricao: taxaInscricao })}
              className="group flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl w-full md:w-auto">
              <span>BUSCAR CONCURSOS</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExamCard = ({ exam, onClick }: { key?: React.Key, exam: any; onClick: (exam: any) => void }) => {
  const Icon = exam.icon;
  return (
    <div 
      onClick={() => onClick(exam)}
      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full cursor-pointer transform hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${exam.iconColor}`}>
          <Icon size={28} />
        </div>
        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${exam.statusColor}`}>
          {exam.status}
        </span>
      </div>
      
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {exam.institution}
        </h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">
          {exam.role}
        </p>
      </div>

      <div className="space-y-3 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <MapPinIcon size={18} className="text-slate-400" />
          <span>{exam.location}</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <CalendarIcon size={18} className="text-slate-400" />
          <span>{exam.deadline}</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-bold text-blue-600">
          <DollarSign size={18} />
          <span>{exam.salary}</span>
        </div>
      </div>
    </div>
  );
};

const ExamModal = ({ exam, onClose }: { exam: any, onClose: () => void }) => {
  if (!exam) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 line-clamp-1 pr-4">{exam.institution}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Status & ID Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider ${exam.statusColor}`}>
              {exam.status}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap size={14} /> Cargos/Escolaridade
              </span>
              <p className="text-sm font-medium text-slate-700">{exam.role}</p>
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPinIcon size={14} /> Localidade
              </span>
              <p className="text-sm font-medium text-slate-700">{exam.location}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CalendarIcon size={14} /> Período/Validade
              </span>
              <p className="text-sm font-medium text-slate-700">{exam.deadline}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign size={14} /> Remuneração / Taxa
              </span>
              <p className="text-sm font-medium text-slate-700">{exam.salary}</p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 p-6 flex flex-col sm:flex-row items-center justify-end gap-3 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Fechar
          </button>
          
          <a 
            href={exam.link || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
          >
            Ver Edital Oficial <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

const FeaturedSection = ({ exams, onExamClick }: { exams: any[], onExamClick: (exam: any) => void }) => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Concursos Disponíveis</h2>
          <p className="text-slate-500 mt-2 font-medium text-lg">Encontre as melhores oportunidades que combinam com o seu perfil.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exams.length > 0 ? (
          exams.map(exam => (
            <ExamCard key={exam.id} exam={exam} onClick={onExamClick} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-700 mb-2">Nenhum concurso encontrado</h3>
            <p className="text-slate-500">Tente ajustar os filtros da sua busca para encontrar mais resultados.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Building2 size={24} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">ConcursoLink</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400 font-medium">
            Sua plataforma definitiva para acompanhar editais, provas e resultados dos principais concursos públicos no Brasil.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide">Plataforma</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Como Funciona</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Planos Premium</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Simulados</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">App Mobile</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide">Suporte</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Central de Ajuda</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Contato</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacidade</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide">Newsletter</h4>
          <p className="text-sm text-slate-400 mb-4 font-medium">Receba alertas de novos editais no seu e-mail.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              className="bg-slate-800 border border-slate-700 rounded-lg text-sm w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder:text-slate-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors font-bold">
              Assinar
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500 font-medium">
          © 2026 ConcursoLink. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
            <span className="text-xs font-bold text-slate-400">IN</span>
          </div>
          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
            <span className="text-xs font-bold text-slate-400">TW</span>
          </div>
          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
            <span className="text-xs font-bold text-slate-400">FB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [exams, setExams] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedExam, setSelectedExam] = React.useState<any | null>(null);

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (selectedExam) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedExam]);

  const fetchExams = async (filters: any = {}) => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const searchParams = new URLSearchParams();
      
      if (filters.escolaridade) {
        searchParams.append('escolaridade', filters.escolaridade);
      }
      if (filters.estado) {
        searchParams.append('estado', filters.estado);
      }
      if (filters.data_abertura) {
        searchParams.append('data_abertura', filters.data_abertura);
      }
      if (filters.taxa_inscricao) {
        searchParams.append('taxa_inscricao', filters.taxa_inscricao);
      }
      
      const queryString = searchParams.toString();
      const url = `${apiUrl}/concursos${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (result && result.data && result.data.length > 0) {
        const apiExams = result.data.map(mapApiDataToExam);
        setExams(apiExams);
      } else {
        setExams([]);
      }
    } catch (error) {
      console.error("Erro ao buscar concursos: ", error);
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <main>
        <Hero />
        <SearchWidget onSearch={fetchExams} />
        {loading ? (
          <div className="py-16 text-center text-slate-500 font-bold">Carregando concursos...</div>
        ) : (
          <FeaturedSection exams={exams} onExamClick={setSelectedExam} />
        )}
      </main>
      <Footer />
      {selectedExam && (
        <ExamModal 
          exam={selectedExam} 
          onClose={() => setSelectedExam(null)} 
        />
      )}
    </div>
  );
}
