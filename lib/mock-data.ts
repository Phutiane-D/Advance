export const SA_PROVINCES = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
] as const

export const CHURCHES = [
  'Common Ground Church',
  'Monument Church',
  'New Gen Church Somerset West',
  'Southlands Church',
  'Joshua Generation Church',
  'City Gates Church',
  'Hope Church',
  'One Light Church',
  'Other',
] as const

export const MINISTRY_INVOLVEMENTS = [
  'Worship',
  'Youth',
  'Kids',
  'Small Group Leader',
  'Eldership',
  'Hospitality',
  'Tech/AV',
  'Preaching',
  'Missions',
  'Prayer',
  "Women's Ministry",
  "Men's Ministry",
  'Other',
] as const

export const SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'Java',
  'C#',
  'SQL',
  'PostgreSQL',
  'MongoDB',
  'AWS',
  'Azure',
  'Docker',
  'Kubernetes',
  'UI/UX Design',
  'Figma',
  'Adobe Creative Suite',
  'Marketing',
  'Digital Marketing',
  'SEO',
  'Content Writing',
  'Copywriting',
  'Social Media',
  'Project Management',
  'Agile',
  'Scrum',
  'Financial Analysis',
  'Accounting',
  'Bookkeeping',
  'Teaching',
  'Curriculum Development',
  'Youth Ministry',
  'Worship Leading',
  'Event Planning',
  'Photography',
  'Videography',
  'Graphic Design',
  'Electrical',
  'Plumbing',
  'Carpentry',
  'Construction',
  'Customer Service',
  'Sales',
  'Administration',
  'HR',
  'Recruitment',
  'Data Analysis',
  'Excel',
  'PowerBI',
] as const

export type Availability = 'open' | 'passive' | 'not-looking'

export interface Candidate {
  id: string
  firstName: string
  lastName: string
  headline: string
  email: string
  phone: string
  photo: string
  city: string
  province: typeof SA_PROVINCES[number]
  availability: Availability
  homeChurch: typeof CHURCHES[number]
  ministryInvolvement: (typeof MINISTRY_INVOLVEMENTS[number])[]
  about: string
  skills: { name: string; proficiency: number }[]
  experience: {
    title: string
    company: string
    location: string
    startDate: string
    endDate: string | null
    description: string
  }[]
  education: {
    degree: string
    institution: string
    year: string
  }[]
  languages: string[]
  portfolioLinks: { label: string; url: string }[]
  cvFileName: string | null
  cvUploadDate: string | null
  cvSize: string | null
  hasReference: boolean
}

