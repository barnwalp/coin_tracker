let data;
let tempData;
let portfolio_coins = ["ETHUSDT", "BTCUSDT", "XMRUSDT", "LTCUSDT"];
let portfolio_json = [];

const portfolio = document.querySelector('.portfolio');
const searched_coins = document.querySelector('.search-items');
const search_container = document.querySelector('.search-container');
const overlay = document.querySelector('.overlay');
const search = document.getElementById('coin-search');

// button references
const refresh_btn = document.getElementById('refresh');
const search_btn = document.getElementById('add-symbol');

// ########### API ###########
const load_coins = async () => {
  try {
    const res = await fetch('https://api2.binance.com/api/v3/ticker/24hr');
    data = await res.json();
    console.log('Display json data from API');
    console.log(data);
    display_coin(data, searched_coins, 'Add');
    load_portfolio();
  } catch (err) {
    console.log('Display error from API');
    console.log(err)
  }
};

// creating html list of the cryptocurrencies with coin details
// coin_data is the json data and container is the element to which 
// json data is attached after being converted to html
const display_coin = (coin_data, container, btn) => {
  const htmlString = coin_data.map(coin => {
    return `
    <div class="coin">
      <div class="coin-data">
        <div class="coin-data-name">${coin.symbol}</div>
        <div class="coin-data-price">${coin.lastPrice} - ${coin.weightedAvgPrice}</div>
      </div>
      <button class="btn ${btn[0].toLowerCase()}${btn.slice(1)}">${btn}</button>
    </div>
    `
  }).join("");
  container.innerHTML = htmlString;
}

// Getting JSON data from symbols in portfolio_coin variable
const create_portfolio_json = () => {
  portfolio_json = [];
  portfolio_coins.forEach(coin => {
    let val = data.filter(temp => {
      return temp.symbol.toLowerCase() == coin.toLowerCase();
    });
    portfolio_json.push(val[0]);
  });
  return portfolio_json;
}

// Change Add to Added for the portflio coins


// Creating portfolio based on the portfolio_coins variable
const load_portfolio = () => {
  portfolio_json = create_portfolio_json();
  console.log(portfolio_json);
  display_coin(portfolio_json, portfolio, "Remove");
}

// Implementing dynamic search in the searched coin section
search.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filtered_data = data.filter(coin => {
    return coin.symbol.toLowerCase().includes(searchString)
  });
  display_coin(filtered_data, searched_coins, "Add");
});

// Toggling the search coin overlay with search button
search_btn.addEventListener('click', function(){
  if (search_container.classList.contains('hidden')) {
    search_container.classList.remove('hidden');
    overlay.classList.add('fade-in');
    overlay.classList.remove('fade-out');
    search_btn.textContent = ' Back ';
  } else {
    search_container.classList.add('hidden');
    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');
    search_btn.textContent = 'Search';
  } 
});

refresh_btn.addEventListener('click', function(){
  load_portfolio();

});

// Adding crypto currency to the portfolio
if (searched_coins.firstChild) {
  searched_coins.addEventListener('click', (e) => {
    if (e.target.className === 'btn add') {
      let temp_coin = e.target.parentNode.childNodes[1].childNodes[1].textContent;
      portfolio_coins.push(temp_coin);
      load_portfolio();
    }
    e.stopPropagation();
  }, false)
}

// removing coins from the portfolio container
// please note that event listener is added to the 
// portfolio container and bubbling is used to connect with
// button, this way it can be ensured that button is only
// clicked after being loaded
portfolio.addEventListener('click', (e) => {
  if (e.target.className === "btn remove") {
    let temp_coin = e.target.parentNode.childNodes[1].childNodes[1].textContent;
    // console.log(temp_coin);
    let index = portfolio_coins.indexOf(temp_coin);
    portfolio_coins.splice(index, 1);
    load_portfolio();
  }
})

load_coins();