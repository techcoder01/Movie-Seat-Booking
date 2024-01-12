const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateUI();

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Copy selected seats into arr
    // Map through Array
    // return a new array indexes

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    console.log(seatsIndex)

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get Data from LocalStorage and populate Ui

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie Select Event
movieSelect.addEventListener('change' , e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
})

// Seat Click Event
container.addEventListener('click', (e) => {
    if(
    e.target.classList.contains('seat') &&
     !e.target.classList.contains('occupied')
     ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
})

// Initial Count and Total Set
updateSelectedCount();