import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Video, Headphones, Clock, Search, ExternalLink, Heart, Brain, Users, Book } from 'lucide-react';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', icon: BookOpen, color: 'gradient-primary' },
    { name: 'Anxiety', icon: Heart, color: 'gradient-secondary' },
    { name: 'Depression', icon: Brain, color: 'gradient-accent' },
    { name: 'Stress Management', icon: Users, color: 'gradient-calm' },
    { name: 'Study Skills', icon: Book, color: 'gradient-primary' },
  ];

  const resources = [
    {
      title: 'Understanding Student Anxiety',
      description: 'Learn about common anxiety triggers in academic settings and practical coping strategies.',
      type: 'article',
      category: 'Anxiety',
      duration: '8 min read',
      url: '#',
      featured: true,
    },
    {
      title: 'Mindfulness for Students',
      description: 'Guided meditation sessions designed specifically for busy student schedules.',
      type: 'audio',
      category: 'Stress Management',
      duration: '15 min',
      url: '#',
      featured: false,
    },
    {
      title: 'Building Healthy Study Habits',
      description: 'Evidence-based techniques to improve focus and reduce academic overwhelm.',
      type: 'video',
      category: 'Study Skills',
      duration: '12 min',
      url: '#',
      featured: true,
    },
    {
      title: 'Recognizing Depression Signs',
      description: 'Important information about depression symptoms and when to seek help.',
      type: 'article',
      category: 'Depression',
      duration: '6 min read',
      url: '#',
      featured: false,
    },
    {
      title: 'Breathing Exercises for Panic',
      description: 'Quick breathing techniques to manage panic attacks and acute anxiety.',
      type: 'video',
      category: 'Anxiety',
      duration: '5 min',
      url: '#',
      featured: false,
    },
    {
      title: 'Sleep Hygiene for Students',
      description: 'Tips for better sleep quality and managing irregular schedules.',
      type: 'article',
      category: 'Stress Management',
      duration: '10 min read',
      url: '#',
      featured: true,
    },
    {
      title: 'Dealing with Academic Pressure',
      description: 'Strategies to manage perfectionism and academic expectations.',
      type: 'audio',
      category: 'Stress Management',
      duration: '20 min',
      url: '#',
      featured: false,
    },
    {
      title: 'Social Anxiety in College',
      description: 'Understanding and overcoming social anxiety in campus environments.',
      type: 'video',
      category: 'Anxiety',
      duration: '18 min',
      url: '#',
      featured: false,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Headphones;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-600';
      case 'audio': return 'bg-purple-100 text-purple-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredResources = filteredResources.filter(resource => resource.featured);
  const regularResources = filteredResources.filter(resource => !resource.featured);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Mental Health Resources
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover evidence-based articles, videos, and tools to support your mental health journey.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.name)}
              className={`transition-gentle ${
                selectedCategory === category.name
                  ? 'gradient-primary text-primary-foreground'
                  : 'hover:bg-secondary/50'
              }`}
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Featured Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource, index) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <Card key={index} className="group p-6 hover:shadow-medium transition-gentle cursor-pointer">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <Badge 
                        className={`${getTypeColor(resource.type)} flex items-center space-x-1`}
                        variant="secondary"
                      >
                        <TypeIcon className="h-3 w-3" />
                        <span className="capitalize">{resource.type}</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Featured
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-gentle">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3">
                        {resource.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{resource.duration}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* All Resources */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">
          All Resources 
          <span className="text-lg font-normal text-muted-foreground ml-2">
            ({regularResources.length} {regularResources.length === 1 ? 'resource' : 'resources'})
          </span>
        </h2>
        
        {regularResources.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or category filter.
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularResources.map((resource, index) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <Card key={index} className="group p-6 hover:shadow-medium transition-gentle cursor-pointer">
                  <div className="space-y-4">
                    <Badge 
                      className={`${getTypeColor(resource.type)} flex items-center space-x-1 w-fit`}
                      variant="secondary"
                    >
                      <TypeIcon className="h-3 w-3" />
                      <span className="capitalize">{resource.type}</span>
                    </Badge>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-gentle">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {resource.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{resource.duration}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Resources;