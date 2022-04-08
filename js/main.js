/*
var $searchInput = document.getElementById('input');
var $searchForm = document.getElementById('search-form');
var $searchResults = document.getElementById('results');
var $resultsHeader = document.getElementById('results-header');
var $submitButton = document.querySelector('.submit-button');
var $view = document.querySelectorAll('.view');

$submitButton.addEventListener('click', getResults);

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

  if (street !== null) {
    var $address = document.createElement('p');
    $address.textContent = street;
    initialDiv.appendChild($address);
  }

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

  var $button = document.createElement('button');
  $button.className = 'dots-button';
  initialDiv.appendChild($button);

  var $icon = document.createElement('i');
  $icon.className = 'fas fa-ellipsis fa-2x fa-icon';
  $button.appendChild($icon);

  $button.addEventListener('click', function () {
    moreInfo($url, $type, $icon, initialDiv);
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
*/

var $searchInput = document.getElementById('input');
var $searchForm = document.getElementById('search-form');
var $searchResults = document.getElementById('results');
var $resultsHeader = document.getElementById('results-header');
var $submitButton = document.querySelector('.submit-button');
var $view = document.querySelectorAll('.bigView');
var $showBookmark = document.getElementById('bookmark');
var $bookmarks = document.getElementById('bookmarks');
var $home = document.getElementById('home');

$submitButton.addEventListener('click', getResults);
$showBookmark.addEventListener('click', function () {
  swapView('bookmarks-page');
});
$home.addEventListener('click', function () {
  swapView('search-page');
});
swapView(data.view);

onLoad();
function onLoad() {
  var buttons = $bookmarks.getElementsByClassName('dots-button');
  for (var button of buttons) {
    button.addEventListener('click', onClickDots);
  }
  buttons = $bookmarks.getElementsByClassName('minus-button');
  // eslint-disable-next-line no-redeclare
  for (var button of buttons) {
    button.addEventListener('click', onClickMinus);
  }

  buttons = $searchResults.getElementsByClassName('dots-button');
  // eslint-disable-next-line no-redeclare
  for (var button of buttons) {
    button.addEventListener('click', onClickDots);
  }
  buttons = $searchResults.getElementsByClassName('plus-button');
  // eslint-disable-next-line no-redeclare
  for (var button of buttons) {
    button.addEventListener('click', saveBookmark);
  }
}

function onClickDots(event) {
  var targetElement = event.target || event.srcElement;
  var button = targetElement.parentElement;
  var div = button.parentElement;

  var url = div.getElementsByClassName('view')[0];

  var type = div.getElementsByClassName('view')[1];
  var icon = div.getElementsByTagName('i')[0];

  moreInfo(url, type, icon, div);
}

function onClickMinus(event) {
  var targetElement = event.target || event.srcElement;
  var button = targetElement.parentElement;
  var div = button.parentElement;
  div.remove();
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
  $searchResults.innerHTML = '';
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
  });
  xhr.send();
  $searchForm.reset();
  swapView('results-page');
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

  if (street !== null) {
    var $address = document.createElement('p');
    $address.textContent = street;
    initialDiv.appendChild($address);
  }

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

  var $button = document.createElement('button');
  $button.className = 'dots-button';
  initialDiv.appendChild($button);

  var $icon = document.createElement('i');
  $icon.className = 'fas fa-ellipsis fa-2x fa-icon';
  $button.appendChild($icon);

  $button.addEventListener('click', function () {
    moreInfo($url, $type, $icon, initialDiv);
  });

  var $button1 = document.createElement('button');
  $button1.className = 'plus-button';
  initialDiv.appendChild($button1);

  var $icon1 = document.createElement('i');
  $icon1.className = 'fas fa-plus fa-2x fa-icon';
  $button1.appendChild($icon1);

  $button1.addEventListener('click', saveBookmark);

  return initialDiv;
}

function saveBookmark(event) {
  var targetElement = event.target || event.srcElement;
  var plusButton = targetElement.parentElement;
  var initialDiv = plusButton.parentElement;

  plusButton.remove();
  var $button1 = document.createElement('button');
  $button1.className = 'minus-button';
  initialDiv.appendChild($button1);

  var $icon1 = document.createElement('i');
  $icon1.className = 'fas fa-minus fa-2x fa-icon';
  $button1.appendChild($icon1);

  $button1.addEventListener('click', function () {
    initialDiv.remove();
  });

  $bookmarks.appendChild(initialDiv);
}

function swapView(string) {
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].dataset.view === string) {
      $view[i].className = 'bigView';
      var currentView = $view[i].dataset.view;
      data.view = currentView;
    } else {
      $view[i].className = 'bigView hidden';
    }
  }
}
