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
});
