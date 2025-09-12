import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Activity, BookOpen, MessageCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/mental-health-hero.jpg';

const Home = () => {
  const features = [
    {
      icon: Activity,
      title: 'Mood Tracking',
      description: 'Monitor your emotional well-being with our simple daily mood tracker.',
      link: '/mood-tracker',
      color: 'gradient-primary'
    },
    {
      icon: BookOpen,
      title: 'Mental Health Resources',
      description: 'Access curated articles, videos, and self-help guides for students.',
      link: '/resources',
      color: 'gradient-secondary'
    },
    {
      icon: MessageCircle,
      title: 'AI Support Chat',
      description: 'Get immediate support and guidance through our AI-powered chat.',
      link: '/chat',
      color: 'gradient-accent'
    },
    {
      icon: Shield,
      title: 'Emergency Support',
      description: 'Quick access to crisis hotlines and emergency mental health resources.',
      link: '/emergency',
      color: 'gradient-calm'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Mental Health{' '}
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  Matters
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                A safe space for students to track their mental health, access resources, 
                and get support when they need it most. You're not alone in this journey.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="gradient-primary text-primary-foreground shadow-medium hover:shadow-strong transition-gentle"
              >
                <Link to="/mood-tracker">Start Tracking Your Mood</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-primary/20 hover:bg-primary/5 transition-gentle"
              >
                <Link to="/resources">Explore Resources</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Peaceful mental health and wellness illustration"
              className="w-full h-auto rounded-2xl shadow-strong animate-float"
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 gradient-secondary rounded-full opacity-20 animate-pulse-gentle"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 gradient-accent rounded-full opacity-15 animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How We Support You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover tools and resources designed specifically for student mental health needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={feature.title} className="group p-6 hover:shadow-medium transition-gentle cursor-pointer">
              <Link to={feature.link} className="block space-y-4">
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-gentle`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-gentle">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-8 py-16">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Prioritize Your Mental Health?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take the first step towards better mental well-being. Your journey to a healthier mind starts here.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg"
            className="gradient-primary text-primary-foreground shadow-medium hover:shadow-strong transition-gentle"
          >
            <Link to="/mood-tracker">
              <Heart className="mr-2 h-5 w-5" />
              Start Your Journey
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-primary/20 hover:bg-primary/5 transition-gentle"
          >
            <Link to="/emergency">
              <Shield className="mr-2 h-5 w-5" />
              Get Help Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;