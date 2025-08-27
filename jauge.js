let targetPoints = 3000;
const finalPoints = 3456;
const nextTargetPoints = 4000;
const duration = finalPoints/nextTargetPoints*5000;

function gaussianEase(t) {
  return Math.exp(-12 * Math.pow(t - 0.5, 2)) * 1.5;
}

function normalizeEase(totalFrames, easeFunc) {
  const values = [];
  let sum = 0;
  for (let i = 0; i < totalFrames; i++) {
    const t = i / (totalFrames - 1);
    const v = easeFunc(t);
    values.push(v);
    sum += v;
  }
  return values.map(v => v / sum);
}





function animateProgress(finalValue, currentTarget, duration, onComplete) {
  const progressBar = document.getElementById("progress-bar");
  const pointsCounter = document.getElementById("points-counter");
  const frameRate = 60;
  const totalFrames = Math.round((duration / 1000) * frameRate + 1);
  const weights = normalizeEase(totalFrames, gaussianEase);

  let currentValue = 0;
  let frame = 0;

  function step() {
    if (frame >= totalFrames) {
      currentValue = Math.min(finalValue, currentTarget);
      const percentage = (currentValue / currentTarget) * 100;

      progressBar.style.width = percentage.toFixed(1) + "%";
      progressBar.textContent = Math.round(percentage) + "%";
      pointsCounter.textContent = `${Math.floor(currentValue).toLocaleString("fr-FR")} / ${currentTarget.toLocaleString("fr-FR")} points`;

      if (finalValue >= currentTarget && typeof onComplete === "function") {
        onComplete();
      }
      return;
    }

    currentValue += finalValue * weights[frame];
    if (currentValue > currentTarget) currentValue = currentTarget;

    const percentage = (currentValue / currentTarget) * 100;

    progressBar.style.width = percentage.toFixed(1) + "%";
    progressBar.textContent = Math.round(percentage) + "%"; 
    pointsCounter.textContent = `${Math.floor(currentValue).toLocaleString("fr-FR")} / ${currentTarget.toLocaleString("fr-FR")} points`;

    frame++;
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function setupNextPalier() {
  const progressBar = document.getElementById("progress-bar");
  const pointsCounter = document.getElementById("points-counter");
  const progressContainer = document.getElementById("progress-container");
  const nextPalierText = progressContainer.querySelector("p");

  // Applique les styles or
  progressBar.classList.add("gold-bar");
  progressContainer.classList.add("gold-container", "pulse-glow");

  // Texte et titre en blanc avec ombre bordeaux
  nextPalierText.style.color = "white";
  nextPalierText.style.textShadow = "1px 1px 3px var(--bordeaux)";
  pointsCounter.style.color = "white";
  pointsCounter.style.textShadow = "1px 1px 3px var(--bordeaux)";

  // Rendre cliquable et changer bordure
  progressContainer.style.pointerEvents = "auto";
  progressContainer.style.cursor = "pointer";
  progressContainer.style.borderColor = "var(--ivoire)";  // <-- ici la bordure ivoire

  progressContainer.addEventListener("click", () => {
    const overflowPoints = finalPoints - targetPoints;

    // Met à jour le texte du palier
    nextPalierText.textContent = `On adopte une loutre 🦦💕`;

    // Supprime les styles or
    progressBar.classList.remove("gold-bar");
    progressContainer.classList.remove("gold-container", "pulse-glow");
    pointsCounter.style.color = "";
    pointsCounter.style.textShadow = "";
    nextPalierText.style.color = "";
    nextPalierText.style.textShadow = "";

    // Remet la bordure d'origine après clic
    progressContainer.style.borderColor = "#6a9b6a";

    // Désactive les clics après passage
    progressContainer.style.pointerEvents = "none";
    progressContainer.style.cursor = "default";

    // Anime vers le nouveau palier (4000), avec les bons textes
    animateProgress(overflowPoints, nextTargetPoints, duration);
  }, { once: true });
}


// Lancement initial
const maxValueToAnimate = Math.min(finalPoints, targetPoints);
animateProgress(finalPoints, targetPoints, duration, () => {
  if (finalPoints >= targetPoints) {
    setupNextPalier();
  }
});
