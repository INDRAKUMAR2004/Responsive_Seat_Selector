const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const bookSeatButton = document.getElementById("bookSeatButton");

populateUI();

let ticketPrice = +movieSelect.value;

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("sold")) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Book button click event
bookSeatButton.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  selectedSeats.forEach(seat => {
    seat.classList.remove("selected");
    seat.classList.add("sold");
  });
  updateSelectedCount();
  localStorage.clear(); // Clear localStorage to reset on refresh
});

// Initial count and total set
updateSelectedCount();

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  const images = carousel.querySelectorAll('img');
  let currentIndex = 0;
  
  function showImage(index) {
      images.forEach((img, i) => {
          img.classList.remove('visible');
          if (i === index) {
              img.classList.add('visible');
          }
      });
  }

  function moveToNextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
  }

  // Initialize the first image as visible
  showImage(currentIndex);

  // Change image every 3 seconds
  setInterval(moveToNextImage, 2000);
});

document.body.addEventListener('touchstart', function() {
  document.body.classList.add('no-cursor');
});

document.body.addEventListener('mousedown', function() {
  document.body.classList.add('no-cursor');
});

// Optional: If you want to remove the no-cursor class when the user stops touching/clicking
document.body.addEventListener('touchend', function() {
  document.body.classList.remove('no-cursor');
});

document.body.addEventListener('mouseup', function() {
  document.body.classList.remove('no-cursor');
});