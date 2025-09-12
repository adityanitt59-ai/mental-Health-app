// Mock API for AI chat responses
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

  if (event.httpMethod === 'POST') {
    const { message, conversationId } = JSON.parse(event.body);
    
    // Simple response logic (in production would use actual AI)
    const lowerMessage = message.toLowerCase();
    let response = '';
    let type = 'normal';

    // Crisis detection
    const crisisKeywords = ['suicide', 'kill myself', 'hurt myself', 'end it all', "can't go on"];
    if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
      response = "I'm very concerned about what you've shared. Your safety is the most important thing right now. Please reach out to a crisis hotline immediately or go to your nearest emergency room. You don't have to face this alone - there are people who want to help. Would you like me to provide emergency contact information?";
      type = 'crisis';
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('panic')) {
      const anxietyResponses = [
        "It sounds like you're feeling anxious right now. That's completely understandable. Try taking a few deep breaths with me - breathe in for 4 counts, hold for 4, then out for 4. What's contributing to these anxious feelings?",
        "Anxiety can be overwhelming, but you're not alone in this. One technique that helps many people is grounding - can you name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste?",
        "I hear that you're feeling anxious. That takes courage to share. Sometimes anxiety is our mind's way of trying to protect us. What specific thoughts or situations are triggering these feelings?"
      ];
      response = anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      const sadnessResponses = [
        "I'm sorry you're feeling this way. Your feelings are valid and it's okay to feel sad sometimes. Would you like to talk about what's been weighing on your mind lately?",
        "It takes strength to recognize and express when you're struggling. Depression can make everything feel heavy, but small steps can help. Have you been able to do any activities that usually bring you even a little joy?",
        "Thank you for trusting me with how you're feeling. Sadness is a natural human emotion, though I know it doesn't make it any less difficult. What kind of support would be most helpful for you right now?"
      ];
      response = sadnessResponses[Math.floor(Math.random() * sadnessResponses.length)];
    } else {
      const generalResponses = [
        "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about what you're experiencing?",
        "It sounds like you're going through something difficult. Your feelings are completely valid. What would be most helpful to talk about right now?",
        "I appreciate you opening up. Taking care of your mental health is so important. What brings you here today?",
        "That sounds challenging to deal with. You're taking a positive step by reaching out for support. How long have you been feeling this way?",
        "I'm glad you're here. Sometimes just having someone to talk to can make a difference. What's on your mind today?"
      ];
      response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }

    const chatResponse = {
      id: Date.now().toString(),
      message: response,
      type,
      timestamp: new Date().toISOString(),
      conversationId: conversationId || 'default',
      resources: type === 'crisis' ? [
        {
          name: '988 Suicide & Crisis Lifeline',
          phone: '988',
          description: 'Free and confidential emotional support 24/7'
        }
      ] : [],
    };

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatResponse),
    };
  }

  if (event.httpMethod === 'GET') {
    // Return conversation history (mock)
    const mockHistory = {
      conversationId: 'default',
      messages: [
        {
          id: '1',
          content: "Hello! I'm your AI mental health companion. I'm here to listen and provide support. How are you feeling today?",
          sender: 'bot',
          timestamp: new Date(Date.now() - 300000).toISOString(),
        }
      ],
      startedAt: new Date(Date.now() - 300000).toISOString(),
    };

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockHistory),
    };
  }

  // Method not allowed
  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};