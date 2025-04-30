// Import required modules and set up Express application
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';    
//custom module for images and text generation using openai api
import { generateTextAndImage } from './public/scripts/module.mjs';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Use environment variables for sensitive data
const dbUrl = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET;
const weatherApiKey = process.env.WEATHER_API_KEY;
const pixabayApiKey = process.env.PIXABAY_API_KEY;
const newsApiKey = process.env.NEWS_API_KEY;
const unsplashApiKey = process.env.UNSPLASH_API_KEY;

// Validate required environment variables
const requiredEnvVars = {
    MONGODB_URI: dbUrl,
    SESSION_SECRET: sessionSecret,
    WEATHER_API_KEY: weatherApiKey,
    PIXABAY_API_KEY: pixabayApiKey,
    NEWS_API_KEY: newsApiKey,
    UNSPLASH_API_KEY: unsplashApiKey
};

const missingEnvVars = Object.entries(requiredEnvVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars.join(', '));
    process.exit(1);
}

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';
console.log(`Running in ${isDevelopment ? 'development' : 'production'} mode`);
console.log(`Attempting to connect to MongoDB at: ${dbUrl.substring(0, dbUrl.indexOf('@') + 1)}[HIDDEN]`);

// MongoDB connection options
const mongoOptions = {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 30000
};

await mongoose.connect(dbUrl, mongoOptions)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((err) => {
        console.error(" MongoDB Connection Error:", err.message);
        if (err.name === 'MongooseServerSelectionError') {
            console.error("Cannot reach MongoDB server. Please check:");
            console.error("1. Your internet connection");
            console.error("2. MongoDB connection string in .env file");
            console.error("3. MongoDB Atlas cluster status");
        }
        if (err.code === 'ENOTFOUND') {
            console.error("DNS resolution failed. The MongoDB hostname couldn't be found.");
        }
        console.error("Full error details:", err);
    });

//Convert the url imported of app.js to file path to set the views directory for current app
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//Express  App is created 
const app = express();

// Add security headers
app.use((req, res, next) => {
    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

    if (isDevelopment) {
        // Development headers remain unchanged
        res.setHeader(
            'Content-Security-Policy',
            "default-src 'self' * data: 'unsafe-inline' 'unsafe-eval'; " +
            "style-src 'self' 'unsafe-inline' * https: http:; " +
            "style-src-elem 'self' 'unsafe-inline' * https: http:; " +
            "font-src 'self' * data: https: http:; " +
            "img-src 'self' * data: https: http:; " +
            "script-src 'self' * 'unsafe-inline' 'unsafe-eval' https: http:; " +
            "connect-src 'self' *"
        );
    } else {
        // Updated production headers
        res.setHeader(
            'Content-Security-Policy',
            "default-src 'self' https: data:; " +
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com https://*.vercel.app; " +
            "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com https://*.vercel.app; " +
            "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.googleapis.com https://unpkg.com; " +
            "style-src-elem 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.googleapis.com https://unpkg.com; " +
            "font-src 'self' https://fonts.gstatic.com data: https:; " +
            "img-src 'self' data: https: http:; " +
            "connect-src 'self' https://* http://*;"
        );
    }
    
    // Common headers for both environments
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Update CORS to allow your Vercel domain
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'https://geopulseai.vercel.app'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Set the view engine to ejs
app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
        } else if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css; charset=UTF-8');
        } else if (path.endsWith('.json')) {
            res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        } else if (path.endsWith('.webp')) {
            res.setHeader('Content-Type', 'image/webp');
        } else if (path.endsWith('.png')) {
            res.setHeader('Content-Type', 'image/png');
        } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
        }
        
        // Set caching headers
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
        res.setHeader('Vary', 'Accept-Encoding');
    }
}));
app.use(express.json()); // for parsing application/json

//Makes the request available in req.body
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(session({
    //Generating URL-safe id
    //Can generate this key by installing and using crypto for it.
    secret: sessionSecret,
    //Store on every updation - false
    resave: false,//Ask that the store method be called at every request. If false only call if there are changes.
    //Store Empty session - false
    saveUninitialized: false //
}));

const interestsSchema = new mongoose.Schema({
    health: Boolean,
    sports: Boolean,
    travel: Boolean,
    food: Boolean,
    fashion: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});


// const User = mongoose.model('User', userSchema);
const Interests = mongoose.model('Interests', interestsSchema);


//Location

const locationSchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Location = mongoose.model('Location', locationSchema);


// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //Regex code to identity and evaluate email pattern
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    interests:{ type: mongoose.Schema.Types.ObjectId, ref: 'Interests' },
    currentLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
});
// subscriber: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscriber' }
const User = mongoose.model('User', userSchema);
//Email
const emailSubs = new mongoose.Schema({
    email: {type:String,required:true},
});
// user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

