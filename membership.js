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

  calculateBmiBtn.addEventListener("click", calculateBMI);

  function calculateBMI() {
    const height = Number(heightInput.value);
    const weight = Number(weightInput.value);

    if (height <= 0 || weight <= 0) {
      alert("Please enter valid height and weight");
      return;
    }

    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters * heightInMeters);

    const roundedBMI = bmi.toFixed(1);

    bmiValue.textContent = roundedBMI;

    let status = "";
    let message = "";

    if (bmi < 18.5) {
      status = "Underweight";

      message =
        "Your BMI is below the normal range. Consider improving your nutrition and consulting a fitness professional.";
    } else if (bmi >= 18.5 && bmi < 25) {
      status = "Normal";

      message =
        "Great! Your BMI is within the healthy range. Keep maintaining your fitness routine.";
    } else if (bmi >= 25 && bmi < 30) {
      status = "Overweight";

      message =
        "Your BMI is above the normal range. Regular exercise and balanced nutrition can help.";
    } else {
      status = "Obese";

      message =
        "Your BMI is in the obese range. Consider creating a structured fitness and health plan.";
    }

    bmiStatus.textContent = status;

    bmiMessage.textContent = message;

    bmiStatus.classList.remove(
      "bmi-underweight",
      "bmi-normal",
      "bmi-overweight",
      "bmi-obese",
    );

    if (status === "Underweight") {
      bmiStatus.classList.add("bmi-underweight");
    } else if (status === "Normal") {
      bmiStatus.classList.add("bmi-normal");
    } else if (status === "Overweight") {
      bmiStatus.classList.add("bmi-overweight");
    } else {
      bmiStatus.classList.add("bmi-obese");
    }
  }

  membershipForm.addEventListener("submit", submitMembership);

  function submitMembership(e) {
    e.preventDefault();

    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    ageError.textContent = "";
    genderError.textContent = "";
    startDateError.textContent = "";
    planError.textContent = "";

    if (fullNameInput.value.trim() === "") {
      nameError.textContent = "Please enter your full name";

      isValid = false;
    }

    if (emailInput.value.trim() === "") {
      emailError.textContent = "Please enter your email";

      isValid = false;
    }

    if (phoneInput.value.trim() === "") {
      phoneError.textContent = "Please enter your phone number";

      isValid = false;
    }

    if (ageInput.value < 16) {
      ageError.textContent = "Minimum age is 16 years";

      isValid = false;
    }

    if (genderInput.value === "") {
      genderError.textContent = "Please select gender";

      isValid = false;
    }

    if (selectedPlan === "") {
      planError.textContent = "Please select a membership plan";

      isValid = false;
    }

    if (startDateInput.value === "") {
      startDateError.textContent = "Please select start date";

      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const membershipData = {
      name: fullNameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      emergencyContact: emergencyContactInput.value,
      age: ageInput.value,
      gender: genderInput.value,
      plan: selectedPlan,
      duration: membershipLength.value,
      amount: `KSh ${totalMembershipCost.toLocaleString()}`,
      startDate: startDateInput.value,
      fitnessGoal: document.getElementById("fitnessGoal").value,
      medicalConditions: document.getElementById("medicalConditions").value,
      submittedAt: new Date().toLocaleString(),
    };

    pendingApplication = membershipData;

    openPaymentModal();
  }

  function openPaymentModal() {
    paymentPlan.textContent = selectedPlan;
    paymentDuration.textContent = membershipLength.value;
    paymentTotal.textContent = `KSh ${totalMembershipCost.toLocaleString()}`;

    paymentMethod.value = "";
    cardName.value = "";
    cardNumber.value = "";
    expiry.value = "";
    cvv.value = "";
    mpesaNumber.value = "";

    cardFields.style.display = "none";
    mpesaFields.style.display = "none";
    physicalFields.style.display = "none";

    paymentModal.classList.add("show");

    lucide.createIcons();
  }

  paymentMethod.addEventListener("change", () => {
    cardFields.style.display = "none";
    mpesaFields.style.display = "none";
    physicalFields.style.display = "none";

    if (paymentMethod.value === "Card") {
      cardFields.style.display = "block";
    } else if (paymentMethod.value === "Mpesa") {
      mpesaFields.style.display = "block";
    } else if (paymentMethod.value === "Physical") {
      physicalFields.style.display = "block";
    }
  });

  function showSuccessModal() {
    memberName.textContent = fullNameInput.value;

    selectedMembership.textContent = selectedPlan;

    successModal.classList.add("show");

    membershipForm.reset();

    lucide.createIcons();
  }

  closeSuccessModal.addEventListener("click", () => {
    successModal.classList.remove("show");
  });
  cancelPayment.addEventListener("click", () => {
    paymentModal.classList.remove("show");

    paymentMethod.value = "";

    cardFields.style.display = "none";
    mpesaFields.style.display = "none";
    physicalFields.style.display = "none";
  });

  confirmPayment.addEventListener("click", () => {
    if (paymentMethod.value === "") {
      alert("Please select a payment method.");
      return;
    }

    if (paymentMethod.value === "Card") {
      if (
        cardName.value.trim() === "" ||
        cardNumber.value.trim() === "" ||
        expiry.value.trim() === "" ||
        cvv.value.trim() === ""
      ) {
        alert("Please complete all card details.");
        return;
      }
    }

    if (paymentMethod.value === "Mpesa") {
      if (mpesaNumber.value.trim() === "") {
        alert("Please enter your M-Pesa number.");
        return;
      }
    }

    pendingApplication.paymentMethod = paymentMethod.value;

    if (paymentMethod.value === "Physical") {
      pendingApplication.paymentStatus = "Pending Physical Payment";
    } else {
      pendingApplication.paymentStatus = "Paid";
    }

    sendMembershipEmail(pendingApplication);

    sendWelcomeEmail(pendingApplication);

    localStorage.setItem(
      "membershipApplication",
      JSON.stringify(pendingApplication),
    );

    paymentModal.classList.remove("show");

    showSuccessModal();
  });
});