export const candidates: Candidate[] = [
  {
    id: '1',
    firstName: 'Thabo',
    lastName: 'Molefe',
    headline: 'Senior Software Engineer & Tech Lead',
    email: 'thabo.molefe@email.co.za',
    phone: '+27 82 123 4567',
    photo: 'https://i.pravatar.cc/300?img=12',
    city: 'Johannesburg',
    province: 'Gauteng',
    availability: 'open',
    homeChurch: 'Common Ground Church',
    ministryInvolvement: ['Tech/AV', 'Small Group Leader'],
    about: 'Passionate about building technology that serves communities. With 8 years of experience in software development, I lead teams to create impactful digital solutions. I believe my skills are a gift to be used for Kingdom purposes, and I\'m looking for opportunities where faith and work intersect.',
    skills: [
      { name: 'TypeScript', proficiency: 95 },
      { name: 'React', proficiency: 90 },
      { name: 'Node.js', proficiency: 85 },
      { name: 'AWS', proficiency: 80 },
      { name: 'PostgreSQL', proficiency: 75 },
    ],
    experience: [
      {
        title: 'Tech Lead',
        company: 'FNB Digital',
        location: 'Johannesburg',
        startDate: '2021-03',
        endDate: null,
        description: 'Leading a team of 8 developers building customer-facing banking applications.',
      },
      {
        title: 'Senior Developer',
        company: 'Takealot',
        location: 'Cape Town',
        startDate: '2018-01',
        endDate: '2021-02',
        description: 'Built and maintained e-commerce platform features serving millions of users.',
      },
    ],
    education: [
      { degree: 'BSc Computer Science', institution: 'University of Pretoria', year: '2015' },
    ],
    languages: ['English', 'Zulu', 'Afrikaans'],
    portfolioLinks: [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'LinkedIn', url: 'https://linkedin.com' },
    ],
    cvFileName: 'Thabo_Molefe_CV.pdf',
    cvUploadDate: '2024-01-15',
    cvSize: '1.2 MB',
    hasReference: true,
  },
  {
    id: '2',
    firstName: 'Naledi',
    lastName: 'Dlamini',
    headline: 'Digital Marketing Manager',
    email: 'naledi.dlamini@email.co.za',
    phone: '+27 83 234 5678',
    photo: 'https://i.pravatar.cc/300?img=5',
    city: 'Cape Town',
    province: 'Western Cape',
    availability: 'passive',
    homeChurch: 'Monument Church',
    ministryInvolvement: ['Worship', "Women's Ministry"],
    about: 'Creative marketer with a heart for storytelling. I help brands connect authentically with their audiences. Currently exploring opportunities where I can use marketing to advance meaningful causes.',
    skills: [
      { name: 'Digital Marketing', proficiency: 95 },
      { name: 'Social Media', proficiency: 90 },
      { name: 'Content Writing', proficiency: 85 },
      { name: 'SEO', proficiency: 80 },
      { name: 'Adobe Creative Suite', proficiency: 75 },
    ],
    experience: [
      {
        title: 'Marketing Manager',
        company: 'Woolworths',
        location: 'Cape Town',
        startDate: '2020-06',
        endDate: null,
        description: 'Managing digital campaigns across all platforms with a focus on sustainability messaging.',
      },
    ],
    education: [
      { degree: 'BCom Marketing', institution: 'University of Cape Town', year: '2017' },
    ],
    languages: ['English', 'Xhosa'],
    portfolioLinks: [
      { label: 'Portfolio', url: 'https://portfolio.com' },
    ],
    cvFileName: 'Naledi_Dlamini_CV.pdf',
    cvUploadDate: '2024-02-10',
    cvSize: '890 KB',
    hasReference: true,
  },
  {
    id: '3',
    firstName: 'Johan',
    lastName: 'van der Berg',
    headline: 'Youth Pastor & Ministry Leader',
    email: 'johan.vdberg@email.co.za',
    phone: '+27 71 345 6789',
    photo: 'https://i.pravatar.cc/300?img=11',
    city: 'Durban',
    province: 'KwaZulu-Natal',
    availability: 'open',
    homeChurch: 'Joshua Generation Church',
    ministryInvolvement: ['Youth', 'Preaching', 'Small Group Leader'],
    about: 'Called to equip the next generation. 6 years of youth ministry experience with a focus on discipleship and leadership development. Looking for full-time ministry opportunities.',
    skills: [
      { name: 'Youth Ministry', proficiency: 95 },
      { name: 'Teaching', proficiency: 90 },
      { name: 'Event Planning', proficiency: 85 },
      { name: 'Curriculum Development', proficiency: 80 },
      { name: 'Project Management', proficiency: 70 },
    ],
    experience: [
      {
        title: 'Youth Pastor',
        company: 'Joshua Generation Church',
        location: 'Durban',
        startDate: '2019-01',
        endDate: null,
        description: 'Leading youth ministry of 200+ young people, developing leaders and creating engaging programs.',
      },
    ],
    education: [
      { degree: 'BTh Theology', institution: 'SATS', year: '2018' },
    ],
    languages: ['English', 'Afrikaans'],
    portfolioLinks: [],
    cvFileName: 'Johan_van_der_Berg_CV.pdf',
    cvUploadDate: '2024-01-20',
    cvSize: '650 KB',
    hasReference: true,
  },
  {
    id: '4',
    firstName: 'Lindiwe',
    lastName: 'Nkosi',
    headline: 'Financial Analyst & Chartered Accountant',
    email: 'lindiwe.nkosi@email.co.za',
    phone: '+27 84 456 7890',
    photo: 'https://i.pravatar.cc/300?img=32',
    city: 'Pretoria',
    province: 'Gauteng',
    availability: 'open',
    homeChurch: 'Common Ground Church',
    ministryInvolvement: ['Hospitality', 'Small Group Leader'],
    about: 'CA(SA) with expertise in financial planning and analysis. Passionate about helping organizations steward resources well. Seeking opportunities in the non-profit or ministry space.',
    skills: [
      { name: 'Financial Analysis', proficiency: 95 },
      { name: 'Accounting', proficiency: 95 },
      { name: 'Excel', proficiency: 90 },
      { name: 'PowerBI', proficiency: 85 },
      { name: 'Data Analysis', proficiency: 80 },
    ],
    experience: [
      {
        title: 'Senior Financial Analyst',
        company: 'Deloitte',
        location: 'Johannesburg',
        startDate: '2019-02',
        endDate: null,
        description: 'Providing financial advisory services to large corporates across various industries.',
      },
    ],
    education: [
      { degree: 'BCom Accounting', institution: 'Wits University', year: '2016' },
      { degree: 'CA(SA)', institution: 'SAICA', year: '2019' },
    ],
    languages: ['English', 'Zulu', 'Sotho'],
    portfolioLinks: [
      { label: 'LinkedIn', url: 'https://linkedin.com' },
    ],
    cvFileName: 'Lindiwe_Nkosi_CV.pdf',
    cvUploadDate: '2024-02-01',
    cvSize: '1.1 MB',
    hasReference: true,
  },
  {
    id: '5',
    firstName: 'Pieter',
    lastName: 'Botha',
    headline: 'Worship Leader & Music Director',
    email: 'pieter.botha@email.co.za',
    phone: '+27 72 567 8901',
    photo: 'https://i.pravatar.cc/300?img=53',
    city: 'Somerset West',
    province: 'Western Cape',
    availability: 'passive',
    homeChurch: 'New Gen Church Somerset West',
    ministryInvolvement: ['Worship', 'Tech/AV', 'Preaching'],
    about: 'Music is my ministry. Over 10 years leading worship and developing worship teams. Also skilled in audio engineering and production. Open to conversations about worship director roles.',
    skills: [
      { name: 'Worship Leading', proficiency: 95 },
      { name: 'Music Direction', proficiency: 90 },
      { name: 'Audio Engineering', proficiency: 85 },
      { name: 'Team Leadership', proficiency: 85 },
      { name: 'Event Planning', proficiency: 75 },
    ],
    experience: [
      {
        title: 'Worship Director',
        company: 'New Gen Church',
        location: 'Somerset West',
        startDate: '2017-01',
        endDate: null,
        description: 'Leading worship ministry including team development, song selection, and technical production.',
      },
    ],
    education: [
      { degree: 'BMus Performance', institution: 'Stellenbosch University', year: '2014' },
    ],
    languages: ['English', 'Afrikaans'],
    portfolioLinks: [
      { label: 'YouTube', url: 'https://youtube.com' },
      { label: 'Spotify', url: 'https://spotify.com' },
    ],
    cvFileName: null,
    cvUploadDate: null,
    cvSize: null,
    hasReference: true,
  },
  {
    id: '6',
    firstName: 'Ayanda',
    lastName: 'Mthembu',
    headline: 'UI/UX Designer & Creative Director',
    email: 'ayanda.mthembu@email.co.za',
    phone: '+27 81 678 9012',
    photo: 'https://i.pravatar.cc/300?img=26',
    city: 'Johannesburg',
    province: 'Gauteng',
    availability: 'open',
    homeChurch: 'City Gates Church',
    ministryInvolvement: ['Tech/AV', 'Youth'],
    about: 'I believe design can change the world. Experienced in creating user-centered digital experiences for startups and enterprises. Looking for opportunities where creativity serves a greater purpose.',
    skills: [
      { name: 'UI/UX Design', proficiency: 95 },
      { name: 'Figma', proficiency: 95 },
      { name: 'Adobe Creative Suite', proficiency: 90 },
      { name: 'Graphic Design', proficiency: 85 },
      { name: 'Photography', proficiency: 70 },
    ],
    experience: [
      {
        title: 'Creative Director',
        company: 'Ogilvy South Africa',
        location: 'Johannesburg',
        startDate: '2020-08',
        endDate: null,
        description: 'Leading creative team delivering brand experiences for major South African clients.',
      },
    ],
    education: [
      { degree: 'BA Visual Communication', institution: 'AAA School of Advertising', year: '2015' },
    ],
    languages: ['English', 'Zulu'],
    portfolioLinks: [
      { label: 'Behance', url: 'https://behance.net' },
      { label: 'Dribbble', url: 'https://dribbble.com' },
    ],
    cvFileName: 'Ayanda_Mthembu_Portfolio.pdf',
    cvUploadDate: '2024-01-25',
    cvSize: '4.2 MB',
    hasReference: true,
  },
  {
    id: '7',
    firstName: 'Sarah',
    lastName: 'Meyer',
    headline: 'Primary School Teacher & Education Specialist',
    email: 'sarah.meyer@email.co.za',
    phone: '+27 73 789 0123',
    photo: 'https://i.pravatar.cc/300?img=16',
    city: 'Bloemfontein',
    province: 'Free State',
    availability: 'open',
    homeChurch: 'Hope Church',
    ministryInvolvement: ['Kids', 'Small Group Leader'],
    about: 'Passionate educator with 7 years of primary school experience. Specialize in inclusive education and curriculum development. Seeking opportunities in Christian education.',
    skills: [
      { name: 'Teaching', proficiency: 95 },
      { name: 'Curriculum Development', proficiency: 90 },
      { name: 'Child Development', proficiency: 85 },
      { name: 'Project Management', proficiency: 75 },
      { name: 'Administration', proficiency: 70 },
    ],
    experience: [
      {
        title: 'Grade 4 Teacher',
        company: 'Grey College Primary',
        location: 'Bloemfontein',
        startDate: '2018-01',
        endDate: null,
        description: 'Teaching grade 4 learners with focus on English and Mathematics.',
      },
    ],
    education: [
      { degree: 'BEd Foundation Phase', institution: 'University of the Free State', year: '2017' },
    ],
    languages: ['English', 'Afrikaans'],
    portfolioLinks: [],
    cvFileName: 'Sarah_Meyer_CV.pdf',
    cvUploadDate: '2024-02-05',
    cvSize: '750 KB',
    hasReference: true,
  },
  {
    id: '8',
    firstName: 'Mandla',
    lastName: 'Khumalo',
    headline: 'Master Electrician & Contractor',
    email: 'mandla.khumalo@email.co.za',
    phone: '+27 76 890 1234',
    photo: 'https://i.pravatar.cc/300?img=60',
    city: 'Durban',
    province: 'KwaZulu-Natal',
    availability: 'passive',
    homeChurch: 'Joshua Generation Church',
    ministryInvolvement: ['Hospitality', "Men's Ministry"],
    about: 'Licensed master electrician with 15 years experience. Run my own contracting business serving residential and commercial clients. Open to church and ministry projects.',
    skills: [
      { name: 'Electrical', proficiency: 95 },
      { name: 'Construction', proficiency: 85 },
      { name: 'Project Management', proficiency: 80 },
      { name: 'Customer Service', proficiency: 85 },
      { name: 'Sales', proficiency: 70 },
    ],
    experience: [
      {
        title: 'Owner & Master Electrician',
        company: 'Khumalo Electrical',
        location: 'Durban',
        startDate: '2015-03',
        endDate: null,
        description: 'Running electrical contracting business with team of 6, serving KZN region.',
      },
    ],
    education: [
      { degree: 'National Diploma Electrical Engineering', institution: 'DUT', year: '2008' },
      { degree: 'Master Electrician License', institution: 'DoL', year: '2012' },
    ],
    languages: ['English', 'Zulu'],
    portfolioLinks: [],
    cvFileName: 'Mandla_Khumalo_CV.pdf',
    cvUploadDate: '2024-01-10',
    cvSize: '980 KB',
    hasReference: true,
  },
  {
    id: '9',
    firstName: 'Emma',
    lastName: 'Williams',
    headline: 'Missions Coordinator & Non-Profit Manager',
    email: 'emma.williams@email.co.za',
    phone: '+27 82 901 2345',
    photo: 'https://i.pravatar.cc/300?img=23',
    city: 'Cape Town',
    province: 'Western Cape',
    availability: 'not-looking',
    homeChurch: 'Southlands Church',
    ministryInvolvement: ['Missions', 'Prayer', 'Small Group Leader'],
    about: 'Dedicated to mobilizing believers for global mission. 8 years experience in non-profit management and missions coordination. Currently serving but always open to networking.',
    skills: [
      { name: 'Project Management', proficiency: 90 },
      { name: 'Event Planning', proficiency: 90 },
      { name: 'Administration', proficiency: 85 },
      { name: 'Recruitment', proficiency: 80 },
      { name: 'Content Writing', proficiency: 75 },
    ],
    experience: [
      {
        title: 'Missions Director',
        company: 'Advance Movement',
        location: 'Cape Town',
        startDate: '2020-01',
        endDate: null,
        description: 'Coordinating mission trips, partnerships, and mobilization across the Advance family of churches.',
      },
    ],
    education: [
      { degree: 'BA Theology', institution: 'George Whitefield College', year: '2015' },
    ],
    languages: ['English'],
    portfolioLinks: [],
    cvFileName: null,
    cvUploadDate: null,
    cvSize: null,
    hasReference: true,
  },
  {
    id: '10',
    firstName: 'Sipho',
    lastName: 'Ndlovu',
    headline: 'Full-Stack Developer & Mobile App Specialist',
    email: 'sipho.ndlovu@email.co.za',
    phone: '+27 79 012 3456',
    photo: 'https://i.pravatar.cc/300?img=68',
    city: 'Pretoria',
    province: 'Gauteng',
    availability: 'open',
    homeChurch: 'One Light Church',
    ministryInvolvement: ['Tech/AV', 'Youth'],
    about: 'Building apps that make a difference. Specialized in React Native and full-stack development. Particularly interested in building tech solutions for churches and ministries.',
    skills: [
      { name: 'React', proficiency: 95 },
      { name: 'React Native', proficiency: 90 },
      { name: 'TypeScript', proficiency: 90 },
      { name: 'Node.js', proficiency: 85 },
      { name: 'MongoDB', proficiency: 80 },
    ],
    experience: [
      {
        title: 'Mobile Developer',
        company: 'Discovery',
        location: 'Johannesburg',
        startDate: '2021-06',
        endDate: null,
        description: 'Building and maintaining Discovery app used by millions of South Africans.',
      },
    ],
    education: [
      { degree: 'BSc Information Technology', institution: 'University of Pretoria', year: '2020' },
    ],
    languages: ['English', 'Ndebele', 'Zulu'],
    portfolioLinks: [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'App Store', url: 'https://apps.apple.com' },
    ],
    cvFileName: 'Sipho_Ndlovu_CV.pdf',
    cvUploadDate: '2024-02-12',
    cvSize: '1.5 MB',
    hasReference: true,
  },
  {
    id: '11',
    firstName: 'Tariro',
    lastName: 'Chikwanha',
    headline: 'HR Manager & People Operations Lead',
    email: 'tariro.chikwanha@email.co.za',
    phone: '+27 83 123 4567',
    photo: 'https://i.pravatar.cc/300?img=47',
    city: 'Johannesburg',
    province: 'Gauteng',
    availability: 'passive',
    homeChurch: 'Common Ground Church',
    ministryInvolvement: ['Hospitality', "Women's Ministry", 'Small Group Leader'],
    about: 'People are my passion. 10 years in HR with expertise in talent acquisition and organizational development. Interested in building healthy workplace cultures in faith-based organizations.',
    skills: [
      { name: 'HR', proficiency: 95 },
      { name: 'Recruitment', proficiency: 90 },
      { name: 'Project Management', proficiency: 85 },
      { name: 'Administration', proficiency: 85 },
      { name: 'Data Analysis', proficiency: 70 },
    ],
    experience: [
      {
        title: 'HR Manager',
        company: 'Standard Bank',
        location: 'Johannesburg',
        startDate: '2019-04',
        endDate: null,
        description: 'Managing HR operations for technology division with 500+ employees.',
      },
    ],
    education: [
      { degree: 'BCom Industrial Psychology', institution: 'Wits University', year: '2013' },
      { degree: 'MBA', institution: 'GIBS', year: '2020' },
    ],
    languages: ['English', 'Shona'],
    portfolioLinks: [
      { label: 'LinkedIn', url: 'https://linkedin.com' },
    ],
    cvFileName: 'Tariro_Chikwanha_CV.pdf',
    cvUploadDate: '2024-01-30',
    cvSize: '1.3 MB',
    hasReference: true,
  },
  {
    id: '12',
    firstName: 'Francois',
    lastName: 'du Plessis',
    headline: 'Videographer & Content Creator',
    email: 'francois.duplessis@email.co.za',
    phone: '+27 74 234 5678',
    photo: 'https://i.pravatar.cc/300?img=51',
    city: 'Stellenbosch',
    province: 'Western Cape',
    availability: 'open',
    homeChurch: 'Monument Church',
    ministryInvolvement: ['Tech/AV', 'Worship'],
    about: 'Visual storyteller creating content that moves people. Experienced in documentary, commercial, and church media production. Looking for opportunities to tell stories that matter.',
    skills: [
      { name: 'Videography', proficiency: 95 },
      { name: 'Video Editing', proficiency: 95 },
      { name: 'Photography', proficiency: 85 },
      { name: 'Adobe Creative Suite', proficiency: 90 },
      { name: 'Graphic Design', proficiency: 75 },
    ],
    experience: [
      {
        title: 'Lead Videographer',
        company: 'Freelance',
        location: 'Cape Town',
        startDate: '2018-01',
        endDate: null,
        description: 'Creating video content for brands, churches, and non-profits across South Africa.',
      },
    ],
    education: [
      { degree: 'BA Film & Media', institution: 'UCT', year: '2017' },
    ],
    languages: ['English', 'Afrikaans'],
    portfolioLinks: [
      { label: 'Vimeo', url: 'https://vimeo.com' },
      { label: 'Instagram', url: 'https://instagram.com' },
    ],
    cvFileName: 'Francois_du_Plessis_CV.pdf',
    cvUploadDate: '2024-02-08',
    cvSize: '2.1 MB',
    hasReference: true,
  },
]

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  read: boolean
}

