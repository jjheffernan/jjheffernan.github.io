export type Discovery = {
  id: string
  title: string
  subtitle: string
  body: string
  links?: { label: string; url: string }[]
  tags?: string[]
}

export const discoveries: Record<string, Discovery> = {
  core: {
    id: 'core',
    title: 'Workbench Hub',
    subtitle: 'Animal Garage · Dev HQ',
    body: 'The center of the bench — dual monitors, a laptop running the latest experiment, and a desk lamp burning late. This github.io page is the cluttered workshop view of the same brain that ships on heff.world and jjheffernan.netlify.app. Portfolio lives elsewhere; this is where projects pile up.',
    links: [
      { label: 'Portfolio site', url: 'https://jjheffernan.netlify.app/' },
      { label: 'cosmic-themes-starter', url: 'https://github.com/jjheffernan/cosmic-themes-starter' },
    ],
    tags: ['Meta', 'R3F', 'Dev Hub'],
  },
  frontend: {
    id: 'frontend',
    title: 'Front End — Hidden Stack',
    subtitle: 'Beyond the obvious',
    body: 'Started with Tkinter desktop UIs and static HTML, then moved into React ecosystems and WebGL. R3F is a current obsession — this entire interaction layer is the proof. Also comfortable bridging into Astro/Tailwind for production sites that should not live inside a canvas.',
    tags: ['React', 'R3F', 'Astro'],
  },
  backend: {
    id: 'backend',
    title: 'Back End — War Stories',
    subtitle: 'Servers, scripts, systems',
    body: 'Django capstone forums, Rust Actix/Yew stacks, and a growing gRPC curiosity. Many backends started as shell glue scripts that outgrew their notebooks. Preference: boring deploy paths, clear boundaries, and APIs that embedded firmware can actually call.',
    tags: ['Django', 'Rust', 'gRPC'],
  },
  data: {
    id: 'data',
    title: 'Data Engineering — Bootcamp to Production',
    subtitle: 'Zip Code Wilmington roots',
    body: 'Cohort 3.1 drilled ETL, SQL, and PySpark until pipelines felt natural. Local Mac PySpark setup docs exist because the tooling fights you before the data does. Still reach for Jupyter for exploration, then harden into scripts or services.',
    links: [
      { label: 'ZCW Labs archive', url: 'https://github.com/jjheffernan/ZCW-D3.1-Labs' },
    ],
    tags: ['PySpark', 'ETL', 'ZCW 3.1'],
  },
  mechanical: {
    id: 'mechanical',
    title: 'Mechanical & Embedded',
    subtitle: 'Hardware in the loop',
    body: 'Lehigh Racing taught DAQ, harness design, and MATLAB force analysis on real vehicle subsystems. Side projects span Arduino home automation, 3D printer mods, and Raspberry Pi Rust experiments. CAD work happens in SolidWorks/Fusion before anything gets printed or machined.',
    links: [
      { label: 'LehighRacing org', url: 'https://github.com/LehighRacing' },
      { label: 'arduino-projects', url: 'https://github.com/jjheffernan/arduino-projects' },
    ],
    tags: ['CAD', 'DAQ', 'Arduino'],
  },
  tools: {
    id: 'tools',
    title: 'Tools & Platforms',
    subtitle: 'How things get shipped',
    body: 'GitHub Actions deploy this site. Docker shows up in Saleor/e-commerce monorepos. Blender Python (bpy) is on the learning list for procedural 3D assets. Self-hosted infra curiosity: Proxmox, Coolify, k3s — documented more on heff.world than here.',
    links: [
      { label: 'heff.world', url: 'https://heff.world/' },
    ],
    tags: ['CI/CD', 'Docker', 'Blender'],
  },
  'project-0': {
    id: 'project-0',
    title: 'Django Auto Forum',
    subtitle: 'Capstone depth',
    body: 'Zip Code Wilmington capstone with S3 media hosting, multi-app Django structure, and a Heroku deployment path. Built for auto enthusiasts who need durable threads and photo-heavy posts — forum UX before forum SaaS was trendy.',
    links: [
      { label: 'Repository', url: 'https://github.com/jjheffernan/Django-Auto-Forum' },
    ],
    tags: ['Django', 'S3', 'Heroku'],
  },
  'project-1': {
    id: 'project-1',
    title: 'jheff.media-site',
    subtitle: 'Rust fullstack notes',
    body: 'Forked from a Yew + Actix fullstack boilerplate and bent toward automotive social landing pages. JWT auth, MongoDB, CSS-in-Rust — a deliberate contrast to the Python/Django comfort zone.',
    links: [
      { label: 'Repository', url: 'https://github.com/jjheffernan/jheff.media-site' },
      { label: 'Live (when up)', url: 'https://jheff.media/' },
    ],
    tags: ['Rust', 'Yew', 'Actix'],
  },
  'project-2': {
    id: 'project-2',
    title: 'RustPi Monorepo',
    subtitle: 'Edge experiments',
    body: 'Monorepo boundary for running Rust on Raspberry Pi hardware — systems programming where deploy targets are GPIO pins and SD cards, not containers in the cloud.',
    links: [
      { label: 'Repository', url: 'https://github.com/jjheffernan/RustPi-Repo' },
    ],
    tags: ['Rust', 'Raspberry Pi'],
  },
  'project-3': {
    id: 'project-3',
    title: 'Arduino Projects',
    subtitle: 'Monolithic maker repo',
    body: 'One repo to rule home automation sketches, 3D printer integrations, and microcontroller experiments. Deliberately monolithic — side projects should be easy to grep, not spread across dozens of orphaned repos.',
    links: [
      { label: 'Repository', url: 'https://github.com/jjheffernan/arduino-projects' },
    ],
    tags: ['Arduino', 'IoT', 'Home'],
  },
}

export const discoveryIds = Object.keys(discoveries)

export function getDiscovery(id: string): Discovery | undefined {
  return discoveries[id]
}
