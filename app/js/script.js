let data;
const display_container = document.querySelector('.display-container');
const refresh_btn = document.getElementById('refresh');
const add_symbol = document.getElementById('add-symbol');
const remove = document.querySelector('.remove');
const search_items = document.querySelector('.search-items');
const container = document.querySelector('.container');
const overlay = document.querySelector('.overlay');
const search = document.getElementById('coin-search');

// ########### API ###########
var request = new XMLHttpRequest();
request.open('GET', 'https://api2.binance.com/api/v3/ticker/24hr', true);
request.send();
request.onload = function() {
  if(request.status != 200) {
    console.log(`Error ${request.status}: ${request.statusText}`);
  } else {
    data = JSON.parse(request.response);
    // Adding data to the container using javascript
    display_coin(data);
  }
}
    // data.forEach(crypto => {
    //   const coin = document.createElement('div');
    //   coin.setAttribute('class', 'coin');
    //   const left = document.createElement('div');
    //   left.setAttribute('class', 'left');
    //   const coin_name = document.createElement('div');
    //   coin_name.setAttribute('class', 'coin-name')
    //   coin_name.textContent = crypto.symbol;
    //   const coin_price = document.createElement('div');
    //   coin_price.setAttribute('class', 'coin-price');
    //   let price = `${crypto.lastPrice} - ${crypto.weightedAvgPrice}`
    //   coin_price.textContent = price;
    //   console.log(price);
    //   const add_btn = document.createElement('button');
    //   add_btn.setAttribute('class', 'btn add');
    //   add_btn.textContent = 'Add';
    //   search_items.append(coin);
    //   coin.append(left);
    //   left.append(coin_name);
    //   left.append(coin_price);
    //   coin.append(add_btn);
    // });

const display_coin = (data) => {
  const htmlString = data.map(coin => {
    return `
    <div class="coin">
      <div class="left">
        <div class="coin-name">${coin.symbol}</div>
        <div class="coin-price">${coin.lastPrice} - ${coin.weightedAvgPrice}</div>
      </div>
      <button class="btn add">Add</button>
    </div>
    `
  }).join("");
  search_items.innerHTML = htmlString;
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
  // console.log(add_symbol);
});

refresh_btn.addEventListener('click', function(){
  console.log(refresh_btn);
});

remove.addEventListener('click', function(){
  console.log(remove);
})