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