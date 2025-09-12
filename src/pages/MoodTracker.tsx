import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, Heart, Frown, Meh, Smile, Laugh } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const { toast } = useToast();

  const moods = [
    { value: 1, label: 'Very Low', icon: Frown, color: 'text-red-500', bgColor: 'bg-red-50 hover:bg-red-100' },
    { value: 2, label: 'Low', icon: Frown, color: 'text-orange-500', bgColor: 'bg-orange-50 hover:bg-orange-100' },
    { value: 3, label: 'Neutral', icon: Meh, color: 'text-yellow-500', bgColor: 'bg-yellow-50 hover:bg-yellow-100' },
    { value: 4, label: 'Good', icon: Smile, color: 'text-green-500', bgColor: 'bg-green-50 hover:bg-green-100' },
    { value: 5, label: 'Excellent', icon: Laugh, color: 'text-primary', bgColor: 'bg-primary/10 hover:bg-primary/20' },
  ];

  const commonSymptoms = [
    'Anxiety', 'Stress', 'Fatigue', 'Insomnia', 'Concentration Issues',
    'Social Withdrawal', 'Academic Pressure', 'Loneliness', 'Overwhelm'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = () => {
    if (selectedMood === null) {
      toast({
        title: "Please select your mood",
        description: "Choose how you're feeling today to track your progress.",
        variant: "destructive"
      });
      return;
    }

    // Mock submission - in real app would save to backend
    toast({
      title: "Mood tracked successfully!",
      description: "Your mood has been recorded. Keep up the great work!"
    });

    // Reset form
    setSelectedMood(null);
    setNotes('');
    setSymptoms([]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Daily Mood Tracker
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Take a moment to check in with yourself. Tracking your mood helps you understand patterns 
          and celebrate your progress.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Mood Selection */}
        <Card className="lg:col-span-2 p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="gradient-primary p-2 rounded-lg">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">How are you feeling today?</h2>
          </div>

          {/* Mood Options */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-4 rounded-xl border-2 transition-gentle ${
                  selectedMood === mood.value
                    ? 'border-primary bg-primary/10 shadow-soft scale-105'
                    : 'border-border hover:border-primary/30'
                } ${mood.bgColor}`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <mood.icon className={`h-8 w-8 ${mood.color}`} />
                  <span className="text-sm font-medium text-foreground">{mood.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Symptoms */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Any symptoms or concerns? (Optional)</h3>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom) => (
                <Badge
                  key={symptom}
                  variant={symptoms.includes(symptom) ? 'default' : 'outline'}
                  className={`cursor-pointer transition-gentle ${
                    symptoms.includes(symptom)
                      ? 'bg-primary hover:bg-primary-dark'
                      : 'hover:bg-secondary/50'
                  }`}
                  onClick={() => handleSymptomToggle(symptom)}
                >
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Additional notes (Optional)</h3>
            <Textarea
              placeholder="What's on your mind? Share any thoughts about your day, what's affecting your mood, or anything else you'd like to remember..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-24 resize-none"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full gradient-primary text-primary-foreground shadow-medium hover:shadow-strong transition-gentle"
            size="lg"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Track Today's Mood
          </Button>
        </Card>

        {/* Insights Panel */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="gradient-secondary p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Your Progress</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">This Week's Average</p>
              <div className="flex items-center space-x-2">
                <Smile className="h-6 w-6 text-green-500" />
                <span className="text-2xl font-bold text-foreground">3.8</span>
                <span className="text-sm text-muted-foreground">/ 5</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Streak</p>
              <p className="text-2xl font-bold text-primary">7 days</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Most Common Mood</p>
              <div className="flex items-center space-x-2">
                <Smile className="h-5 w-5 text-green-500" />
                <span className="font-medium text-foreground">Good</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t space-y-3">
            <h4 className="font-medium text-foreground">Quick Tips</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Track consistently for better insights</p>
              <p>• Notice patterns in your mood changes</p>
              <p>• Celebrate small improvements</p>
              <p>• Don't judge yourself for difficult days</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MoodTracker;