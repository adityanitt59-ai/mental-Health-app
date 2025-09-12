// Mock API for mental health resources
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod === 'GET') {
    const mockResources = {
      featured: [
        {
          id: '1',
          title: 'Understanding Student Anxiety',
          description: 'Learn about common anxiety triggers in academic settings and practical coping strategies.',
          type: 'article',
          category: 'Anxiety',
          duration: '8 min read',
          url: 'https://example.com/anxiety-guide',
          tags: ['anxiety', 'coping', 'students'],
          author: 'Dr. Sarah Johnson',
          publishedDate: '2024-09-01',
        },
        {
          id: '2',
          title: 'Mindfulness for Students',
          description: 'Guided meditation sessions designed specifically for busy student schedules.',
          type: 'audio',
          category: 'Stress Management',
          duration: '15 min',
          url: 'https://example.com/mindfulness-audio',
          tags: ['mindfulness', 'meditation', 'stress'],
          author: 'Mindful Campus Team',
          publishedDate: '2024-08-28',
        },
        {
          id: '3',
          title: 'Building Healthy Study Habits',
          description: 'Evidence-based techniques to improve focus and reduce academic overwhelm.',
          type: 'video',
          category: 'Study Skills',
          duration: '12 min',
          url: 'https://example.com/study-habits-video',
          tags: ['productivity', 'focus', 'academic success'],
          author: 'Academic Success Center',
          publishedDate: '2024-09-05',
        },
      ],
      categories: [
        {
          name: 'Anxiety',
          count: 15,
          description: 'Resources for managing anxiety and panic symptoms',
        },
        {
          name: 'Depression',
          count: 12,
          description: 'Support and information about depression',
        },
        {
          name: 'Stress Management',
          count: 20,
          description: 'Techniques for handling academic and life stress',
        },
        {
          name: 'Study Skills',
          count: 8,
          description: 'Strategies for academic success and time management',
        },
      ],
      totalResources: 55,
      lastUpdated: '2024-09-12T10:00:00Z',
    };

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockResources),
    };
  }

  // Method not allowed
  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};