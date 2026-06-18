import type { Translation } from './en';

const es: Translation = {
  meta: {
    role: 'Ingeniero Frontend Senior',
    description:
      'Ingeniero Frontend Senior dedicado a crear interfaces web rápidas y accesibles. Trayectoria comprobada en el escalado de sistemas frontend y la entrega de productos.',
    hero: 'Donde el rigor de ingeniería se encuentra con la intuición de diseño — construyendo sistemas frontend que escalan con los equipos detrás de ellos.',
    footer: `Codificado en <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a>. Construido con <a href="https://astro.build/" target="_blank">Astro</a> y <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>, desplegado a un VPS privado con <a href="https://github.com/features/actions" target="_blank">GitHub Actions</a>. Todo el texto esta configurado con el typeface <a href="https://fonts.google.com/specimen/Google+Sans+Flex" target="_blank">Google Sans Flex</a>.`,
    cv: 'Tomas_Hein_Ingeniero_Frontend_Senior_CV_ES.pdf',
  },
  locale: {
    name: {
      en: 'Inglés',
      es: 'Español',
    },
    banner: {
      message: 'Esta página está disponible en',
      switchTo: 'Cambiar a',
      stayIn: 'Permanecer en',
    },
    selector: {
      group: 'Idioma del sitio',
    },
  },
  theme: {
    group: 'Preferencia de tema',
    light: 'Claro',
    dark: 'Oscuro',
    system: 'Sistema',
  },
  navigation: {
    navLabel: 'Secciones de la página',
    scrollTop: 'Volver al inicio',
  },
  social: {
    list: 'Enlaces sociales',
    contact: 'Contacto',
  },
  contact: {
    title: 'Contacto',
    closeLabel: 'Cerrar formulario de contacto',
    description: 'Dejame una linea sobre oportunidades de trabajo o colaboraciones.',
    name: 'Nombre Completo',
    email: 'Correo Electronico',
    subject: 'Asunto (Opcional)',
    message: 'Mensaje',
    submit: 'Enviar',
    close: 'Cerrar',
  },
  date: {
    year: { one: 'año', other: 'años' },
    month: { one: 'mes', other: 'meses' },
    lessThanAMonth: 'menos de un mes',
    present: 'Presente',
    soFar: 'hasta la fecha',
    for: 'durante',
  },
  error: {
    notFound: {
      code: '404',
      title: 'Página no encontrada',
      message: 'La página que buscas no existe.',
      home: 'Ir a la página de inicio',
      navLabel: 'Volver al inicio',
    },
  },
  section: {
    profile: {
      id: 'perfil',
      title: 'Perfil',
      content: [
        'El desarrollo frontend ocupa un lugar interesante — lo suficientemente cerca del diseño como para preocuparse profundamente por cómo se ven y se sienten las cosas, lo suficientemente cerca de la infraestructura como para entender por qué se rompen. Ese punto intermedio es donde siempre he trabajado mejor.',
        'Mi camino en este campo no fue convencional. Una base en diseño gráfico y digital, combinada con años de aprendizaje autodidacta, formó una manera de trabajar difícil de encasillar. Pienso en <strong>sistemas</strong> — tokens, contratos, APIs de componentes, límites de equipo — pero también noto cuando una transición se siente mal o un layout pierde su ritmo en un breakpoint incómodo. Ambas cosas importan, y tratarlas como preocupaciones separadas es generalmente donde todo empieza a fallar.',
        'Con el tiempo eso se ha traducido en una fuerte inclinación hacia el trabajo que se encuentra en la intersección de la <strong>calidad de ingeniería y la experiencia de producto</strong>: sistemas de diseño que los equipos realmente quieren usar, arquitecturas que dan a los squads espacio para moverse de forma independiente, interfaces que se mantienen bajo condiciones reales. Más recientemente, hacia cómo las herramientas inteligentes pueden elevar silenciosamente el estándar de todo — calidad de código, accesibilidad, cobertura de tests — sin añadir fricción a las personas que escriben el código.',
        'Me importa el oficio. Construir cosas que sean <strong>fáciles de heredar</strong>, honestas en su complejidad, y genuinamente útiles para la persona al otro lado de la pantalla.',
      ],
    },
    featured: {
      id: 'destacado',
      title: 'Destacado',
    },
    experience: {
      id: 'experiencia',
      title: 'Experiencia',
      early: {
        title: 'Carrera Temprana',
        company: 'Varias Empresas',
        location: 'Santiago, Chile',
        prior: 'Antes de',
        content:
          'Desarrollo de sitios web y productos digitales con WordPress, PHP, jQuery y JavaScript vanilla para clientes de distintas industrias.',
        tags: ['WordPress', 'PHP', 'Javascript', 'jQuery'],
      },
      link: {
        label: 'Vea el cv/currículum completo en formato PDF. Se abrirá en una nueva pestaña.',
        text: 'Ver CV/Currículum Completo',
      },
    },
    skills: {
      id: 'habilidades',
      title: 'Habilidades',
    },
  },
  skills: {
    frontend: 'Desarrollo Frontend',
    react: 'React',
    typescript: 'Typescript',
    nextjs: 'Next.js',
    accessibility: 'Accesibilidad Web',
    performance: 'Rendimiento Web',
    design: 'Sistemas de Diseño',
  },
};

export default es;
