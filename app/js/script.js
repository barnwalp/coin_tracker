let data;
const display_container = document.querySelector('.portfolio');
const refresh_btn = document.getElementById('refresh');
const add_symbol = document.getElementById('add-symbol');
const remove = document.querySelector('.remove');
const search_items = document.querySelector('.search-items');
const container = document.querySelector('.container');
const overlay = document.querySelector('.overlay');
const search = document.getElementById('coin-search');

// ########### API ###########
const load_coins = async () => {
  try {
    const res = await fetch('https://api2.binance.com/api/v3/ticker/24hr');
    data = await res.json();
    console.log(data);
    display_coin(data);
  } catch (err) {
    console.log(err)
  }
};

const display_coin = (coin_data) => {
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
  search_items.innerHTML = htmlString;
}

search.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filtered_data = data.filter(coin => {
    return coin.symbol.toLowerCase().includes(searchString)
  });
  display_coin(filtered_data);
});

if (search_items.firstChild) {
  const add_coins = document.querySelectorAll('.search-items .coin .add');
  console.log(add_coins);
  add_coins.forEach(function(add) {
    add.addEventListener('click', (e) => {
      console.log('inside add loop');
      console.log(e);
    });
  });
}

add_symbol.addEventListener('click', function(){
  if (container.classList.contains('hidden')) {
    container.classList.remove('hidden');
    overlay.classList.add('fade-in');
    overlay.classList.remove('fade-out');
    add_symbol.textContent = ' Back ';
  } else {
    container.classList.add('hidden');
    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');
    add_symbol.textContent = 'Search';
  } 
});

refresh_btn.addEventListener('click', function(){
  console.log(refresh_btn);
});

remove.addEventListener('click', function(){
  console.log(remove);
})

load_coins();