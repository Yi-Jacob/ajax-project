/* exported data */
/*
var data = {
  bookmarks: '',
  results: '',
  detail: null,
  removeId: 0,
  nextResultId: 0,
  view: '',
  header: ''
};

var previousResultsJSON = localStorage.getItem('results-list');

var $bookmarks = document.getElementById('bookmarks');
var $searchResults = document.getElementById('results');
var $resultsHeader = document.getElementById('results-header');

window.addEventListener('beforeunload', handleUnload);

if (previousResultsJSON !== null) {
  data = JSON.parse(previousResultsJSON);

  $bookmarks.textContent = data.bookmarks;
  $searchResults.textContent = data.results;
  $resultsHeader.textContent = data.header;
}

function handleUnload(event) {
  data.results = $searchResults.textContent;
  data.header = $resultsHeader.textContent;
  data.bookmarks = $bookmarks.textContent;
  var resultsJSON = JSON.stringify(data);
  localStorage.setItem('results-list', resultsJSON);
}
*/
var data = {
  bookmarks: '',
  results: '',
  detail: null,
  removeId: 0,
  nextResultId: 0,
  view: '',
  header: ''
};

var previousResultsJSON = localStorage.getItem('results-list');

var $bookmarks = document.getElementById('bookmarks');
var $searchResults = document.getElementById('results');
var $resultsHeader = document.getElementById('results-header');

window.addEventListener('beforeunload', handleUnload);

if (previousResultsJSON !== null) {
  data = JSON.parse(previousResultsJSON);

  $bookmarks.innerHTML = data.bookmarks;
  $searchResults.innerHTML = data.results;
  $resultsHeader.innerHTML = data.header;
}

function handleUnload(event) {
  data.results = $searchResults.innerHTML;
  data.header = $resultsHeader.innerHTML;
  data.bookmarks = $bookmarks.innerHTML;
  var resultsJSON = JSON.stringify(data);
  localStorage.setItem('results-list', resultsJSON);
}
