const en = {
  meta: {
    role: 'Senior Frontend Engineer',
    description:
      'Senior Frontend Engineer dedicated to crafting accessible, fast web interfaces. Proven track record of scaling frontend systems and driving product delivery.',
    hero: 'Where engineering rigour meets design intuition — building frontend systems that scale with the teams behind them.',
    footer: `Coded in <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a>. Built with <a href="https://astro.build/" target="_blank">Astro</a> and <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>, deployed to a private VPS with <a href="https://github.com/features/actions" target="_blank">GitHub Actions</a>. All text is set in the <a href="https://fonts.google.com/specimen/Google+Sans+Flex" target="_blank">Google Sans Flex</a> typeface.`,
    cv: 'Tomas_Hein_Senior_Frontend_Engineer_CV_EN.pdf',
  },
  locale: {
    name: {
      en: 'English',
      es: 'Spanish',
    },
    banner: {
      message: 'This page is also available in',
      switchTo: 'Change to',
      stayIn: 'Stay in',
    },
    selector: {
      group: 'Site language',
    },
  },
  theme: {
    group: 'Theme preference',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },
  navigation: {
    navLabel: 'Page sections',
    scrollTop: 'Scroll to top',
  },
  social: {
    list: 'Social links',
    contact: 'Contact',
  },
  contact: {
    title: 'Contact',
    closeLabel: 'Close contact form',
    description: 'Drop me a line about job opportunities or collaboration.',
    name: 'Full Name',
    email: 'Email Address',
    subject: 'Subject (Optional)',
    message: 'Message',
    submit: 'Send',
    close: 'Close',
  },
  date: {
    year: { one: 'year', other: 'years' },
    month: { one: 'month', other: 'months' },
    lessThanAMonth: 'less than a month',
    present: 'Present',
    soFar: 'to date',
    for: 'for',
  },
  error: {
    notFound: {
      code: '404',
      title: 'Page not found',
      message: "The page you're looking for doesn't exist.",
      home: 'Go to homepage',
      navLabel: 'Return home',
    },
  },
  section: {
    profile: {
      id: 'profile',
      title: 'Profile',
      content: [
        `Frontend engineering sits in an interesting place — close enough to design to care deeply about how things look and feel, close enough to infrastructure to understand why they break. That middle ground is where I've always worked best.`,
        `My path into this field wasn't conventional. A background in graphic and digital design, combined with years of self-directed learning, shaped an approach that's hard to fit into a single lane. I think in <strong>systems</strong> — tokens, contracts, component APIs, team boundaries — but I also notice when a transition feels off or a layout loses its rhythm at an awkward breakpoint. Both matter, and treating them as separate concerns is usually where things go wrong.`,
        `Over time that's translated into a strong pull toward work that sits at the intersection of <strong>engineering quality and product experience</strong>: design systems that teams actually want to use, architectures that give squads room to move independently, interfaces that hold up under real conditions. More recently, into how intelligent tooling can quietly raise the floor for everything — code quality, accessibility, test coverage — without adding friction to the people writing the code.`,
        'I care about the craft. About building things that are <strong>easy to inherit</strong>, honest in their complexity, and genuinely useful to the person on the other side of the screen.',
      ],
    },
    featured: {
      id: 'featured',
      title: 'Featured',
    },
    experience: {
      id: 'experience',
      title: 'Experience',
      early: {
        title: 'Early Career',
        company: 'Various Companies',
        location: 'Santiago, Chile',
        prior: 'Prior to',
        content:
          'Developed websites and digital products using WordPress, PHP, jQuery, and vanilla JavaScript for clients across multiple industries.',
        tags: ['WordPress', 'PHP', 'Javascript', 'jQuery'],
      },
      link: {
        label: 'View full cv/resume as a PDF. Opens in a new tab.',
        text: 'View Full CV/Resume',
      },
    },
    skills: {
      id: 'skills',
      title: 'Skills',
    },
  },
  skills: {
    frontend: 'Frontend Development',
    react: 'React',
    typescript: 'Typescript',
    nextjs: 'Next.js',
    accessibility: 'Web Accessibility',
    performance: 'Web Performance',
    design: 'Design Systems',
  },
};

export default en;

export type Translation = typeof en;
