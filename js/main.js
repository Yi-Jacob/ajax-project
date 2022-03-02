var $searchInput = document.getElementById('input');
var $submitButton = document.querySelector('.submit-button');
var $searchForm = document.getElementById('search-form');

$submitButton.addEventListener('click', getResults);

function getResults(event) {

  var inputValue = $searchInput.value;

  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.openbrewerydb.org/breweries?by_city=' + inputValue);

  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

  });
  xhr.send();
  $searchForm.reset();
}
