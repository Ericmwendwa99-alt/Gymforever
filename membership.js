document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  emailjs.init("6-a14wTZq30gNN-b0");

  const planCards = document.querySelectorAll(".plan-card");
  const selectedPlanName = document.getElementById("selectedPlanName");
  const membershipPlanInput = document.getElementById("membershipPlan");
  const summaryPlan = document.getElementById("summaryPlan");
  const monthlyFee = document.getElementById("monthlyFee");
  const calculatorDuration = document.getElementById("calculatorDuration");
  const membershipLength = document.getElementById("membershipLength");
  const membershipDuration = document.getElementById("membershipDuration");
  const membershipDiscount = document.getElementById("membershipDiscount");
  const membershipTotal = document.getElementById("membershipTotal");
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");
  const calculateBmiBtn = document.getElementById("calculateBmi");
  const bmiValue = document.getElementById("bmiValue");
  const bmiStatus = document.getElementById("bmiStatus");
  const bmiMessage = document.getElementById("bmiMessage");
  const membershipForm = document.getElementById("membershipRegistrationForm");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const ageInput = document.getElementById("age");
  const genderInput = document.getElementById("gender");
  const startDateInput = document.getElementById("startDate");
  const emergencyContactInput = document.getElementById("emergencyContact");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const ageError = document.getElementById("ageError");
  const genderError = document.getElementById("genderError");
  const startDateError = document.getElementById("startDateError");
  const planError = document.getElementById("planError");

  const successModal = document.getElementById("successModal");
  const memberName = document.getElementById("memberName");
  const selectedMembership = document.getElementById("selectedMembership");
  const closeSuccessModal = document.getElementById("closeSuccessModal");
  const paymentModal = document.getElementById("paymentModal");
  const paymentPlan = document.getElementById("paymentPlan");
  const paymentDuration = document.getElementById("paymentDuration");
  const paymentTotal = document.getElementById("paymentTotal");
  const paymentMethod = document.getElementById("paymentMethod");
  const cardFields = document.getElementById("cardFields");
  const mpesaFields = document.getElementById("mpesaFields");
  const physicalFields = document.getElementById("physicalFields");
  const cardName = document.getElementById("cardName");
  const cardNumber = document.getElementById("cardNumber");
  const expiry = document.getElementById("expiry");
  const cvv = document.getElementById("cvv");
  const mpesaNumber = document.getElementById("mpesaNumber");
  const cancelPayment = document.getElementById("cancelPayment");
  const confirmPayment = document.getElementById("confirmPayment");
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  const faqQuestions = document.querySelectorAll(".faq-question");

  let pendingApplication = null;
  let selectedPlan = "";
  let selectedPrice = 0;
  let totalMembershipCost = 0;
  let currentTestimonial = 0;

  planCards.forEach((card) => {
    const button = card.querySelector(".plan-btn");

    button.addEventListener("click", () => {
      planCards.forEach((plan) => {
        plan.classList.remove("selected");

        plan.querySelector(".plan-btn").textContent = "Select Plan";
      });
      card.classList.add("selected");
      button.textContent = "Selected ✓";

      selectedPlan = card.dataset.plan;

      selectedPrice = Number(card.dataset.price);
      selectedPlanName.textContent = selectedPlan;

      summaryPlan.textContent = selectedPlan;

      monthlyFee.textContent = `KSh ${selectedPrice.toLocaleString()}`;

      membershipPlanInput.value = selectedPlan;
    });
  });

  calculatorDuration.addEventListener("change", calculateMembershipCost);
  function calculateMembershipCost() {
    if (selectedPrice === 0) {
      alert("Please select a membership plan first");
      return;
    }

    let months = Number(calculatorDuration.value);

    if (months === 0) {
      return;
    }

    let discount = 0;

    if (months === 12) {
      discount = 10;
    }

    let total = selectedPrice * months;

    total = total - (total * discount) / 100;

    totalMembershipCost = total;

    summaryPlan.textContent = selectedPlan;

    monthlyFee.textContent = `KSh ${selectedPrice.toLocaleString()}`;

    membershipDuration.textContent = `${months} Month${months > 1 ? "s" : ""}`;

    membershipDiscount.textContent = `${discount}%`;

    membershipTotal.textContent = `KSh ${total.toLocaleString()}`;

    membershipLength.value = `${months} Month${months > 1 ? "s" : ""}`;
  }
});
