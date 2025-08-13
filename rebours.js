
    const targetDate = new Date("2026-09-12T15:00:00");

    function updateCountdown() {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        document.getElementById("countdown").innerHTML = "Vive les mariés !";
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      document.getElementById("countdown").innerHTML =
        `${days} jours ${hours}h ${minutes}min ${seconds}s`;
    }

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
