var $searchInput = document.getElementById('input');
var $submitButton = document.querySelector('.submit-button');

function submitInput(event) {

  var inputValue = $searchInput.value;

  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.openbrewerydb.org/breweries?by_city=' + inputValue);

  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.response);
  });

  xhr.send();

}

$submitButton.addEventListener('click', submitInput);
