export type OrgRepo = {
  name: string
  description: string
  language?: string
  url: string
}

export type Organization = {
  name: string
  slug: string
  description: string
  url: string
  color: string
  repos: OrgRepo[]
}

export const organizations: Organization[] = [
  {
    name: 'heff-industries',
    slug: 'heff-industries',
    description:
      'Parent organization for Heff.industries — consulting, Animal Garage, and automotive knowledge work.',
    url: 'https://github.com/heff-industries',
    color: '#5eead4',
    repos: [
      {
        name: 'auto-vault',
        description:
          'Markdown vault for automotive projects, enhanced via Obsidian with plugin-driven workflows.',
        url: 'https://github.com/heff-industries/auto-vault',
      },
    ],
  },
  {
    name: 'LehighRacing',
    slug: 'LehighRacing',
    description:
      'Lehigh University racing team — electrical systems, data acquisition, vehicle dynamics, and mechanical analysis.',
    url: 'https://github.com/LehighRacing',
    color: '#f472b6',
    repos: [
      {
        name: 'electrical',
        description: 'Electronic hardware design for the race car.',
        language: 'Shell',
        url: 'https://github.com/LehighRacing/electrical',
      },
      {
        name: 'dyno',
        description: 'Supporting hardware and software for the team dyno.',
        language: 'Python',
        url: 'https://github.com/LehighRacing/dyno',
      },
      {
        name: 'daq',
        description: 'Data acquisition software created by the Lehigh Racing team.',
        url: 'https://github.com/LehighRacing/daq',
      },
      {
        name: 'daqBoards',
        description: 'Firmware for running the DAQ wheel boards.',
        language: 'C++',
        url: 'https://github.com/LehighRacing/daqBoards',
      },
      {
        name: 'daq_can_cleanup',
        description: 'Convert DAQ logs from Gollum into CSV files.',
        language: 'Python',
        url: 'https://github.com/LehighRacing/daq_can_cleanup',
      },
      {
        name: 'simulation',
        description: 'Vehicle dynamics simulation tooling.',
        url: 'https://github.com/LehighRacing/simulation',
      },
      {
        name: 'spool-static-calcs',
        description:
          'MATLAB suite for static force analysis in the spool and drivetrain. Unfinished.',
        language: 'MATLAB',
        url: 'https://github.com/LehighRacing/spool-static-calcs',
      },
      {
        name: 'harnessDiagram',
        description: 'Wiring harness documentation and diagrams.',
        language: 'Shell',
        url: 'https://github.com/LehighRacing/harnessDiagram',
      },
      {
        name: 'LR23-DAQ',
        description: '2023 season data acquisition codebase.',
        url: 'https://github.com/LehighRacing/LR23-DAQ',
      },
    ],
  },
  {
    name: 'ZCW-Data3-1-Zeta-1',
    slug: 'ZCW-Data3-1-Zeta-1',
    description:
      'Zip Code Wilmington Data Engineering Cohort 3.1 — Team Zeta collaborative repositories.',
    url: 'https://github.com/ZCW-Data3-1-Zeta-1',
    color: '#fbbf24',
    repos: [
      {
        name: 'PyCalc',
        description: 'Python-based calculator for terminal interactivity.',
        language: 'Python',
        url: 'https://github.com/ZCW-Data3-1-Zeta-1/PyCalc',
      },
    ],
  },
  {
    name: 'ZCW-Data-Zeta',
    slug: 'ZCW-Data-Zeta',
    description:
      'Zip Code Wilmington data cohort team organization — shared workspace for cohort projects.',
    url: 'https://github.com/ZCW-Data-Zeta',
    color: '#34d399',
    repos: [],
  },
  {
    name: 'ZC8-3-1-team1group3',
    slug: 'ZC8-3-1-team1group3',
    description:
      'Zip Code Wilmington Cohort 3.1 — Team 1 Group 3 collaborative organization.',
    url: 'https://github.com/ZC8-3-1-team1group3',
    color: '#60a5fa',
    repos: [],
  },
]
