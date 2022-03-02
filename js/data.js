/* exported data */

var data = {
  results: [],
  moreInfo: null,
  view: '',
  searchPageView: '',
  bookmarks: []
};

var previousResultsJSON = localStorage.getItem('results-list');

if (previousResultsJSON !== null) {
  data = JSON.parse(previousResultsJSON);
}

function handleUnload(event) {
  var resultsJSON = JSON.stringify(data);
  localStorage.setItem('results-list', resultsJSON);
}

window.addEventListener('beforeunload', handleUnload);
