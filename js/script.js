
        const modal = document.getElementById('appointment-modal');
        const openModalButton = document.getElementById('open-appointment-form');
        const closeModalButton = document.getElementById('close-modal');

        openModalButton.onclick = function() {
            modal.style.display = "block";
        }

        closeModalButton.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }


        const dateCards = document.querySelectorAll('#date-picker .card');
        dateCards.forEach(card => {
            card.addEventListener('click', function() {
                dateCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                updateAvailableTimes(card.getAttribute('data-date'));
            });
        });

  
        function updateAvailableTimes(date) {
            const timePicker = document.getElementById('time-picker');
            timePicker.innerHTML = ''; 

            
            let availableTimes = [];
            if (date === "2025-02-20") {
                availableTimes = ["10:00", "12:00", "14:00", "16:00"];
            } else if (date === "2025-02-21") {
                availableTimes = ["09:00", "11:00", "13:00", "15:00"];
            } else if (date === "2025-02-22") {
                availableTimes = ["08:00", "10:00", "12:00", "14:00"];
            }

            availableTimes.forEach(time => {
                const timeCard = document.createElement('div');
                timeCard.classList.add('hour-card');
                timeCard.textContent = time;
                timeCard.addEventListener('click', function() {
                    const allTimeCards = document.querySelectorAll('.hour-card');
                    allTimeCards.forEach(t => t.classList.remove('selected'));
                    timeCard.classList.add('selected');
                });
                timePicker.appendChild(timeCard);
            });
        }