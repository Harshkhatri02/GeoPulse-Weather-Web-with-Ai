// API key storage
let newsApiKey = null;
let apiKeyPromise = null;

// Remove dotenv import since it's not needed in browser
// dotenv is for Node.js environment only

// Fetch API key from server
async function getApiKey() {
    if (apiKeyPromise) {
        return apiKeyPromise;
    }

    apiKeyPromise = new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('/api/news-key');
            if (!response.ok) {
                throw new Error('Failed to fetch API key. Please ensure you are logged in.');
            }
            const data = await response.json();
            
            // Handle the API key response
            if (data.key) {
                newsApiKey = data.key;
                console.log('News API key loaded successfully');
            }
            resolve(newsApiKey);
        } catch (error) {
            console.error('Error fetching API key:', error);
            reject(error);
        }
    });

    return apiKeyPromise;
}

// Initialize API key
getApiKey().catch(error => {
    console.error('Initial API key fetch failed:', error);
});

// Debounce utility function to limit how often a function is executed
function debounce(func, wait = 200) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Get the div-for-search element
const searchDiv = document.querySelector(".div-for-search");
const secondSec = document.querySelector(".section-two");
var scrollUpdated = false;

// Get the search-bar and search-btn elements
const searchBar = searchDiv.querySelector(".search-bar");
const searchBtn = searchDiv.querySelector(".search-btn");
const weatherContainer = document.querySelector('.weather-container');

// Get the section-two element
const section = document.querySelector(".section-two");

// Fetch news articles from NEWS API
const fetchNews = async (query) => {
    try {
        // Make sure we have the API key
        if (!newsApiKey) {
            await getApiKey();
        }
        
        const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${newsApiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
};

// Create a news article div
const createNewsDiv = (article) => {
  const newsDiv = document.createElement("div");
  newsDiv.className = "news";

  const newsImg = document.createElement("img");
  newsImg.className = "news-image";
  newsImg.src = article.urlToImage;

  const newsLink = document.createElement("a");
  newsLink.className = "news-link";
  newsLink.href = article.url;
  newsLink.target = "_blank";
  newsLink.textContent = article.title;

  const newsHeadline = document.createElement("div");
  newsHeadline.className = "news-headline";
  newsHeadline.appendChild(newsLink);

  newsDiv.appendChild(newsImg);
  newsDiv.appendChild(newsHeadline);

  return newsDiv;
};

// Initialize LocomotiveScroll
window.locomotiveScroll = new LocomotiveScroll({
  el: document.querySelector('.weather-container'),
  smooth: true,
  scroll: {
    overflowY: 'auto',
    overflowX: 'auto'
  }
});

// Use the globally accessible variable
const scroll = window.locomotiveScroll;

// Display news articles in section-two
const displayNews = (articles = []) => {
    console.log('Displaying articles:', articles.length);
    section.innerHTML = "";
    articles.forEach((article) => {
        if (article && article.title) {
            const newsDiv = createNewsDiv(article);
            newsDiv.classList.add("news-content");
            section.appendChild(newsDiv);
        }
    });
    
    // Hide document scrollbar when locomotive scroll updates
    document.body.style.overflow = 'hidden';
    scroll.update();
};

// Debounced search function
const debouncedSearch = debounce(async () => {
    const query = searchBar.value.trim();
    console.log('Search triggered for:', query);
    if (query) {
        try {
            const articles = await fetchNews(query);
            displayNews(articles || []);
        } catch (error) {
            console.error('Search error:', error);
            displayNews([]);
        }
    }
}, 500);

// Add event listeners
searchBar.addEventListener("input", debouncedSearch);
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log('Search button clicked');
    const query = searchBar.value.trim();
    if (query) {
        const articles = await fetchNews(query);
        displayNews(articles || []);
    }
});

// Test if elements are found
console.log('Search bar found:', !!searchBar);
console.log('Search button found:', !!searchBtn);
console.log('Section found:', !!section);

// Debounce LocomotiveScroll updates
const debouncedScrollUpdate = debounce(() => scroll.update(), 150);
window.addEventListener('resize', debouncedScrollUpdate);

