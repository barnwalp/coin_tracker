console.log('test');
const container = document.querySelector('.display-container');
const refresh_btn = document.getElementById('refresh');
const add_btn = document.getElementById('add');
const remove = document.querySelector('.remove');

add_btn.addEventListener('click', function(){
  console.log(add_btn);
});

refresh_btn.addEventListener('click', function(){
  console.log(refresh_btn);
});

remove.addEventListener('click', function(){
  console.log(remove);
})

// ########### API ###########
var request = new XMLHttpRequest();
request.open('GET', 'https://api2.binance.com/api/v3/ticker/24hr', true);
request.send();
request.onload = function() {
  if(request.status != 200) {
    console.log(`Error ${request.status}: ${request.statusText}`);
  } else {
    let data = JSON.parse(request.response);
    data.forEach(crypto => {
      console.log(crypto.symbol);
    });
  }
}