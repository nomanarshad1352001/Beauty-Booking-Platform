import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Star,
  MapPin,
  Clock,
  Shield,
  Sparkles,
  Heart,
  Award,
  ChevronLeft,
  ChevronRight,
  Quote,
  Play,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { ParticleField } from '@/components/shared/ParticleField';
import { useCountUp } from '@/lib/hooks/useScrollAnimation';
import { locations } from '@/lib/data/locations';
import { services } from '@/lib/data/services';
import { providers } from '@/lib/data/providers';
import { testimonials } from '@/lib/data/testimonials';
import { formatCurrency } from '@/lib/utils/formatters';
import { cn } from '@/utils/cn';

const features = [
  {
    icon: Sparkles,
    title: 'Premium Artists',
    description: 'Hand-selected, certified professionals with years of experience in luxury aesthetics.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Shield,
    title: 'Medical-Grade Standards',
    description: 'All treatments performed with the highest safety standards and premium-quality products.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Clock,
    title: 'Seamless Booking',
    description: 'Book your appointment in under 60 seconds — choose your service, provider, and time.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Heart,
    title: 'Personalized Care',
    description: 'Every treatment is customized to your unique features, skin type, and aesthetic goals.',
    gradient: 'from-amber-500 to-orange-500',
  },
];

const stats = [
  { label: 'Happy Clients', value: 2400, suffix: '+' },
  { label: 'Treatments Done', value: 8500, suffix: '+' },
  { label: 'Expert Artists', value: 24, suffix: '' },
  { label: 'Average Rating', value: 4.9, suffix: '/5', isDecimal: true },
];

const processSteps = [
  { step: '01', title: 'Choose Your Service', description: 'Browse our curated menu of premium beauty treatments.' },
  { step: '02', title: 'Pick Your Artist', description: 'Select from our vetted network of certified professionals.' },
  { step: '03', title: 'Book Your Slot', description: 'Choose a date and time that works perfectly for you.' },
  { step: '04', title: 'Enjoy the Experience', description: 'Arrive, relax, and let our artists work their magic.' },
];

