
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("malla");

  function createCard(course) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = course.id;
    card.dataset.area = course.area;
    card.innerHTML = `<strong>${course.name}</strong><span>${course.code}</span><span>${course.credits} créditos</span>`;
    if (course.reqs.length > 0) card.classList.add("locked");
    
    card.setAttribute("data-secret", "✨ Te amo, sigue brillando ✨");

    container.appendChild(card);
  }

  function renderCards() {
    container.innerHTML = "";
    data.forEach(course => createCard(course));
    updateUnlocks();
  }

  function updateUnlocks() {
    const completed = new Set(
      Array.from(document.querySelectorAll(".card.done")).map(c => c.dataset.id)
    );

    document.querySelectorAll(".card").forEach(card => {
      const course = data.find(c => c.id === card.dataset.id);
      const allReqsMet = course.reqs.every(req => completed.has(req));
      if (allReqsMet && !card.classList.contains("done")) {
        card.classList.remove("locked");
      } else if (!allReqsMet && !card.classList.contains("done")) {
        card.classList.add("locked");
      }
    });
  }

  container.addEventListener("click", e => {
    const card = e.target.closest(".card");
    if (!card || card.classList.contains("locked")) return;
    card.classList.toggle("done");
    updateUnlocks();
  });

  renderCards();
});
