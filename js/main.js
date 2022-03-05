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

function moreInfo($url, $type, $icon, initialDiv) {
  if ($url.className === 'view hidden') {
    $url.className = 'view';
  } else if ($url.className === 'view') {
    $url.className = 'view hidden';
  }
  if ($type.className === 'view hidden') {
    $type.className = 'view';
  } else if ($type.className === 'view') {
    $type.className = 'view hidden';
  }
  if ($icon.className === 'fas fa-ellipsis fa-2x fa-icon') {
    $icon.className = 'fa-solid fa-caret-up fa-2x fa-icon';
  } else if ($icon.className === 'fa-solid fa-caret-up fa-2x fa-icon') {
    $icon.className = 'fas fa-ellipsis fa-2x fa-icon';
  }
  if (initialDiv.className === 'white-box white-box-dimensions') {
    initialDiv.className = 'white-box new-dimensions';
  } else if (initialDiv.className === 'white-box new-dimensions') {
    initialDiv.className = 'white-box white-box-dimensions';
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

  $button.addEventListener('click', moreInfo);

  // $button.addEventListener('click', moreInfo);
  // function moreInfo(event) {
  //   if ($url.className === 'view hidden') {
  //     $url.className = 'view';
  //   } else if ($url.className === 'view') {
  //     $url.className = 'view hidden';
  //   }
  //   if ($type.className === 'view hidden') {
  //     $type.className = 'view';
  //   } else if ($type.className === 'view') {
  //     $type.className = 'view hidden';
  //   }
  //   if ($icon.className === 'fas fa-ellipsis fa-2x fa-icon') {
  //     $icon.className = 'fa-solid fa-caret-up fa-2x fa-icon';
  //   } else if ($icon.className === 'fa-solid fa-caret-up fa-2x fa-icon') {
  //     $icon.className = 'fas fa-ellipsis fa-2x fa-icon';
  //   }
  //   if (initialDiv.className === 'white-box white-box-dimensions') {
  //     initialDiv.className = 'white-box new-dimensions';
  //   } else if (initialDiv.className === 'white-box new-dimensions') {
  //     initialDiv.className = 'white-box white-box-dimensions';
  //   }
  // }
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