export interface Conversation {
  id: string
  participantIds: string[]
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}

export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    participantIds: ['current-user', '1'],
    lastMessage: 'Thanks for reaching out! I\'d love to discuss the opportunity.',
    lastMessageTime: '2024-02-15T10:30:00',
    unreadCount: 2,
  },
  {
    id: 'conv-2',
    participantIds: ['current-user', '2'],
    lastMessage: 'When would be a good time for a call?',
    lastMessageTime: '2024-02-14T15:45:00',
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    participantIds: ['current-user', '6'],
    lastMessage: 'I\'ve attached my portfolio for your review.',
    lastMessageTime: '2024-02-13T09:15:00',
    unreadCount: 1,
  },
]

export const messages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'current-user',
    receiverId: '1',
    content: 'Hi Thabo, I came across your profile on Advance Network. We have an exciting Tech Lead opportunity at our company that I think would be a great fit for your experience.',
    timestamp: '2024-02-15T09:00:00',
    read: true,
  },
  {
    id: 'msg-2',
    senderId: '1',
    receiverId: 'current-user',
    content: 'Thanks for reaching out! I\'d love to discuss the opportunity. Could you share more details about the role?',
    timestamp: '2024-02-15T10:30:00',
    read: false,
  },
]

export const messageTemplates = [
  {
    id: 'template-1',
    name: 'Introduce a role',
    content: 'Hi [Name], I came across your profile on Advance Network and was impressed by your experience. We have an exciting [Position] opportunity that I think would be a great fit. Would you be open to learning more?',
  },
  {
    id: 'template-2',
    name: 'Request full CV',
    content: 'Thank you for your interest in the position. Could you please share your full CV so we can review your complete experience and qualifications?',
  },
  {
    id: 'template-3',
    name: 'Schedule a call',
    content: 'I\'d love to set up a call to discuss the opportunity in more detail. Are you available for a 30-minute call this week? Please let me know what times work best for you.',
  },
]
