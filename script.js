const ENDPOINT_URL = "https://script.google.com/macros/s/TON_ENDPOINT_APPS_SCRIPT/exec";

let selectedRating = null;
const ratingEl = document.getElementById("rating");
const stars = ratingEl.querySelectorAll("span");
const statusEl = document.getElementById("status");

stars.forEach(star => {
  star.addEventListener("click", () => {
    selectedRating = parseInt(star.dataset.value, 10);
    stars.forEach(s => {
      s.classList.toggle(
        "active",
        parseInt(s.dataset.value, 10) <= selectedRating
      );
    });
  });
});

document.getElementById("submit").addEventListener("click", async () => {
  if (!selectedRating) {
    statusEl.textContent = "Merci de sélectionner une note (1 à 5).";
    return;
  }

  const comment = document.getElementById("comment").value.trim();
  const name = document.getElementById("name").value.trim();
  const followup = (document.querySelector("input[name='followup']:checked') || {}).value || "";
  const contact = document.getElementById("contact").value.trim();

  const payload = {
    rating: selectedRating,
    comment,
    name,
    followup,
    contact,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString()
  };

  statusEl.textContent = "Envoi en cours...";

  try {
    await fetch(ENDPOINT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    statusEl.textContent = "Merci, votre avis a bien été envoyé.";
    // Optionnel : reset du formulaire
    // selectedRating = null;
    // stars.forEach(s => s.classList.remove("active"));
    // document.getElementById("comment").value = "";
    // document.getElementById("name").value = "";
    // document.getElementById("contact").value = "";
    // const checked = document.querySelector("input[name='followup']:checked");
    // if (checked) checked.checked = false;
  } catch (e) {
    console.error(e);
    statusEl.textContent = "Une erreur est survenue. Merci de réessayer plus tard.";
  }
});