const Subscriber = mongoose.model('Subscribers',emailSubs);


app.post('/store-location', async (req, res) => {

    
        // Check if user is logged in or signed up
        // console.log('s and l',req.session.signedUp,req.session.loggedIn);
        if (req.session.loggedIn || req.session.signedUp) {
            // console.log("here");
            const { latitude, longitude } = req.body;
            const userEmail = req.session.email;

            // Find the user by email
            const user = await User.findOne({ email: userEmail });
            if (!user) {
                return res.status(404).send('User not found');
            }

            // Check if user's location is already saved
            if (!user.currentLocation) {
                // Create a new location document
                const newLocation = new Location({
                    latitude: latitude,
                    longitude: longitude,
                    user: user._id
                });
                await newLocation.save();

                // Update the user's currentLocation field
                user.currentLocation = newLocation._id;
                await user.save();


                return res.json({ latitude, longitude });
            }else{
                const findUserLoc = await Location.findOne({_id:user.currentLocation}) ;
                                if (findUserLoc) {
                                    //Updating by request body lat and lon
                                    
                                    findUserLoc.latitude = latitude;
                                    findUserLoc.longitude = longitude;
                                    await findUserLoc.save();
                                }
            }
        } else {
            return res.status(403).send('Unauthorized');
        }
    
    });

// Signup route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).send('User already exists');
    }
    
    // Create new user
    user = new User({
        name,
        email,
        password
    });
    req.session.email = email;
    await user.save();
    req.session.signedUp = true;
    res.render('index', { name: req.body.name, session: req.session,userSavedLocation:req.session.userSavedLocation});
});

app.post('/apply-subscribe', async(req, res) => {
        // User is logged in or signed up
        // Store the email in the database
        const reqEmail = req.body.email;
        if(!(req.session.signedUp||req.session.loggedIn)){
            req.session.errormessage="Please Signup or Login To Subscribe";
            return res.render('subsMails.ejs',{errormessage:req.session.errormessage,session:req.session});
        }
        const newSubscriber = new Subscriber({ email:reqEmail});
        newSubscriber.save()
              .then(() => {
                req.session.message = "Email has been saved! Thankyou";
                res.render('subsMails.ejs',{message:req.session.message,session:req.session});
            }).catch(err => {
                console.error(err);
                return res.send("An error occurred while saving the email");
            });
         
    
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Check if user exists
    if (!req.session) {
        req.session = {};
    }
    let user = await User.findOne({ email });
    if (!user || user.password !== password) {
        return res.render('SignupAndLogin.ejs', { error: 'Invalid email or password' });
    }   

    const locationExists  = await User.findOne({currentLocation:{$exists:true}});
    if(locationExists){
        let  loc=await Location.findOne({_id:user.currentLocation});
        if(loc){

            let lat=loc.latitude;
            let lon=loc.longitude;
            let userSavedLocation = `${lat},${lon}`;
            req.session.userSavedLocation = userSavedLocation;
        }
    }
    req.session.loggedIn = true;
    // req.session.name = user.name;
    req.session.email = user.email;
    res.render('index.ejs',{name :user.name,session: req.session,userSavedLocation:req.session.userSavedLocation});
    // Check if password is correct
    // Note: This assumes that you are storing passwords in plaintext (which is not recommended).
    // In a real-world application, you would hash the password and compare the hashed values.
    // if (user.password !== password) {
    //     return res.render('login.ejs', { error: 'Invalid email or password' });
    // }
});



// Save interests route
//If someone reaches the save-interest route we first check loggedin or SignedUp
    app.post('/save-interests', async (req, res) => {
        //Direct access from the request page
        const { health, sports, travel, food, fashion } = req.body;
        //If present in session
        const userEmail = req.session.email; // Assuming you have the user's email in the session
    // Find the user by email
        var isRegTrue =(Boolean)(!req.session.loggedIn||!req.session.signedUp);
        if (!req.session || !isRegTrue) {
            return res.status(401).send('Unauthorized');
        }
     
        let user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(400).send('User not found');
        }

        // Update user's interests
        const interests = {};
        if (health === 'on') {
            interests.health = true;
        }
        if (sports === 'on') {
            interests.sports = true;
        }
        if (travel === 'on') {
            interests.travel = true;
        }
        if (food === 'on') {
            interests.food = true;
        }
        if (fashion === 'on') {
            interests.fashion = true;
        }
        
        // Update user's interests
        //For User
        
        //For Storing in interest Model
        if(user){
            var inInterestsModel = await Interests.findOne({user:user._id})
            // console.log('returning val of finding id in user of interests',inInterestsModel);
            if(inInterestsModel){
                user.interests = inInterestsModel._id;
                inInterestsModel.health=interests.health,
                inInterestsModel.sports=interests.sports,
                inInterestsModel.travel=interests.travel,
                inInterestsModel.food=interests.food,
                inInterestsModel.fashion=interests.fashion;
                await inInterestsModel.save();
            }else{
                var newInterests = new Interests({
                    health: interests.health || false,
                    sports: interests.sports || false,
                    travel: interests.travel || false,
                    food: interests.food || false,
                    fashion: interests.fashion || false,
                    user: user._id
                });
                await newInterests.save();
            }
            if(!req.session.interests){
                //Storing in session so that one time data can be accessed multiple time in one session even if the db is not used for fetching
                if(newInterests){
                    req.session.interests=newInterests;
                }else{
                    req.session.interests=inInterestsModel;
                
                }
            }
            //if user
            await user.save();
        }
        // For making the interest Available for only that times,if the page is accessed once and session is started here by storing the interest for the first time
        req.session.interestsSaved=true;
        res.render('interestAndNews.ejs',{session:req.session,interests:req.session.interests});
});
    

