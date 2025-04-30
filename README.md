# GeoPulse - Intelligent Weather Dashboard with Location-Based Updates

<div align="center">
  <img height="150" src="public/my_img/logo2.jpg"  />
</div>


## 🌟 Overview

GeoPulse is a modern, intuitive weather dashboard that combines real-time weather information with personalized location-based content. The application features dynamic visual elements that adapt to current weather conditions, delivering an immersive and informative weather monitoring experience.

## ✨ Key Features

### 🌡️ Advanced Weather Monitoring
- **Real-time Temperature Display**: Shows current temperature with detailed conditions (e.g., "Clear Sky")
- **3-Day Forecast**: Provides average temperature predictions for upcoming days with visual indicators
- **Hourly Breakdown**: Detailed temperature forecasts throughout the day (3 AM to 9 PM)
- **Current Location Detection**: One-click geolocation integration for instant local weather data

### 🌍 Environmental Metrics Dashboard
- **Air Quality Index (AQI)**: Real-time air quality measurements with status indicators (Very Poor, Good, etc.)
- **Detailed Pollutant Tracking**:
  - PM2.5 levels monitoring with numerical values
  - NO2 concentration tracking with precise measurements
- **Comprehensive Atmospheric Conditions**:
  - Humidity percentage with real-time updates
  - Atmospheric pressure in hPa
  - Visibility range in kilometers
  - "Feels like" temperature calculations

### 🎨 Dynamic Visual Experience
- **Weather-based Background Images**: Automatically changes background images based on current weather conditions
- **Adaptive Text Coloring**: Intelligently adjusts text color (black/white) based on background image brightness
- **Smooth Loading Animations**: Visual transitions when loading new weather data
- **Dark/Light Mode Toggle**: User-selectable interface theme with persistent settings

### 👤 Personalization & User Features
- **User Authentication**: Secure signup/login system with personalized welcome messages
- **Interest-Based Information**: Customizable content based on user interests (Health, Sports, Travel, Food, Fashion)
- **Email Subscription**: Newsletter and weather alert subscription system
- **Location-Based News**: Local news and updates relevant to the user's location
- **Regenerative Tips**: AI-powered recommendations that can be refreshed with a click

### 💻 User Interface
- **Clean, Minimalist Design**: Intuitive layout with glassmorphism styling
- **Responsive Design**: Fully optimized for all devices (mobile, tablet, desktop)
- **City Search with Suggestions**: Intelligent search with autocomplete location suggestions
- **Geolocation Button**: One-click access to current location's weather
- **Today's Highlights Section**: Focused view of the most important daily metrics

## 🛠️ Technical Stack

### Frontend
- **HTML/CSS/JavaScript**: Core web technologies
- **EJS**: Templating engine for dynamic content rendering
- **GSAP & ScrollTrigger**: Smooth animations and scroll effects
- **Three.js**: Enhanced visual elements and effects
- **Locomotive Scroll**: Custom smooth scrolling experience

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: Database for user profiles, preferences and location data

### APIs & Integrations
- **Weather API**: Real-time weather data fetching
- **Pixabay API**: Dynamic background images based on weather conditions
- **Geolocation API**: Precise location detection
- **Web Authentication**: Secure user sessions management
- **Email Service**: For subscription alerts and notifications

## 📸 Screenshots

[INSERT_WEATHER_DASHBOARD_SCREENSHOT]
*Main weather dashboard showing real-time metrics with dynamic background*

[INSERT_INTERESTS_SCREENSHOT]
*Personalized interest-based content with regenerative tips*

[INSERT_ENVIRONMENTAL_METRICS_SCREENSHOT]
*Air Quality Index and detailed environmental metrics panel*

## 🌟 Unique Features

### 📍 Adaptive Visual Experience
GeoPulse creates a truly immersive experience by dynamically changing background images to match the current weather conditions. The text color automatically adjusts between black and white based on the brightness of the background image, ensuring optimal readability in all conditions.

### 🧩 Interest-Based Content
Users can select their interests (Health, Sports, Travel, Food, Fashion) to receive personalized tips and news relevant to both their preferences and current location, creating a unique content experience for each user.

### 🔄 Dynamic Loading Effects
The application features smooth loading animations and transitions between weather states, with elements fading in and out to provide a seamless user experience when switching between locations.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- API keys for Weather API and Pixabay

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Harshkhatri02/GeoPulse.git
cd GeoPulse
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file with the following:
```env
WEATHER_API_KEY=your_api_key
PIXABAY_API_KEY=your_pixabay_api_key
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the development server:
```bash
npm run dev
```

## 🌐 Live Demo

Experience GeoPulse live at: [https://geopulseai.vercel.app/weather-dashboard](https://geopulseai.vercel.app/weather-dashboard)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any queries or support, please reach out to:
[harshkhatri682@gmail.com]

---

Made with ❤️ by Harsh Khatri
