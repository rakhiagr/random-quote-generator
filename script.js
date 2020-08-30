const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader= document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Qoute from API
async function getQuote() {
    showLoadingSpinner();
    //We need to use a Proxy URL to make our API call in order to avaoid
    const proxyUrl = 'https://pacific-badlands-15182.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //Check if the Author field is not available/blank, add 'Unknown'
        if (data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        // Dynamically reduce font sizes for long quotes
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();

    } catch(error) {
        getQuote();
    }
}

//Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const hashtag = 'QuoteoftheDay'
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}&hashtags=${hashtag}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();