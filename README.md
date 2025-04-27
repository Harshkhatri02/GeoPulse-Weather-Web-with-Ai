# Web Application

This is a Node.js web application with user authentication, location tracking, and interest management features.

## Features

- User authentication (signup/login)
- Location tracking
- Interest management
- Email subscription system
- MongoDB integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
PORT=3000
```

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
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

## Deployment on Vercel

1. Fork this repository to your GitHub account
2. Create a new project on Vercel
3. Connect your GitHub repository to Vercel
4. Configure the environment variables in Vercel's dashboard
5. Deploy!

## Tech Stack

- Node.js
- Express.js
- MongoDB
- EJS templating
- Express Session

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/) 