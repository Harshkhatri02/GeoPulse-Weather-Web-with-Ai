# GeoPulse - Weather & News Web Application with AI Integration

GeoPulse is a full-stack web application that provides personalized weather information and news based on user location and interests, enhanced with AI-powered features.

![GeoPulse Banner](https://github.com/Harshkhatri02/GeoPulse-Weather-Web-with-Ai/raw/main/public/images/geopulse-banner.png)

## ✨ Features

- **Location-based Weather Updates**: Real-time weather information based on user's location
- **Personalized News Feed**: News content filtered by user interests
- **AI Integration**: AI-powered content generation and recommendations
- **User Authentication**: Secure signup/login system
- **Interest Management**: Users can select and update their topic preferences
- **Email Subscription**: Automated notifications for weather and news updates
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

- **Frontend**: EJS, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **APIs**:
  - Weather API for weather data
  - News API for current news
  - OpenAI API for AI-generated content
  - Pixabay/Unsplash for images

## 🚀 Live Demo

Visit the live application [here](https://geopulse-weather-web-with-ai.vercel.app/).

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- API keys for:
  - Weather API
  - News API
  - OpenAI API (for AI features)
  - Pixabay/Unsplash (for images)

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Server
PORT=3000
SESSION_SECRET=your_session_secret

# APIs
WEATHER_API_KEY=your_weather_api_key
NEWS_API_KEY=your_news_api_key
OPENAI_API_KEY=your_openai_api_key
PIXABAY_API_KEY=your_pixabay_api_key
UNSPLASH_API_KEY=your_unsplash_api_key
```

## 📥 Installation

1. Clone the repository:
```bash
git clone https://github.com/Harshkhatri02/GeoPulse-Weather-Web-with-Ai.git
cd GeoPulse-Weather-Web-with-Ai
```

2. Install dependencies:
```bash
npm install
```

3. Create and configure your `.env` file as described above.

4. Start the application:
```bash
npm start
```

## 🌟 Key Features Explained

### Weather Tracking
GeoPulse automatically detects the user's location (with permission) and provides detailed weather information, including temperature, humidity, and forecasts.

### Interest-Based News
Users can select topics they're interested in, and GeoPulse will curate a personalized news feed based on these preferences.

### AI Enhancement
The application leverages AI to generate personalized content summaries and recommendations based on user preferences and behavior.

## 📱 Screenshots

![Homepage](https://github.com/Harshkhatri02/GeoPulse-Weather-Web-with-Ai/raw/main/public/images/screenshot-home.png)
![Weather Dashboard](https://github.com/Harshkhatri02/GeoPulse-Weather-Web-with-Ai/raw/main/public/images/screenshot-weather.png)
![News Feed](https://github.com/Harshkhatri02/GeoPulse-Weather-Web-with-Ai/raw/main/public/images/screenshot-news.png)

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/) 