import { AppDemo, FAQItem } from '../types';

export const APPS_DATA: AppDemo[] = [
  {
    id: 'profit-fitness',
    name: 'Profit Fitness',
    category: 'Salud & Bienestar',
    description: 'Aplicación fitness de alta fidelidad con seguimiento, progreso en tiempo real y planificación inteligente.',
    longDescription: 'Una plataforma completa que permite a entrenadores o marcas vender planes de entrenamiento personalizados, con calculadoras de macronutrientes dinámicas y tracking de marcas personales en tiempo real.',
    color: '#10B981', // Emerald
    gradient: 'from-emerald-500/20 to-teal-500/5',
    features: ['Generador de rutinas automático', 'Calculadora interactiva de macronutrientes', 'Gráficos de progreso visual de pesos', 'Base de datos de más de 120 ejercicios'],
    ctaText: 'Probar Simulador Fitness',
    demoUrl: 'https://profit-fitness.vercel.app'
  },
  {
    id: 'copa-family-2026',
    name: 'Copa Family 2026',
    category: 'Deportes & Eventos',
    description: 'Sistema interactivo para la gestión de torneos familiares o locales, resultados en vivo y tablas de posiciones.',
    longDescription: 'Olvídate de las hojas de cálculo. Un panel interactivo móvil donde los participantes registran puntajes de partidos, suben fotos, actualizan el fixture y calculan de forma automatizada quién va liderando el campeonato familiar.',
    color: '#3B82F6', // Blue
    gradient: 'from-blue-500/20 to-indigo-500/5',
    features: ['Cargar resultados instantáneos con puntaje interactivo', 'Cálculo de tabla de posiciones automático', 'Gestor de goleadores e incidencias de partidos', 'Compartir fixture mediante link web único'],
    ctaText: 'Ver Fixture Interactivo',
    demoUrl: 'https://copafamily.vercel.app'
  },
  {
    id: 'mundial-2026',
    name: 'Mundial 2026',
    category: 'Gamificación & Entretenimiento',
    description: 'Aplicación interactiva de pronósticos (prode/polla) para el Mundial 2026 con control dinámico y retos.',
    longDescription: 'El fútbol une al mundo y este producto genera tracción viral instantánea. Un completo fixture con simulador de octavos, cuartos y finales donde los usuarios retan a sus amigos adivinando los marcadores del torneo más grande.',
    color: '#F59E0B', // Amber
    gradient: 'from-amber-500/20 to-orange-500/5',
    features: ['Simulación automática de llaves (playoffs)', 'Grupos interactivos actualizados en tiempo real', 'Panel para crear ligas de amigos con código de invitación', 'Historial del rendimiento de tus predicciones'],
    ctaText: 'Simular Grupos del Mundial',
    demoUrl: 'https://mundial2026.vercel.app'
  },
  {
    id: 'pequenos-gourmets',
    name: 'Pequeños Gourmets',
    category: 'Educación & Crianza',
    description: 'Aplicación premium de planificación alimentaria infantil y recetas guiadas por edades para padres modernos.',
    longDescription: 'Un nicho altamente rentable y dispuesto a pagar. Los padres registran la edad de su bebé y acceden a un plan semanal estructurado (BLW/papillas), alertas de alérgenos comunes, listas de compras dinámicas y recetas fáciles.',
    color: '#EC4899', // Pink
    gradient: 'from-pink-500/20 to-purple-500/5',
    features: ['Menú semanal balanceado por pediatra (simulado)', 'Filtros interactivos de ingredientes y alérgenos', 'Generador automático de lista de supermercado', 'Guía de corte seguro e introducción de alimentos (BLW)'],
    ctaText: 'Probar Planificador de Comidas',
    demoUrl: 'https://pequenosgourmets.vercel.app'
  }
];

export const PROBLEM_COMPARISON = {
  left: {
    title: 'La Oferta Tradicional (Lo que todos venden)',
    description: 'Contenido estático de bajo valor percibido. Difícil de vender a más de $10 USD.',
    items: [
      { text: 'Ebook / PDF de 50 páginas que nadie lee', icon: 'file-text' },
      { text: 'Curso en video genérico de 6 horas aburridas', icon: 'video' },
      { text: 'Grupo de WhatsApp desorganizado y silencioso', icon: 'users' },
      { text: 'Información teórica sin aplicación práctica ni incentivos', icon: 'info' }
    ]
  },
  right: {
    title: 'La Oferta Premium (Tú en este Taller)',
    description: 'Herramientas interactivas listas para usar. Valor percibido multiplicado por 10x.',
    items: [
      { text: 'Curso/PDF + Aplicación interactiva de soporte', icon: 'sparkles', highlighted: true },
      { text: 'Herramienta propia de cálculo y seguimiento personalizado', icon: 'smartphone', highlighted: true },
      { text: 'Experiencia interactiva memorable para tu cliente habitual', icon: 'gamepad-2', highlighted: true },
      { text: 'Mayor retención, mejores testimonios y posibilidad de cobrar recurrente', icon: 'trending-up', highlighted: true }
    ]
  }
};

