var $searchInput = document.getElementById('input');
var $searchForm = document.getElementById('search-form');
var $searchResults = document.getElementById('results');
var $resultsHeader = document.getElementById('results-header');
var $submitButton = document.querySelector('.submit-button');
var $view = document.querySelectorAll('.view');
var $bookmarks = document.querySelector('.bookmarks');
// var $bookmarksList = document.getElementById('bookmarks');

$submitButton.addEventListener('click', getResults);
$bookmarks.addEventListener('click', viewBookmarks);

function viewBookmarks(event) {
  swapView(data.view);
}

function titleCase(string) {
  string = string.toLowerCase().split(' ');
  for (var i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
  }
  return string.join(' ');
}

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
      var url = xhr.response[i].website_url;
      var type = xhr.response[i].brewery_type;
      var search = renderResults(name, street, city, state, zip, url, type);
      $searchResults.appendChild(search);
      $resultsHeader.textContent = 'Results for ' + '"' + titleCase(inputValue) + '"';
    }
    data.current = xhr.response;
  });
  xhr.send();
  $searchForm.reset();
  swapView(data.view);
}

function moreInfo(a, b, c, d) {
  if (a.className === 'view hidden') {
    a.className = 'view';
  } else if (a.className === 'view') {
    a.className = 'view hidden';
  }
  if (b.className === 'view hidden') {
    b.className = 'view';
  } else if (b.className === 'view') {
    b.className = 'view hidden';
  }
  if (c.className === 'fas fa-ellipsis fa-2x fa-icon') {
    c.className = 'fa-solid fa-caret-up fa-2x fa-icon';
  } else if (c.className === 'fa-solid fa-caret-up fa-2x fa-icon') {
    c.className = 'fas fa-ellipsis fa-2x fa-icon';
  }
  if (d.className === 'white-box white-box-dimensions') {
    d.className = 'white-box new-dimensions';
  } else if (d.className === 'white-box new-dimensions') {
    d.className = 'white-box white-box-dimensions';
  }
}

function renderResults(name, street, city, state, zip, url, type) {
  var initialDiv = document.createElement('div');
  initialDiv.className = 'white-box white-box-dimensions';

  var $name = document.createElement('h2');
  initialDiv.appendChild($name);
  $name.textContent = name;

  var $addressTitle = document.createElement('h3');
  $addressTitle.textContent = 'Address:';
  $addressTitle.className = 'underline';
  initialDiv.appendChild($addressTitle);

  var $address = document.createElement('p');
  if (street !== null) {
    $address.textContent = street;
  } else {
    $address.textContent = 'No Address Found';
  }
  initialDiv.appendChild($address);

  var $info = document.createElement('p');
  $info.textContent = city + ', ' + state + ', ' + zip;
  initialDiv.appendChild($info);

  var $url = document.createElement('a');
  if (url !== null) {
    $url.setAttribute('href', url);
    $url.textContent = 'Website: ' + url;
  } else {
    $url.textContent = 'No Website Available';
  }
  initialDiv.appendChild($url);
  $url.className = 'view hidden';

  var $type = document.createElement('p');
  initialDiv.appendChild($type);
  $type.className = 'view hidden';

  var $span1 = document.createElement('span');
  $span1.className = 'underline';
  $span1.textContent = 'Brewery Type:';
  $type.appendChild($span1);

  var $span2 = document.createElement('span');
  $span2.textContent = ' ' + titleCase(type);
  $type.appendChild($span2);

  var div1 = document.createElement('div');
  div1.className = 'justify-between flex';
  initialDiv.appendChild(div1);

  var $button = document.createElement('button');
  $button.className = 'dots-button';
  div1.appendChild($button);

  var $icon = document.createElement('i');
  $icon.className = 'fas fa-ellipsis fa-2x fa-icon';
  $button.appendChild($icon);

  var $bookmarkButton = document.createElement('button');
  $bookmarkButton.className = 'dots-button';
  div1.appendChild($bookmarkButton);

  var $plus = document.createElement('i');
  $plus.className = 'fa-solid fa-plus fa-2x';
  $bookmarkButton.appendChild($plus);
  $plus.setAttribute('result-id', data.nextResultId);

  $button.addEventListener('click', function () {
    moreInfo($url, $type, $icon, initialDiv);
  });

  $bookmarkButton.addEventListener('click', function () {
    addToBookmarks();
  });

  return initialDiv;
}

function swapView(string) {

  for (var i = 0; i < $view.length; i++) {
    if ($view[i].dataset.view === string) {
      $view[i].className = 'view hidden';
      var currentView = $view[i].dataset.view;
      data.view = currentView;
    } else {
      $view[i].className = 'view';
    }
  }
}

// function bookmarks(element) {
//   for (var i = 0; i < data.bookmarks.length; i++) {
//     var name = data.bookmarks[i].name;
//     var street = data.bookmarks[i].street;
//     var city = data.bookmarks[i].city;
//     var state = data.bookmarks[i].state;
//     var zip = data.bookmarks[i].zip;
//     var url = data.bookmarks[i].url;
//     var type = data.bookmarks[i].type;
//     var search = renderResults(name, street, city, state, zip, url, type);
//     search.addEventListener('click', getResults);
//     element.appendChild(search);
//   }
// }

function addToBookmarks() {
  data.bookmarks = 'hello';

  swapView(data.view);
}
