export interface Testimonial {
  id: string;
  name: string;
  avatarUrl: string;
  service: string;
  rating: number;
  text: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test_001',
    name: 'Victoria Sterling',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    service: 'Ombré Powder Brows',
    rating: 5,
    text: 'Absolutely life-changing! Elena is an incredible artist. My brows look so natural that everyone thinks they grew in that way. The whole experience was luxurious and comfortable.',
    location: 'SoHo Studio',
  },
  {
    id: 'test_002',
    name: 'Jasmine Nakamura',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    service: 'Volume Lash Extensions',
    rating: 5,
    text: 'Madison is a true artist. My lashes look incredible — full and voluminous but still natural. I get compliments everywhere I go. Already booked my next fill!',
    location: 'Beverly Hills Suite',
  },
  {
    id: 'test_003',
    name: 'Camille Dubois',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
    service: 'HydraFacial MD',
    rating: 5,
    text: 'The best facial I have ever had. My skin was literally glowing for weeks. Isabella really knows her craft and made me feel so relaxed during the entire treatment.',
    location: 'SoHo Studio',
  },
  {
    id: 'test_004',
    name: 'Aaliyah Washington',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    service: 'Lip Blush',
    rating: 5,
    text: "I was nervous about lip blush but the team at Solvé made me feel completely at ease. The results are gorgeous — a perfect rosy tint that saves me so much time in the morning.",
    location: 'Miami Beach Atelier',
  },
  {
    id: 'test_005',
    name: 'Serena Blackwood',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    service: 'Dermal Fillers — Lips',
    rating: 5,
    text: 'Dr. Bennett is phenomenal. He took the time to understand exactly what I wanted and delivered results that look natural and beautiful. Would recommend to everyone.',
    location: 'Beverly Hills Suite',
  },
];
