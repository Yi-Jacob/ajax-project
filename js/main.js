var $searchInput = document.getElementById('input');
var $submitButton = document.querySelector('.submit-button');
var $searchForm = document.getElementById('search-form');
var $searchResults = document.getElementById('results');
var $resultsHeader = document.getElementById('results-header');

$submitButton.addEventListener('click', getResults);

function getResults(event) {
  event.preventDefault();
  var inputValue = $searchInput.value;

  function titleCase(string) {
    string = string.toLowerCase().split(' ');
    for (var i = 0; i < string.length; i++) {
      string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
    }
    return string.join(' ');
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.openbrewerydb.org/breweries?by_city=' + inputValue);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.length; i++) {
      var name = xhr.response[i].name;
      var street = xhr.response[i].street;
      var city = xhr.response[i].city;
      var state = xhr.response[i].state;
      var zip = xhr.response[i].postal_code;
      var search = renderResults(name, street, city, state, zip);
      search.addEventListener('click', getBreweries);
      $searchResults.appendChild(search);
      $resultsHeader.textContent = 'Results for ' + '"' + titleCase(inputValue) + '"';
    }
  });
  xhr.send();
  $searchForm.reset();

}

function renderResults(name, street, city, state, zip) {
  var initialDiv = document.createElement('div');
  initialDiv.className = 'white-box';

  var $name = document.createElement('h3');
  initialDiv.appendChild($name);
  $name.textContent = name;

  var $addressTitle = document.createElement('h4');
  $addressTitle.textContent = 'Address:';
  initialDiv.appendChild($addressTitle);

  var $address = document.createElement('p');
  $address.textContent = street;
  initialDiv.appendChild($address);

  var $info = document.createElement('p');
  $info.textContent = city + ', ' + state + ', ' + zip;
  initialDiv.appendChild($info);

  return initialDiv;
}

function getBreweries() {

}
