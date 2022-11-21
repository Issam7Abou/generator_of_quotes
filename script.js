//this variables below are for storing HTML tags/classes/id in JS variables
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
// This variable is for storing the data received from the api function
let apiQuotes = [];

//in this function the loader will show but the quote container will not show
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//and this function the loader will NOT show and the quote container will SHOW
function notLoading() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// this function "randomQuote()" will provide a random quote at a time from the 8000 quotes from the async api function
function randomQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  authorText.textContent = quote.author;
  // This code is for the length of the quote length, if it´s to long it will apply some css to make it more pleasent
  if(quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  notLoading();
}

//this async function will get the quotes from the api provided in the const apiUrl
async function getQuotes() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
  try {
    const data = await fetch(apiUrl);
    apiQuotes = await data.json();
    randomQuote();
  } catch (error) {
    alert(error);
  }
}

// this function will allow the functionality of the twitter button to tweet to current quote
function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, '_blank');
}

//this will be the eventlistener for the two buttons
newQuoteBtn.addEventListener('click', randomQuote);
twitterBtn.addEventListener('click', tweetQuote);


//this line of code is to call the async api function
getQuotes();