app.get("/",(req,res)=>{
    if (!req.session) {
        req.session = {};
    }
    
    // let name = req.session.name || false;
    res.redirect('weather-dashboard');
})
app.get("/weather-dashboard",(req,res)=>{
    if (!req.session) {
        req.session = {};
    }
    res.render('index.ejs',{ session: req.session,name:req.session.name,userSavedLocation:req.session.userSavedLocation});
})


app.get('/interest-and-news', (req, res) => {
    if (!req.session) {
        // console.log("Inside int");
        req.session = {};
    }
    // console.log(req.session)
    req.session.interestsSaved = req.session.interestsSaved || false;
    // console.log(req.session.interests);
    res.render('interestAndNews.ejs',{session: req.session,interests:req.session.interests});
});


app.get('/about-us',(req,res)=>{
    if (!req.session) {
        req.session = {};
    }
    res.render('about.ejs',{session:req.session});
})

app.get('/signup-or-login',(req,res)=>{
    res.render('SignupAndLogin.ejs',{error:false});
})

app.get('/subscribe-mails',(req,res)=>{
        // session.message="Please Signup or Login To Subscribe";
    const errormessage=req.session.errormessage||'';
    res.render('subsMails.ejs',{message:session.message,session:req.session,errormessage});
})
app.get('/generateTip/:category', async (req, res) => {
    try {
        const user = await  User.findOne({ email: req.session.email });
        if(req.session.signedUp||req.session.loggedIn){
            
            const locateUser=await Location.findOne({_id:user.currentLocation});
            // console.log('locate userrrr',locateUser.latitude);
            var lat=locateUser.latitude;
            var lon=locateUser.longitude;
        }
        if(!loc){
            var loc=`${lat},${lon}`;
        }
        // console.log('final lat and lon',lat,lon);
        if(lat===undefined || lon===undefined){
            loc="Pune";
        }
        // console.log("Final location of user",loc);
        
        try {
            const result = await generateTextAndImage(req.params.category,loc);
            res.json({
                imageUrl: result.imageUrl,
                tipText: result.tipText
            });
        } catch (apiError) {
            console.error("Error generating text and image:", apiError);
            
            // Send a proper error response with a status code
            if (apiError.status === 429) {
                return res.status(429).json({ 
                    error: "API rate limit exceeded. Please try again later.",
                    imageUrl: "/my_img/cloud.jpg", // Fallback image
                    tipText: "Unable to generate tip due to API limits. Please try again later."
                });
            } else {
                return res.status(500).json({ 
                    error: "An error occurred while generating content",
                    imageUrl: "/my_img/cloud.jpg", // Fallback image
                    tipText: "Unable to generate tip at this time. Please try again later."
                });
            }
        }
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ 
            error: "An error occurred on the server",
            imageUrl: "/my_img/cloud.jpg", // Fallback image
            tipText: "Server error. Please try again later."
        });
    }
});

// API Keys endpoint - Only return necessary keys with authentication check
app.get('/api/keys', (req, res) => {
    if (!req.session.loggedIn && !req.session.signedUp) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Always return the keys if user is authenticated
    res.json({
        weatherApiKey: process.env.WEATHER_API_KEY,
        pixabayApiKey: process.env.PIXABAY_API_KEY
    });
});

// News API Key endpoint
app.get('/api/news-key', (req, res) => {
    // Check if we're in production
    if (process.env.NODE_ENV === 'production') {
        // In production, keys should be configured in the client-side
        return res.json({ 
            isProduction: true,
            message: 'API keys are configured in production environment'
        });
    }
    
    res.json({
        key: process.env.NEWS_API_KEY
    });
});

//PORT 
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