export const WHAT_YOU_WILL_LEARN = [
  {
    number: '01',
    title: 'Crear aplicaciones web',
    description: 'Aprenderás a estructurar bases de datos modulares, flujos lógicos y pantallas interactivas sin tirar una sola línea de código tradicional.'
  },
  {
    number: '02',
    title: 'Publicarlas en internet',
    description: 'Tendrás tu propio dominio personalizado y servidores listos con certificados SSL gratuitos con un solo clic.'
  },
  {
    number: '03',
    title: 'Complementar productos',
    description: 'Usa las apps como bono de tus infoproductos para duplicar el precio de tus cursos o ebooks actuales incrementando el valor percibido.'
  },
  {
    number: '04',
    title: 'Adaptarlas a tu nicho',
    description: 'Ya sea fitness, cocina, negocios locales, finanzas o eventos, sabrás cómo conceptualizar y dar vida a ideas en menos de 48 horas.'
  },
  {
    number: '05',
    title: 'Vender aplicaciones directas',
    description: 'Aprende el modelo de negocio "Micro-SaaS" y vende el acceso a tus herramientas mediante suscripciones mensuales recurrentes.'
  },
  {
    number: '06',
    title: 'Crear anuncios con IA',
    description: 'Aprende a redactar copys persuasivos y generar creativos de alta conversión en segundos usando herramientas multimedia con IA.'
  },
  {
    number: '07',
    title: 'Meta Ads sin seguidores',
    description: 'Descubre cómo configurar campañas de $2 a $5 USD diarios para conseguir clientes fríos directo a tu checkout automatizado.'
  },
  {
    number: '08',
    title: 'Escalar y vender en piloto',
    description: 'Integra pasarelas de pago y automatiza la entrega instantánea de accesos mientras te dedicas a mejorar tu estrategia.'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: '¿De verdad no necesito saber programar?',
    answer: 'De verdad. El 100% del taller se desarrolla utilizando plataformas modernas de No-Code guiadas por Inteligencia Artificial. Aprenderás a "pensar como programador" y dar instrucciones claras para que la IA ensamble y configure la lógica por ti. Si sabes redactar un correo o chatear por WhatsApp, puedes hacerlo.',
    category: 'Requisitos'
  },
  {
    question: '¿Necesito alguna experiencia técnica previa?',
    answer: 'Ninguna. Empezamos desde absoluto cero: desde cómo crear tu cuenta en la herramienta gratuita de IA hasta la publicación internacional. Está diseñado para diseñadores, creadores de contenido, emprendedores o cualquier persona con curiosidad digital.',
    category: 'Requisitos'
  },
  {
    question: '¿Podré vender legalmente las aplicaciones que cree?',
    answer: '¡Por supuesto! Todo lo que construyas durante el taller y posteriormente es 100% de tu propiedad. Puedes vender licencias mensuales, ofrecerlas como bonus premium para tus proyectos existentes, o vendérselas directamente a clientes por miles de dólares.',
    category: 'Negocio'
  },
  {
    question: '¿Qué pasa si no puedo asistir en vivo al taller?',
    answer: 'No te preocupes. Al reservar tu cupo tienes acceso garantizado de por vida al portal de alumnos, donde se subirán las grabaciones HD completas del evento, divididas paso a paso por módulos en menos de 24 horas de finalizar el directo.',
    category: 'Acceso'
  },
  {
    question: '¿Las herramientas que utilizaremos son de pago?',
    answer: 'Trabajaremos utilizando los planes gratuitos de herramientas de última generación. No requieres desembolsar dinero adicional para completar tus primeras 3 aplicaciones ni para publicarlas bajo un subdominio gratuito.',
    category: 'Costos'
  },
  {
    question: '¿Tendré soporte si me quedo atascado?',
    answer: 'Sí. A diferencia de cursos pregrabados donde estás solo, este taller incluye acceso a un canal privado de Discord de soporte técnico directo durante 15 días tras finalizar la sesión en vivo. Nuestro equipo te ayudará a resolver cualquier duda lógica o de configuración.',
    category: 'Acceso'
  }
];
