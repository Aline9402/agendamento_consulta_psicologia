
        // Navigation
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update navigation
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                link.classList.add('text-gray-600', 'hover:bg-gray-100');
            });
            
            event.target.classList.add('active');
            event.target.classList.remove('text-gray-600', 'hover:bg-gray-100');
        }

        // Calendar functionality
        let currentDate = new Date();
        let selectedDate = null;
        let selectedTime = null;

        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const timeSlots = [
            '08:00', '09:00', '10:00', '11:00', 
            '14:00', '15:00', '16:00', '17:00'
        ];

        function updateCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            document.getElementById('currentMonth').textContent = `${months[month]} ${year}`;
            
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            const calendarDays = document.getElementById('calendarDays');
            calendarDays.innerHTML = '';
            
            // Empty cells for days before month starts
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                calendarDays.appendChild(emptyDay);
            }
            
            // Days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day text-center py-2 cursor-pointer rounded-lg hover:bg-blue-100';
                dayElement.textContent = day;
                
                const dayDate = new Date(year, month, day);
                const today = new Date();
                
                // Disable past dates
                if (dayDate < today.setHours(0,0,0,0)) {
                    dayElement.className += ' text-gray-300 cursor-not-allowed';
                } else {
                    dayElement.onclick = () => selectDate(year, month, day);
                }
                
                calendarDays.appendChild(dayElement);
            }
        }

        function selectDate(year, month, day) {
            selectedDate = new Date(year, month, day);
            
            // Update visual selection
            document.querySelectorAll('.calendar-day').forEach(el => {
                el.classList.remove('selected-date');
            });
            event.target.classList.add('selected-date');
            
            // Show available time slots
            showTimeSlots();
        }

        function showTimeSlots() {
            const timeSlotsContainer = document.getElementById('timeSlots');
            timeSlotsContainer.innerHTML = '';
            
            timeSlots.forEach(time => {
                const timeButton = document.createElement('button');
                timeButton.className = 'time-slot w-full p-3 border border-gray-300 rounded-lg hover:bg-blue-50 transition-all duration-200';
                timeButton.textContent = time;
                timeButton.onclick = () => selectTime(time, timeButton);
                timeSlotsContainer.appendChild(timeButton);
            });
        }

        function selectTime(time, element) {
            selectedTime = time;
            
            // Update visual selection
            document.querySelectorAll('.time-slot').forEach(el => {
                el.classList.remove('selected-time');
            });
            element.classList.add('selected-time');
            
            // Show booking form
            showBookingForm();
        }

        function showBookingForm() {
            const form = document.getElementById('bookingForm');
            form.style.display = 'block';
            
            // Update selected date and time display
            const dateStr = selectedDate.toLocaleDateString('pt-BR');
            document.getElementById('selectedDateDisplay').textContent = dateStr;
            document.getElementById('selectedTimeDisplay').textContent = selectedTime;
            
            // Scroll to form
            form.scrollIntoView({ behavior: 'smooth' });
        }

        function previousMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar();
        }

        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar();
        }

        function submitBooking(event) {
            event.preventDefault();
            
            // Simulate booking submission
            alert('Agendamento realizado com sucesso! Você receberá uma confirmação por e-mail em breve.');
            
            // Reset form
            event.target.reset();
            document.getElementById('bookingForm').style.display = 'none';
            selectedDate = null;
            selectedTime = null;
            
            // Reset calendar selection
            document.querySelectorAll('.calendar-day').forEach(el => {
                el.classList.remove('selected-date');
            });
            document.getElementById('timeSlots').innerHTML = '<p class="text-gray-500 text-center py-8">Selecione uma data para ver os horários</p>';
        }

        function submitContact(event) {
            event.preventDefault();
            alert('Mensagem enviada com sucesso! Retornaremos o contato em breve.');
            event.target.reset();
        }

        // Initialize calendar
        updateCalendar();
(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'974ac2dc4414f256',t:'MTc1NjEyMTQ2Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();