export function Landing() {
  const popularServices = services.filter((s) => s.isPopular).slice(0, 4);
  const topProviders = providers.slice(0, 4);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const heroWords = ['Elevated.', 'Perfected.', 'Redefined.'];

  // Animated hero word rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroWordIndex((i) => (i + 1) % heroWords.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ━━━ HERO SECTION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Particle Background */}
        <ParticleField />

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(var(--primary))]/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(var(--primary))]/5 rounded-full blur-[100px]" />

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))]/80 backdrop-blur-sm px-5 py-2 text-sm shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--primary))] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
                </span>
                <span className="text-[hsl(var(--muted-foreground))]">Now Booking for Summer 2024</span>
              </span>
            </motion.div>

            {/* Animated Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Beauty,{' '}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={heroWordIndex}
                    initial={{ opacity: 0, y: 20, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: 40 }}
                    transition={{ duration: 0.5 }}
                    className="gradient-text italic inline-block"
                  >
                    {heroWords[heroWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 text-lg sm:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed"
            >
              Experience world-class permanent makeup, skincare, and aesthetic treatments. 
              Book with our curated network of premium artists and medical professionals.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/book">
                <Button
                  size="lg"
                  className="px-10 text-base h-14 rounded-xl shadow-lg shadow-[hsl(var(--primary))]/25 hover:shadow-xl hover:shadow-[hsl(var(--primary))]/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Book Your Appointment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#services">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-10 text-base h-14 rounded-xl backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Explore Services
                </Button>
              </a>
            </motion.div>

            {/* Social Proof Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-[hsl(var(--muted-foreground))]"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {testimonials.slice(0, 4).map((t, i) => (
                    <motion.img
                      key={t.id}
                      src={t.avatarUrl}
                      alt={t.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="h-9 w-9 rounded-full border-2 border-[hsl(var(--background))] object-cover"
                    />
                  ))}
                </div>
                <span className="ml-1 font-semibold">2,400+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-semibold ml-1">4.9 Rating</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-[hsl(var(--muted-foreground))]/30 flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--muted-foreground))]/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ━━━ STATS BAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatedSection>
        <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <StatNumber key={stat.label} stat={stat} />
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ━━━ FEATURES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[hsl(var(--primary))] text-sm font-semibold uppercase tracking-widest">Why Choose Us</span>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Solvé Difference
            </h2>
            <p className="mt-4 text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              We set the standard for premium beauty experiences.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <Card className="magnetic-hover group border-transparent hover:border-[hsl(var(--primary))]/20 h-full">
                  <CardContent className="p-7 text-center">
                    <div
                      className={cn(
                        'mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br mb-5 transition-transform duration-300 group-hover:scale-110',
                        feature.gradient
                      )}
                    >
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━━ POPULAR SERVICES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="services" className="py-20 sm:py-28 bg-[hsl(var(--card))]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[hsl(var(--primary))] text-sm font-semibold uppercase tracking-widest">Services</span>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Most Popular Treatments
            </h2>
            <p className="mt-4 text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
              Our most-loved services, chosen by thousands of clients.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularServices.map((service) => (
              <StaggerItem key={service.id}>
                <Link to="/book">
                  <Card className="magnetic-hover group overflow-hidden cursor-pointer h-full border-transparent hover:border-[hsl(var(--primary))]/20">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800">
                          <Clock className="h-3 w-3" />
                          {service.duration} min
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold mb-1 group-hover:text-[hsl(var(--primary))] transition-colors">{service.name}</h3>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-2 mb-3">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[hsl(var(--primary))]">
                          {formatCurrency(service.price)}
                        </span>
                        <motion.span
                          className="text-xs text-[hsl(var(--primary))] font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Book Now
                          <ArrowRight className="h-3 w-3" />
                        </motion.span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection delay={0.3} className="text-center mt-10">
            <Link to="/book">
              <Button variant="outline" size="lg" className="rounded-xl px-8 hover:-translate-y-0.5 transition-all duration-300">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ━━━ HOW IT WORKS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[hsl(var(--primary))] text-sm font-semibold uppercase tracking-widest">Process</span>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How It Works
            </h2>
            <p className="mt-4 text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
              Book your perfect appointment in four simple steps.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => (
              <StaggerItem key={step.step}>
                <div className="relative text-center group">
                  {/* Connector Line (desktop only) */}
                  {idx < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[hsl(var(--primary))]/30 to-[hsl(var(--border))]" />
                  )}
                  <div className="relative z-10">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/70 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[hsl(var(--primary))]/20 mb-5 group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-[200px] mx-auto">{step.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━━ PROVIDERS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 bg-[hsl(var(--card))]/50 border-y border-[hsl(var(--border))]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[hsl(var(--primary))] text-sm font-semibold uppercase tracking-widest">Our Team</span>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Meet Our Artists
            </h2>
            <p className="mt-4 text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
              Exceptional talent, dedicated to helping you look and feel your best.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topProviders.map((provider) => (
              <StaggerItem key={provider.id}>
                <Card className="magnetic-hover text-center overflow-hidden group border-transparent hover:border-[hsl(var(--primary))]/20">
                  <div className="p-7">
                    <div className="relative mx-auto h-28 w-28 mb-5">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-violet-500 animate-pulse-glow" />
                      <div className="absolute inset-[3px] rounded-full overflow-hidden">
                        <img
                          src={provider.avatarUrl}
                          alt={provider.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg">{provider.name}</h3>
                    <p className="text-sm text-[hsl(var(--primary))] font-medium mt-0.5">{provider.title}</p>
                    <div className="flex items-center justify-center gap-1 mt-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-3.5 w-3.5',
                              i <= Math.floor(provider.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium ml-1">{provider.rating}</span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">
                        ({provider.reviewCount})
                      </span>
                    </div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-3 line-clamp-2">
                      {provider.bio}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━━ TESTIMONIALS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[hsl(var(--primary))]/5 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl translate-x-1/2" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[hsl(var(--primary))] text-sm font-semibold uppercase tracking-widest">Testimonials</span>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Our Clients Say
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <Card className="border-transparent shadow-xl bg-[hsl(var(--card))]">
                    <CardContent className="p-8 sm:p-12">
                      <Quote className="h-10 w-10 text-[hsl(var(--primary))]/20 mb-4" />
                      <p className="text-lg sm:text-xl leading-relaxed text-[hsl(var(--foreground))] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                        &ldquo;{testimonials[testimonialIndex].text}&rdquo;
                      </p>
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonials[testimonialIndex].avatarUrl}
                          alt={testimonials[testimonialIndex].name}
                          className="h-14 w-14 rounded-full object-cover ring-2 ring-[hsl(var(--primary))]/20"
                        />
                        <div>
                          <p className="font-semibold">{testimonials[testimonialIndex].name}</p>
                          <p className="text-sm text-[hsl(var(--muted-foreground))]">
                            {testimonials[testimonialIndex].service} · {testimonials[testimonialIndex].location}
                          </p>
                          <div className="flex gap-0.5 mt-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Carousel controls */}
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={() => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                  className="p-2 rounded-full border border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))] transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={cn(
                        'h-2 rounded-full transition-all duration-300',
                        i === testimonialIndex ? 'w-8 bg-[hsl(var(--primary))]' : 'w-2 bg-[hsl(var(--muted-foreground))]/30'
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
                  className="p-2 rounded-full border border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))] transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ━━━ LOCATIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="locations" className="py-20 sm:py-28 bg-[hsl(var(--card))]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[hsl(var(--primary))] text-sm font-semibold uppercase tracking-widest">Locations</span>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Visit Our Studios
            </h2>
            <p className="mt-4 text-[hsl(var(--muted-foreground))]">
              Premium beauty experiences across the country.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {locations.map((location) => (
              <StaggerItem key={location.id}>
                <Link to="/book">
                  <Card className="magnetic-hover group overflow-hidden cursor-pointer border-transparent hover:border-[hsl(var(--primary))]/20">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={location.imageUrl}
                        alt={location.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-semibold text-lg">{location.name}</h3>
                        <div className="flex items-center gap-1.5 text-sm text-white/80 mt-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{location.city}, {location.state}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">{location.address}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-[hsl(var(--muted-foreground))]">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {location.hours.monday.open}–{location.hours.monday.close}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          Open Now
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━━ TRUST BAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatedSection>
        <section className="py-12 border-y border-[hsl(var(--border))]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-[hsl(var(--muted-foreground))]/50">
              {['Vogue', 'Harper\'s Bazaar', 'Elle', 'Allure', 'Cosmopolitan'].map((pub) => (
                <span key={pub} className="text-sm sm:text-base font-semibold tracking-widest uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {pub}
                </span>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ━━━ CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden">
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(346,77%,40%)] to-purple-700" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_60%)]" />

              <div className="relative px-8 py-16 sm:px-16 sm:py-24 text-center text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6"
                >
                  <Award className="h-8 w-8" />
                </motion.div>
                <h2
                  className="text-3xl sm:text-5xl font-bold mb-4 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Ready for Your <span className="italic">Transformation?</span>
                </h2>
                <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg">
                  Join thousands of happy clients and experience the Solvé difference — where beauty meets artistry.
                </p>
                <Link to="/book">
                  <Button
                    size="lg"
                    className="bg-white text-[hsl(var(--primary))] hover:bg-white/90 px-12 h-14 rounded-xl text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    Book Your Appointment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

/** Animated stat counter component */
function StatNumber({ stat }: { stat: { label: string; value: number; suffix: string; isDecimal?: boolean } }) {
  const { ref, isVisible } = useScrollAnimationInline();
  const { count, trigger } = useCountUp(stat.isDecimal ? stat.value * 10 : stat.value, 2000);

  useEffect(() => {
    if (isVisible) trigger();
  }, [isVisible, trigger]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-[hsl(var(--foreground))]">
        {stat.isDecimal ? (count / 10).toFixed(1) : count.toLocaleString()}
        <span className="text-[hsl(var(--primary))]">{stat.suffix}</span>
      </div>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{stat.label}</p>
    </div>
  );
}

/** Inlined for this file — simple scroll visibility hook */
function useScrollAnimationInline() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.3 });
    const current = ref.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);
  return { ref, isVisible };
}
