import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Clock, AlertTriangle, Heart, MessageCircle, ExternalLink } from 'lucide-react';

const Emergency = () => {
  const emergencyContacts = [
    {
      name: '988 Suicide & Crisis Lifeline',
      number: '988',
      description: 'Free and confidential emotional support 24/7',
      type: 'crisis',
      availability: '24/7',
      methods: ['Phone', 'Chat', 'Text'],
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Crisis counseling via text message',
      type: 'crisis',
      availability: '24/7',
      methods: ['Text'],
    },
    {
      name: 'National Alliance on Mental Illness',
      number: '1-800-950-6264',
      description: 'Information, referrals, and support for mental health',
      type: 'support',
      availability: 'Mon-Fri 10am-10pm ET',
      methods: ['Phone'],
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Treatment referral and information service',
      type: 'support',
      availability: '24/7',
      methods: ['Phone'],
    }
  ];

  const campusResources = [
    {
      name: 'Campus Counseling Center',
      description: 'Free counseling services for enrolled students',
      location: 'Student Health Building, 2nd Floor',
      hours: 'Mon-Fri 8am-5pm',
      phone: '(555) 123-4567',
      emergency: true,
    },
    {
      name: 'Campus Safety',
      description: '24/7 campus security and emergency response',
      location: 'Multiple locations across campus',
      hours: '24/7',
      phone: '(555) 911-HELP',
      emergency: true,
    },
    {
      name: 'Dean of Students Office',
      description: 'Student support and crisis intervention',
      location: 'Student Services Center, Room 150',
      hours: 'Mon-Fri 9am-5pm',
      phone: '(555) 123-4568',
      emergency: false,
    }
  ];

  const warningSigns = [
    'Thoughts of suicide or self-harm',
    'Feeling hopeless or trapped',
    'Extreme mood changes',
    'Withdrawing from friends and activities',
    'Increasing alcohol or drug use',
    'Taking risks that could lead to death',
    'Giving away prized possessions',
    'Saying goodbye to loved ones',
    'Putting affairs in order'
  ];

  const copingStrategies = [
    {
      title: 'Immediate Safety',
      strategies: [
        'Remove any means of self-harm from your environment',
        'Go to a safe place with trusted people',
        'Call someone you trust',
        'Go to the emergency room if in immediate danger'
      ]
    },
    {
      title: 'Grounding Techniques',
      strategies: [
        'Name 5 things you can see, 4 you can hear, 3 you can touch',
        'Take slow, deep breaths',
        'Hold an ice cube or splash cold water on your face',
        'Listen to calming music'
      ]
    },
    {
      title: 'Reach Out',
      strategies: [
        'Call a crisis hotline',
        'Contact a trusted friend or family member',
        'Reach out to a counselor or therapist',
        'Go to your campus counseling center'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Alert Header */}
      <Card className="p-6 bg-destructive/10 border-destructive/20">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-destructive mb-2">
                Emergency Mental Health Support
              </h1>
              <p className="text-lg text-destructive/80">
                If you're having thoughts of suicide or self-harm, or if you're in immediate danger, 
                please reach out for help right now. You are not alone.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-medium"
                size="lg"
                onClick={() => window.open('tel:988')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call 988 Crisis Lifeline
              </Button>
              <Button 
                variant="outline" 
                className="border-destructive/30 text-destructive hover:bg-destructive/5"
                size="lg"
                onClick={() => window.open('sms:741741?body=HOME')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Text Crisis Line
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Crisis Contacts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">24/7 Crisis Support</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {emergencyContacts.map((contact, index) => (
            <Card key={index} className="p-6 hover:shadow-medium transition-gentle">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-foreground">{contact.name}</h3>
                  <Badge 
                    variant={contact.type === 'crisis' ? 'destructive' : 'secondary'}
                    className={contact.type === 'crisis' ? 'bg-destructive text-destructive-foreground' : ''}
                  >
                    {contact.type === 'crisis' ? 'Crisis' : 'Support'}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground">{contact.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="font-mono text-lg font-semibold text-foreground">
                      {contact.number}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{contact.availability}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span>{contact.methods.join(', ')}</span>
                  </div>
                </div>

                <Button 
                  className="w-full gradient-primary text-primary-foreground"
                  onClick={() => window.open(`tel:${contact.number.replace(/[^0-9]/g, '')}`)}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Campus Resources */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Campus Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {campusResources.map((resource, index) => (
            <Card key={index} className="p-6 hover:shadow-medium transition-gentle">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{resource.name}</h3>
                  {resource.emergency && (
                    <Badge variant="destructive" className="bg-destructive text-destructive-foreground">
                      Emergency
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground">{resource.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{resource.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{resource.hours}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="font-mono font-medium text-foreground">{resource.phone}</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full hover:bg-secondary/50 transition-gentle"
                  onClick={() => window.open(`tel:${resource.phone}`)}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Warning Signs & Coping Strategies */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Warning Signs */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
            Warning Signs to Watch For
          </h3>
          <ul className="space-y-2">
            {warningSigns.map((sign, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-sm text-muted-foreground">{sign}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Coping Strategies */}
        <div className="space-y-6">
          {copingStrategies.map((category, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <Heart className="mr-2 h-5 w-5 text-primary" />
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.strategies.map((strategy, strategyIndex) => (
                  <li key={strategyIndex} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                    <span className="text-sm text-muted-foreground">{strategy}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <Card className="p-8 text-center gradient-calm text-white">
        <h3 className="text-2xl font-bold mb-4">Remember: You Are Not Alone</h3>
        <p className="text-lg mb-6 opacity-90">
          Seeking help is a sign of strength, not weakness. There are people who care about you and want to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-medium"
            onClick={() => window.open('tel:988')}
          >
            <Phone className="mr-2 h-5 w-5" />
            Call for Help Now
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/30 text-white hover:bg-white/10"
            onClick={() => window.open('https://suicidepreventionlifeline.org/chat/', '_blank')}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Online Crisis Chat
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Emergency;