import axios from "axios";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// API key storage
let unsplashApiKey = null;

// Fetch API key from server
async function getApiKey() {
    try {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
            const baseUrl = window.location.origin;
            const response = await fetch(`${baseUrl}/api/keys`);
            if (!response.ok) {
                throw new Error('Failed to fetch API keys. Please ensure you are logged in.');
            }
            const keys = await response.json();
            unsplashApiKey = keys.unsplashApiKey;
            console.log('Unsplash API key loaded successfully');
        } else {
            // In Node.js environment, use environment variables directly
            unsplashApiKey = process.env.UNSPLASH_API_KEY;
            if (!unsplashApiKey) {
                console.warn('UNSPLASH_API_KEY not found in environment variables');
            } else {
                console.log('Unsplash API key loaded from environment');
            }
        }
    } catch (error) {
        console.error('Error fetching API key:', error);
        // Don't throw error here, just log it
        console.warn('Image service may not be available');
    }
}

// Initialize API key - but don't await it at module level
getApiKey().catch(console.error);

const openai = new OpenAI();
export async function generateTextAndImage(category,loc) {
    // Ensure API key is available
    if (!unsplashApiKey) {
        await getApiKey(); // Try to get key if not available
        if (!unsplashApiKey) {
            console.warn('Image service not available');
            // Return a default or fallback response instead of throwing
            return {
                tipText: ["Sorry, image service is temporarily unavailable. Please try again later."],
                imageUrl: ["default-image.jpg"] // You should have a default image in your public folder
            };
        }
    }
  
  var myprompt1;
if(category=='travel'){
    myprompt1 = `Share a must-visit ${category} destination with a unique tip in one line for ${loc} in name of city. Make your travel memorable with this insider tip!`;
}else if(category == 'fashion'){
    myprompt1 = `Discover a trendy ${category} hack to elevate your style in one line for ${loc} in name of city. Stay ahead in the fashion game with this exclusive tip!`;
}else if(category == 'sports'){
    myprompt1 = `Boost your ${category} performance with a pro tip in one line for ${loc} in name of city. Achieve your fitness goals faster with this expert advice!`;
}else if(category == 'health'){
    myprompt1 = `Improve your ${category} with a life-changing tip in one line for ${loc} in name of city. Prioritize your well-being with this invaluable suggestion!`;
}else if(category == 'food'){
    myprompt1 = `Indulge in a culinary delight with a mouthwatering ${category} recommendation in one line for ${loc} in name of city. Treat your taste buds with this delectable suggestion!`;
}else{
    myprompt1 = `Share an amazing ${category} tip in one line for ${loc} in name of city. Enhance your knowledge with this valuable insight!`;
}

  // var myprompt1=`Share one concise ${category} item important and unique tip in a complete line(end with ".") for ${loc}. Keep tip to one line or two line. Avoid inclusion of unnecessary spaces, characters and quotes.`;
  // if(category=='travel'){
  //   myprompt1 = `Share one concise ${category} place to visit important and unique tip in a complete line(end with ".") for ${loc}. Keep tip to one line or two line. Avoid inclusion of unnecessary spaces, characters and quotes.`;
  // }else if(category == 'fashion' || category=='sports'){
  //   myprompt1 = `Share one concise ${category} important and unique tip in a complete line(end with ".") for ${loc}. Keep tip to one line or two line. Avoid inclusion of unnecessary spaces, characters and quotes.`;
  // }else if(category == 'health'){
  //   myprompt1 = `Share one concise ${category} important and unique tip in a complete line(end with ".") for ${loc}. Keep tip to one line or two line. Avoid inclusion of unnecessary spaces, characters and quotes.`;
  // }
  try {
    const tipsResponse = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt:myprompt1,
        max_tokens:100,
      });

      //Clean the data to process on it
    const tips = tipsResponse.choices.map(choice => {
      //Remove numbered beggnings from the text
      // Input: "1. Apple"
      //Output: "Apple"
     
      let text = choice.text.replace(/^\d+\.\s/, '');

      //Remove \n from text
      text = text.replace(/\n/g, ' ');
      //return the array of tips response the trimmed spaces
      return text.trim();
    });

    //Summarize the received tip
    const summarizedTipsPromises = tips.map(tip => {
      var myprompt2= `Obtain a one-word or two-word keyword (use space if two words) that is descriptive and relevant to the given ${category}-related tip. The keyword should represent the primary name or category of a ${category} item. Ensure the keyword is not specific to any place and does not contain any location, street vendor, adjectives, unnecessary spaces, characters, or quotes. The image corresponding to this keyword should be available in Pixabay's storage. Tip: "${tip}"`;
     //More personalized prompt for travel tips!
      if(category=='travel'){
     myprompt2= `Obtain a one-word or two-word keyword (use space if two words) that is descriptive and relevant to the given ${category}-related tip(place to visit in ${loc} location). The keyword should represent the primary name or category of a ${category} item. Ensure the keyword is not specific to any place and does not contain any location, street vendor, adjectives, unnecessary spaces, characters, or quotes. The image corresponding to this keyword should be available in Pixabay's storage. Tip: "${tip}"`;
      }
      return openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt:myprompt2,
            max_tokens: 10,
        });
    });

    const summarizedTipsResponses = await Promise.all(summarizedTipsPromises);
    const summarizedTips = summarizedTipsResponses.map(response => {
        let text = response.choices[0].text;
        text = text.replace(/\n/g, ' ');
        return text.trim();
    });

    //Using the summarized text as KEYWORD for requesting images
    const images = await Promise.all(summarizedTips.map(summary => {
      return axios.get('https://api.unsplash.com/photos/', {
        headers: {
            Authorization: `Client-ID ${unsplashApiKey}`,
        },
        params: {
            query: summary,
        },
    });
      
      // return axios.get('https://pixabay.com/api/', {
        //     params: {
        //         key: '41759909-caf53597cb8c109225bf573b3',
        //         q: summary,
        //         image_type: 'photo',
        //     },
        // });
    }));
    //Selecting the type of photo
    const imageUrls = images.map(response => {
      return response.data.results.map(photo => photo.urls.full);
  });

    const tipText = tips;
    //Selecting the FIRST image
    const imageUrl = imageUrls[0];

    //Creating an object of the FINAL -> tip and image
    const result = { tipText, imageUrl };
    // console.log("result", result);

    return result;
  } catch (error) {
    console.error("Error generating text and image:", error);
    throw error;
  }
}
