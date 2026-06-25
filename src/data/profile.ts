export const profile = {
  name: 'JJ Heffernan',
  tagline: 'Systems Engineer · Software Developer · Mechanical Designer',
  headline: 'Animal Garage dev hub — a crowded workbench of repos, orgs, and experiments.',
  bio: `Mechanical engineer (EIT) turned full-stack builder with years of hands-on coding across embedded systems, cloud backends, data pipelines, and interactive 3D. Currently shipping at Animal Garage — a Heff.industries company — while pushing into Rust, React Three Fiber, Blender Python, and gRPC. For the polished personal site, head to my Astro portfolio.`,
  highlights: [
    "B.S. Mechanical Engineering · EIT certified 2022",
    "Zip Code Wilmington Data Engineering Cohort 3.1",
    "Animal Garage · Heff.industries",
    "Home automation, 3D printing, and embedded side projects",
  ],
  email: 'jjcodes@icloud.com',
  github: 'https://github.com/jjheffernan',
  linkedin: 'https://www.linkedin.com/in/jjheffernan',
  portfolio: {
    site: 'https://jjheffernan.netlify.app/',
    repo: 'https://github.com/jjheffernan/cosmic-themes-starter',
    label: 'jjheffernan.netlify.app',
  },
}

export type PublicSite = {
  title: string
  description: string
  url: string
  domain: string
  tags: string[]
}

export const publicSites: PublicSite[] = [
  {
    title: 'Personal Portfolio',
    description:
      'Primary personal site — Astro-based portfolio built from the Cosmic Themes starter, deployed on Netlify.',
    url: 'https://jjheffernan.netlify.app/',
    domain: 'jjheffernan.netlify.app',
    tags: ['Portfolio', 'Astro', 'Netlify'],
  },
  {
    title: 'Heff.world',
    description:
      'Professional consulting hub — web engineering, embedded systems, mechanical design, and client work under heff.industries.',
    url: 'https://heff.world/',
    domain: 'heff.world',
    tags: ['Consulting', 'Astro', 'Business'],
  },
  {
    title: 'jheff.media',
    description:
      'Automotive social landing page built with Rust and Yew — a showcase for car-culture content and community links.',
    url: 'https://jheff.media/',
    domain: 'jheff.media',
    tags: ['Rust', 'Yew', 'Automotive'],
  },
  {
    title: 'GitHub',
    description:
      '80+ public repositories spanning Django apps, Rust tooling, Arduino automation, data engineering labs, and more.',
    url: 'https://github.com/jjheffernan',
    domain: 'github.com/jjheffernan',
    tags: ['Open Source', 'Code'],
  },
  {
    title: 'LinkedIn',
    description: 'Professional profile — engineering background, consulting, and industry connections.',
    url: 'https://www.linkedin.com/in/jjheffernan',
    domain: 'linkedin.com/in/jjheffernan',
    tags: ['Professional', 'Network'],
  },
]

export type SkillCategory = {
  id: string
  title: string
  color: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Front End',
    color: '#5eead4',
    skills: ['React', 'TypeScript', 'Three.js', 'R3F', 'HTML/CSS', 'Tkinter'],
  },
  {
    id: 'backend',
    title: 'Back End',
    color: '#818cf8',
    skills: ['Python', 'Django', 'Rust', 'gRPC', 'REST APIs', 'Shell'],
  },
  {
    id: 'data',
    title: 'Data Engineering',
    color: '#fbbf24',
    skills: ['PySpark', 'Jupyter', 'ETL Pipelines', 'Pandas', 'SQL', 'Web Scraping'],
  },
  {
    id: 'mechanical',
    title: 'Mechanical & Embedded',
    color: '#f472b6',
    skills: ['SolidWorks', 'Fusion 360', 'Arduino', 'Raspberry Pi', 'MATLAB', '3D Printing'],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    color: '#34d399',
    skills: ['Git', 'Docker', 'Blender', 'bpy', 'CI/CD', 'GitHub Actions'],
  },
]

export type Project = {
  title: string
  description: string
  tech: string[]
  url: string
  highlight?: boolean
}

