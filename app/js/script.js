let data;
const portfolio = document.querySelector('.portfolio');
const searched_coins = document.querySelector('.search-items');
const search_container = document.querySelector('.search-container');
const overlay = document.querySelector('.overlay');
const search = document.getElementById('coin-search');

// button references
const refresh_btn = document.getElementById('refresh');
const search_btn = document.getElementById('add-symbol');
const remove_btn = document.querySelector('.remove');

// ########### API ###########
const load_coins = async () => {
  try {
    const res = await fetch('https://api2.binance.com/api/v3/ticker/24hr');
    data = await res.json();
    console.log(data);
    display_coin(data, searched_coins);
  } catch (err) {
    console.log(err)
  }
};

// creating html list of the cryptocurrencies with coin details
// coin_data is the json data and container is the element to which 
// json data is attached after being converted to html
const display_coin = (coin_data, container) => {
  const htmlString = coin_data.map(coin => {
    return `
    <div class="coin">
      <div class="coin-data">
        <div class="coin-data-name">${coin.symbol}</div>
        <div class="coin-data-price">${coin.lastPrice} - ${coin.weightedAvgPrice}</div>
      </div>
      <button class="btn add">Add</button>
    </div>
    `
  }).join("");
  container.innerHTML = htmlString;
}

// Implementing dynamic search in the searched coin section
search.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filtered_data = data.filter(coin => {
    return coin.symbol.toLowerCase().includes(searchString)
  });
  display_coin(filtered_data, searched_coins);
});

if (searched_coins.firstChild) {
  const add_coins = document.querySelectorAll('.search-items .coin .add');
  console.log(add_coins);
  add_coins.forEach(function(add) {
    add.addEventListener('click', (e) => {
      console.log('inside add loop');
      console.log(e);
    });
  });
}

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
  console.log(refresh_btn);
});

remove_btn.addEventListener('click', function(){
  console.log(remove);
})

load_coins();