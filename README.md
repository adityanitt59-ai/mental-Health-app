# MindCare - Student Mental Health Support App

A comprehensive, responsive web application designed to support student mental health. Built with React, TypeScript, Tailwind CSS, and includes mock backend APIs ready for Netlify deployment.

## Features

### 🏠 **Home Page**
- Welcoming hero section with calming design
- Feature overview cards
- Call-to-action buttons leading to key functionality

### 📊 **Mood Tracker**
- Interactive mood selection (1-5 scale with visual icons)
- Symptom tracking with common concerns
- Personal notes and journaling
- Progress insights and streak tracking

### 📚 **Resources Library**
- Curated mental health resources (articles, videos, audio)
- Search and category filtering
- Featured content highlighting
- Evidence-based mental health information

### 💬 **AI Support Chat**
- Intelligent conversation system with crisis detection
- Supportive responses for anxiety, depression, and general concerns
- Emergency resource integration
- Real-time typing indicators

### 🚨 **Emergency Support**
- 24/7 crisis hotline information
- Campus resource directory
- Warning signs awareness
- Immediate coping strategies

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Routing**: React Router
- **State Management**: React Query
- **Build Tool**: Vite
- **Deployment**: Netlify-ready with Functions

## Design System

The app uses a therapeutic color palette designed to promote calm and trust:

- **Primary**: Calming teal (#4DB6AC) for main actions
- **Secondary**: Gentle green for growth and healing
- **Accent**: Soft purple for creativity and support
- **Background**: Warm, light gradients

### Key Design Principles
- Accessibility-first approach
- Smooth animations and transitions
- Mobile-responsive design
- Calming visual hierarchy
- Crisis-aware UI patterns

## Mock Backend APIs

The app includes Netlify Functions for mock backend functionality:

### `/api/mood-data`
- **GET**: Retrieve mood tracking data and insights
- **POST**: Submit new mood entries with symptoms and notes

### `/api/resources`
- **GET**: Fetch mental health resources with filtering

### `/api/chat`
- **POST**: Process chat messages with AI-like responses
- **GET**: Retrieve conversation history

## Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mental-health-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## Deployment to Netlify

### Automatic Deployment

1. **Connect to GitHub**
   - Push your code to a GitHub repository
   - Connect your Netlify account to GitHub

2. **Deploy Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Environment Variables**
   No additional environment variables required for basic functionality.

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or use Netlify CLI: `netlify deploy --prod --dir=dist`

## Project Structure

```
├── src/
│   ├── assets/          # Images and static assets
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── Layout.tsx  # Main layout wrapper
│   │   └── Navigation.tsx # Navigation component
│   ├── pages/          # Page components
│   │   ├── Home.tsx    # Landing page
│   │   ├── MoodTracker.tsx
│   │   ├── Resources.tsx
│   │   ├── Chat.tsx
│   │   └── Emergency.tsx
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── index.css       # Global styles and design system
├── netlify/
│   └── functions/      # Serverless functions for API
├── netlify.toml        # Netlify configuration
└── README.md
```

## Customization

### Adding New Resources
Edit the mock data in `netlify/functions/resources.js` to include new mental health resources.

### Modifying AI Responses
Update the response logic in `netlify/functions/chat.js` to customize AI behavior and crisis detection.

### Design System Changes
Modify `src/index.css` and `tailwind.config.ts` to adjust colors, spacing, and visual design.

## Security & Privacy Considerations

- No personal data is stored permanently in the current mock version
- Crisis detection keywords trigger immediate emergency resource recommendations
- All API endpoints include CORS headers for security
- Ready for integration with secure authentication and database systems

## Future Enhancements

The app architecture is designed to support:

- User authentication and personal accounts
- Real database integration (Supabase, Firebase, etc.)
- Actual AI/NLP services for chat functionality
- Push notifications for mood tracking reminders
- Integration with campus counseling services
- Analytics and reporting for mental health trends

## Contributing

This project is structured to be easily extensible. Key areas for contribution:

1. **Enhanced AI Responses**: Integrate with actual AI services
2. **Data Persistence**: Add real database backend
3. **Additional Resources**: Expand the mental health resource library
4. **Accessibility**: Further improve accessibility features
5. **Mobile App**: React Native version for mobile platforms

## License

This project is designed for educational and mental health support purposes. Please ensure compliance with healthcare regulations and privacy laws when deploying with real user data.

## Support

For technical questions about the codebase or deployment, please refer to the documentation or create an issue in the repository.

**Important**: This application provides supportive resources but is not a replacement for professional mental health care. If you're experiencing a mental health crisis, please contact emergency services or a crisis hotline immediately.

---

Built with ❤️ for student mental health and well-being.