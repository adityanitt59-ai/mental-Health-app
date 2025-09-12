// Mock API for mood tracking data
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
    // Return mock mood data
    const mockMoodData = {
      weeklyAverage: 3.8,
      streak: 7,
      mostCommonMood: 'Good',
      recentEntries: [
        {
          id: '1',
          date: '2024-09-12',
          mood: 4,
          symptoms: ['Anxiety', 'Academic Pressure'],
          notes: 'Feeling better after talking to a friend about my stress.',
        },
        {
          id: '2',
          date: '2024-09-11',
          mood: 3,
          symptoms: ['Fatigue', 'Overwhelm'],
          notes: 'Had a tough day with assignments but managed to complete them.',
        },
        {
          id: '3',
          date: '2024-09-10',
          mood: 5,
          symptoms: [],
          notes: 'Great day! Felt productive and positive.',
        },
      ],
      insights: [
        'Your mood has been improving over the past week.',
        'Consider tracking what activities boost your mood.',
        'You\'ve been consistent with tracking - keep it up!',
      ],
    };

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockMoodData),
    };
  }

  if (event.httpMethod === 'POST') {
    // Handle mood submission
    const { mood, symptoms, notes } = JSON.parse(event.body);
    
    // Mock successful submission
    const response = {
      success: true,
      message: 'Mood tracked successfully',
      entry: {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        mood,
        symptoms: symptoms || [],
        notes: notes || '',
        timestamp: new Date().toISOString(),
      },
    };

    return {
      statusCode: 201,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response),
    };
  }

  // Method not allowed
  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};