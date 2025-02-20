const modal = document.getElementById('appointment-modal');
const openModalButton = document.getElementById('open-appointment-form');
const closeModalButton = document.getElementById('close-modal');

openModalButton.onclick = function() {
    modal.style.display = "block";
};

closeModalButton.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

const datePicker = document.getElementById('date-picker');

function generateDates() {
    const today = new Date();
    datePicker.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        let futureDate = new Date();
        futureDate.setDate(today.getDate() + i);
        
        let formattedDate = futureDate.toISOString().split('T')[0];  
        
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-date', formattedDate);
        card.textContent = formattedDate;

        card.addEventListener('click', function() {
            document.querySelectorAll('#date-picker .card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            updateAvailableTimes(formattedDate);

            localStorage.setItem("selectedDate", formattedDate);
        });

        datePicker.appendChild(card);
    }


    const savedDate = localStorage.getItem("selectedDate");
    if (savedDate) {
        const savedCard = document.querySelector(`[data-date="${savedDate}"]`);
        if (savedCard) {
            savedCard.classList.add("selected");
            updateAvailableTimes(savedDate);
        }
    }
}

function updateAvailableTimes(date) {
    const timePicker = document.getElementById('time-picker');
    timePicker.innerHTML = '';

    let availableTimes = ["08:00", "10:00", "12:00", "14:00", "16:00"];
    
    availableTimes.forEach(time => {
        const timeCard = document.createElement('div');
        timeCard.classList.add('hour-card');
        timeCard.textContent = time;
        timeCard.addEventListener('click', function() {
            document.querySelectorAll('.hour-card').forEach(t => t.classList.remove('selected'));
            timeCard.classList.add('selected');


            localStorage.setItem("selectedTime", time);
        });
        timePicker.appendChild(timeCard);
    });


    const savedTime = localStorage.getItem("selectedTime");
    if (savedTime) {
        const savedTimeCard = [...document.querySelectorAll(".hour-card")].find(t => t.textContent === savedTime);
        if (savedTimeCard) {
            savedTimeCard.classList.add("selected");
        }
    }
}


document.addEventListener("DOMContentLoaded", function() {
    generateDates();
});
