// =====================================
// BookEase JavaScript - FRONTEND ONLY
// =====================================

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Booking Form - NO SERVER NEEDED
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const booking = {
            service: document.getElementById("service").value,
            consultant: document.getElementById("consultant").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            notes: document.getElementById("notes").value
        };

        console.log("Booking Data:", booking);
        
        alert(`Booking confirmed! 🎉\n\nService: ${booking.service}\nConsultant: ${booking.consultant}\nDate: ${booking.date}\nTime: ${booking.time}`);
        
        bookingForm.reset();
    });
}