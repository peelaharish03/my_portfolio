import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  readonly profile = {
    name: 'PEELA HARISH',
    title: 'Flutter Developer',
    location: 'Hyderabad, India',
    roles: ['Mobile App Developer', 'React Native Developer'],
    email: 'Harishpeela03@gmail.com',
    phone: '+91 9705047662',
    linkedin: {
      label: 'linkedin.com/in/harish-peela-5a4256236',
      url: 'https://linkedin.com/in/harish-peela-5a4256236'
    }
  };

  readonly summary =
    'Results-driven Mobile Application Developer with 4+ years of experience delivering cross-platform mobile and web applications using Flutter, React Native, and React.js. Successfully led and contributed to 8 production-grade projects across food delivery, e-commerce, healthcare, ed-tech, parking, and business management domains. Consistently delivered projects on time with 100% client requirement coverage, leading teams of up to 6 members and reducing bug counts by up to 50% across multiple releases. Experienced in app deployment on Android and iOS, REST API integration, and payment gateway implementation.';

  readonly skills: { group: string; items: string[] }[] = [
    { group: 'Mobile Frameworks', items: ['Flutter', 'React Native'] },
    { group: 'Languages', items: ['Dart', 'JavaScript'] },
    { group: 'Integrations', items: ['REST API', 'Payment Gateway'] },
    { group: 'Web Technologies', items: ['React.js', 'HTML', 'CSS'] },
    { group: 'Tools & Platforms', items: ['Git', 'GitHub', 'GitLab', 'Firebase', 'VS Code', 'Xcode'] },
    {
      group: 'Other',
      items: ['App Deployment (Android & iOS)', 'Material Design', 'State Management']
    }
  ];

  readonly experience: {
    role: string;
    company: string;
    playStoreUrl?: string;
    period: string;
    stack: string;
    team: string;
    description: string;
    achievements: string[];
  }[] = [
    {
      role: 'Lead Developer',
      company: 'LocalBasketHD',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.localbaskethd&pcampaignid=web_share',
      period: 'Dec 2025 – Present',
      stack: 'HLT Solutions | Flutter & Dart',
      team: 'Team: 6 Members',
      description:
        'Multi-category food and grocery delivery app for food, special items, fresh meat, and self-order functionality.',
      achievements: [
        'Architected and developed core ordering modules in Flutter, reducing feature build time by ~30% through reusable component design.',
        'Implemented REST API integrations for real-time order tracking and inventory sync, improving data accuracy by ~25%.',
        'Managed full app deployment pipeline on Android and iOS, achieving 0 critical post-release bugs in the first production release.',
        'Delivered continuous feature customization and maintenance, maintaining app stability at 99%+ uptime across user sessions.'
      ]
    },
    {
      role: 'Lead Developer',
      company: 'EATO',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.hlt.eato&pcampaignid=web_share',
      period: 'Jun 2025 – Nov 2025',
      stack: 'HLT Solutions | Flutter & Dart',
      team: 'Team: 4 Members',
      description:
        'Restaurant delivery and dine-in ordering app enabling both online and table-based food ordering.',
      achievements: [
        'Developed dine-in and online ordering modules, cutting order flow completion time by ~20% through optimized UI navigation.',
        'Built 10+ reusable UI screens for order management workflows, ensuring design consistency throughout the app.',
        'Reduced post-launch bug count by ~40% through structured QA testing and pre-release code reviews.',
        'Implemented business logic enhancements that improved order accuracy by ~15% and boosted user satisfaction.'
      ]
    },
    {
      role: 'Lead Developer',
      company: 'Assistify',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=jr.assistify.starter&pcampaignid=web_share',
      period: 'Apr 2025 – May 2025',
      stack: 'HLT Solutions | Flutter & Dart',
      team: 'Team: 4 Members',
      description:
        'Business management app for customer management, WhatsApp receipt sharing, bill printing, and monthly reporting.',
      achievements: [
        'Delivered all core modules within a 2-month sprint, meeting 100% of client-defined milestones on time.',
        'Built customer and billing workflows, reducing manual business tracking effort by ~35% for end users.',
        'Integrated WhatsApp receipt sharing and bill printing features, improving client communication efficiency by ~50%.',
        'Achieved application stability improvements of ~30% through rigorous performance testing and bug resolution.'
      ]
    },
    {
      role: 'Lead Developer',
      company: 'GetSpot',
      period: 'Dec 2024 – Mar 2025',
      stack: 'Dexalon, Netherlands | Flutter & Dart',
      team: 'Team: 3 Members',
      description:
        'Parking slot booking app enabling property owners to list, manage, and rent out parking spaces.',
      achievements: [
        'Led end-to-end Flutter development, delivering the full application within a 4-month timeline with 0% scope creep.',
        'Developed 8+ responsive screens for property onboarding and parking booking workflows.',
        'Reduced UI rendering issues by ~45% through optimized widget tree structuring and state management.',
        'Ensured 100% requirement coverage across all deliverables for an international client in Netherlands.'
      ]
    },
    {
      role: 'Senior Developer',
      company: 'Kovela',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.kovela&pcampaignid=web_share',
      period: 'Sep 2023 – Nov 2024',
      stack: 'Client: A Team of Doctors, USA | React.js, Flutter & Dart',
      team: 'Team: 6 Members',
      description:
        'Devotional platform for temple discovery, darshan ticket booking, and donations on both web and mobile.',
      achievements: [
        'Designed and delivered both web (React.js) and mobile (Flutter) versions, reducing cross-platform development effort by ~30% through shared business logic.',
        'Integrated booking and donation payment workflows, achieving a checkout experience with less than 2% transaction error rate.',
        'Improved screen and page load performance by ~25% through code optimization and lazy loading techniques.',
        'Coordinated with a 6-member cross-functional team across a 14-month project lifecycle, meeting 100% of sprint deadlines.'
      ]
    },
    {
      role: 'Technology Analyst',
      company: 'FanFun',
      period: 'Dec 2022 – Aug 2023',
      stack: 'Juvarya Technologies | React Native & Material Design',
      team: 'Team: 2 Members',
      description:
        'Local community announcement platform for posting updates and event information to nearby users.',
      achievements: [
        'Developed 15+ app screens using React Native with Material Design standards, ensuring 100% UI consistency.',
        'Implemented real-time announcement and event update logic, reducing post submission errors by ~30%.',
        'Delivered 3 major feature releases within the 9-month project duration with 0 critical production incidents.',
        'Reduced UI bug backlog by ~50% through proactive testing and issue resolution during development cycles.'
      ]
    },
    {
      role: 'Application Lead',
      company: 'SKILLRAT',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.skill_rat&pcampaignid=web_share',
      period: 'Jul 2022 – Nov 2022',
      stack: 'Juvarya, India | React Native & SQL Server',
      team: 'Team: 2 Members',
      description:
        'E-learning marketplace enabling users to buy and sell skill-based learning services.',
      achievements: [
        'Led all development activities for a 2-member team, delivering the full application within a 5-month timeline.',
        'Developed 12+ app screens and end-to-end application workflows in React Native.',
        'Improved app performance by ~20% through optimized component rendering and SQL query tuning.',
        'Achieved 100% feature coverage against client specifications with structured testing and client sign-off.'
      ]
    },
    {
      role: 'UI Developer',
      company: 'Local Basket',
      period: 'Feb 2022 – Jun 2022',
      stack: 'Juvarya, India | React Native & JavaScript',
      team: 'Team: 4 Members',
      description:
        'Grocery delivery application for local food and grocery ordering, similar to Swiggy and Zomato.',
      achievements: [
        'Built 10+ reusable UI components in React Native, reducing screen development time by ~25%.',
        'Delivered screen customizations and feature enhancements with a 95% on-time task completion rate.',
        'Reduced UI-related bug count by ~35% through systematic testing and pre-review processes.',
        'Contributed to a smooth app launch as part of a 4-member team, meeting 100% of delivery milestones.'
      ]
    }
  ];

  readonly highlights: string[] = [
    '4+ years of mobile and frontend development experience',
    '8 projects delivered across 6 industries',
    '3 countries served: India, USA, Netherlands',
    '2 frameworks mastered at lead level: Flutter & React Native',
    'Average bug reduction of ~40% across all projects',
    '100% on-time delivery record across all 8 engagements',
    'Team lead in 5 out of 8 projects, teams of 2–6 members',
    'App stability at 99%+ uptime across production deployments'
  ];

  readonly education: { level: string; detail: string }[] = [
    { level: 'B.Sc. Computer Science', detail: 'ARNI University' },
    { level: 'Intermediate (MPC)', detail: 'Sri Chaitanya Jr. College, Vijayawada' },
    { level: 'SSC', detail: 'J.M.J High School, Anakapalli' }
  ];

  ngAfterViewInit(): void {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -10% 0px' }
    );

    for (const el of elements) observer.observe(el);
  }
}
