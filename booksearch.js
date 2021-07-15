let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let selectDisplayCountEl = document.getElementById("selectDisplayCount");
let spinnerEl = document.getElementById("spinner");
let searchResultsHeadingEl = document.getElementById("searchResultsHeading");

let noOfResults = 10;
selectDisplayCountEl.addEventListener("change", function (event) {
  noOfResults = parseInt(event.target.value);
});

function createAndAppendSearchResult(result) {
  let { title, imageLink, author } = result;

  let columnElement = document.createElement("div");
  columnElement.classList.add("col-6", "col-md-4");
  searchResultsEl.appendChild(columnElement);

  let bookContainerElement = document.createElement("div");
  bookContainerElement.classList.add("text-center");
  columnElement.appendChild(bookContainerElement);

  let imageElement = document.createElement("img");
  imageElement.src = imageLink;
  imageElement.classList.add("w-100");
  bookContainerElement.appendChild(imageElement);

  let authorElement = document.createElement("p");
  authorElement.textContent = author;
  bookContainerElement.appendChild(authorElement);
}

function displayResults(searchResults) {
  spinnerEl.classList.add("d-none");

  if (searchResults.length >= 1) {
    searchResultsHeadingEl.classList.remove("d-none");
    searchResultsHeadingEl.textContent = "Popular Books";
    searchResultsHeadingEl.classList.remove("text-center");

    for (let result of searchResults) {
      createAndAppendSearchResult(result);
    }
  } else {
    searchResultsHeadingEl.classList.remove("d-none");
    searchResultsHeadingEl.textContent = "No results found";
    searchResultsHeadingEl.classList.add("text-center");
  }
}

function searchBooks(event) {
  if (event.key === "Enter") {
    spinnerEl.classList.remove("d-none");
    searchResultsHeadingEl.classList.add("d-none");
    searchResultsEl.textContent = "";

    let searchInput = searchInputEl.value;
    let url =
      "https://apis.ccbp.in/book-store?title=" +
      searchInput +
      "&maxResults=" +
      noOfResults;
    let options = {
      method: "GET",
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let { search_results } = jsonData;
        displayResults(search_results);
      });
  }
}

searchInputEl.addEventListener("keydown", searchBooks);
