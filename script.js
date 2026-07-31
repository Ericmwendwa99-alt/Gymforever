//====================================
// MEMBERSHIP PLAN SELECTION
//====================================

const planButtons = document.querySelectorAll(".plan-btn");

planButtons.forEach(function(button) {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        const selectedPlan = button.dataset.plan;

        alert("You selected the " + selectedPlan + " membership plan.");

    });

});


//====================================
// CONTACT FORM VALIDATION
//====================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const formMessage = document.getElementById("formMessage");


        // Check empty fields
        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            formMessage.textContent = "Please fill in all fields.";
            formMessage.style.color = "red";

            return;
        }


        // Check email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            formMessage.style.color = "red";

            return;
        }


        // Successful validation
        formMessage.textContent =
            "Message sent successfully!";

        formMessage.style.color = "#FFC107";

        contactForm.reset();

    });

}
//====================================
// CLASS FILTER
//====================================

const filterButtons = document.querySelectorAll(".filter-btn");

const classCards = document.querySelectorAll(".class-card");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedFilter = button.dataset.filter;


        // Change active button
        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        // Show or hide cards
        classCards.forEach(function(card) {

            const category = card.dataset.category;

            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});