export const projects: Project[] = [
  {
    title: 'Django Auto Forum',
    description: 'Cloud-hosted enthusiast forum with Django, media storage, and community features.',
    tech: ['Python', 'Django', 'Cloud'],
    url: 'https://github.com/jjheffernan/Django-Auto-Forum',
    highlight: true,
  },
  {
    title: 'jheff.media-site',
    description: 'Automotive social landing page built with Rust for performance and reliability.',
    tech: ['Rust', 'Web'],
    url: 'https://github.com/jjheffernan/jheff.media-site',
    highlight: true,
  },
  {
    title: 'RustPi Monorepo',
    description: 'Collection of Rust projects targeting Raspberry Pi — systems programming on edge hardware.',
    tech: ['Rust', 'Raspberry Pi', 'Embedded'],
    url: 'https://github.com/jjheffernan/RustPi-Repo',
    highlight: true,
  },
  {
    title: 'Arduino Projects',
    description: 'Monolithic repo of home automation, 3D printer integrations, and microcontroller experiments.',
    tech: ['Arduino', 'C++', 'IoT'],
    url: 'https://github.com/jjheffernan/arduino-projects',
    highlight: true,
  },
]

export type ReferenceProject = {
  title: string
  description: string
  context: string
  tech: string[]
  url: string
}

export const referenceProjects: ReferenceProject[] = [
  {
    title: 'SimpleGUIChat',
    description: 'Pop-out Tkinter chat widget for website messaging integration.',
    context:
      'Built as a lightweight desktop companion to web apps — explores cross-surface UI patterns and Python desktop tooling without a heavy Electron footprint.',
    tech: ['Python', 'Tkinter'],
    url: 'https://github.com/jjheffernan/SimpleGUIChat',
  },
  {
    title: 'Notification Rake',
    description: 'Vehicle availability alerts powered by popular automotive web API datasets.',
    context:
      'A practical automation script born from car-shopping frustration. Pulls live listing data, filters against user criteria, and pushes notifications when a match appears.',
    tech: ['Python', 'APIs', 'Automation'],
    url: 'https://github.com/jjheffernan/Notification-Rake-Project',
  },
  {
    title: 'Spool Static Calcs',
    description: 'MATLAB suite for static force analysis in racing spool and drivetrain systems.',
    context:
      'Mechanical engineering work with Lehigh Racing — models static loads through the spool and drivetrain to inform structural decisions on the car. An unfinished but instructive analysis toolchain.',
    tech: ['MATLAB', 'Mechanical'],
    url: 'https://github.com/LehighRacing/spool-static-calcs',
  },
  {
    title: 'PySpark Local Setup',
    description: 'Reference setup for running PySpark on a local Mac development environment.',
    context:
      'Documents the friction points of getting PySpark running natively on macOS — useful as a starting point for local data engineering experiments before moving to a cluster.',
    tech: ['PySpark', 'Jupyter'],
    url: 'https://github.com/jjheffernan/PySpark-JupyterTest',
  },
  {
    title: 'Zip Code Wilmington Labs',
    description: 'Overview repository spanning 70+ data engineering cohort labs.',
    context:
      'Consolidated archive from the Zip Code Wilmington Data 3.1 cohort — shell scripting, ETL exercises, SQL, Python fundamentals, and pipeline patterns across an intensive bootcamp curriculum.',
    tech: ['Shell', 'Python', 'SQL', 'ETL'],
    url: 'https://github.com/jjheffernan/ZCW-D3.1-Labs',
  },
  {
    title: 'Python Fundamentals Pip Module',
    description: 'Packaged Python lab exercises distributed as an installable pip module.',
    context:
      'Early exploration of Python packaging — turning lab assignments into a reusable, installable module rather than loose scripts. Good foundation work for understanding setuptools and module distribution.',
    tech: ['Python', 'pip', 'packaging'],
    url: 'https://github.com/jjheffernan/PythonFundamentals.Labs.PipModule',
  },
  {
    title: 'cosmic-themes-starter',
    description: 'Personal portfolio site — Astro rewrite of the Cosmic Themes kitchen-sink starter.',
    context:
      'The actual portfolio lives here and at jjheffernan.netlify.app. This github.io site is deliberately a separate dev hub — a 3D index of repos and orgs, not a second portfolio.',
    tech: ['Astro', 'Netlify', 'Cosmic Themes'],
    url: 'https://github.com/jjheffernan/cosmic-themes-starter',
  },
  {
    title: 'jjheffernan.github.io',
    description: 'This dev hub — scroll-driven 3D index of projects, orgs, and public sites.',
    context:
      'Open-source GitHub Pages experiment in React Three Fiber. Useful for exploring code and links; for the polished personal site, use cosmic-themes-starter instead.',
    tech: ['React', 'R3F', 'TypeScript', 'Vite'],
    url: 'https://github.com/jjheffernan/jjheffernan.github.io',
  },
]
