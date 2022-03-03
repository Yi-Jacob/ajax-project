var $searchInput = document.getElementById('input');
var $submitButton = document.querySelector('.submit-button');
var $searchForm = document.getElementById('search-form');
var $searchResults = document.getElementById('results');

$submitButton.addEventListener('click', getResults);

function getResults(event) {
  event.preventDefault();
  var inputValue = $searchInput.value;
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
  name.textContent = name;

  var $addressTitle = document.createElement('h4');
  $addressTitle.textContent = 'Address:';
  $name.appendChild($addressTitle);

  var $address = document.createElement('p');
  $address.textContent = street;
  $addressTitle.appendChild($address);

  var $info = document.createElement('p');
  $info.textContent = city + ', ' + state + ', ' + zip;
  $address.appendChild($info);

  return initialDiv;
}

function getBreweries() {

}
