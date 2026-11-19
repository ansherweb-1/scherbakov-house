(() => {
  const header = document.querySelector(".header");
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const form = document.getElementById("lead-form");
  const success = document.getElementById("form-success");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  const revealTargets = document.querySelectorAll(
    ".hero__content, .hero__visual, .letter__portrait, .letter__body, .winter__head, .winter__stats, .winter__points, .project-card, .process__list li, .guarantees article, .review, .faq__item, .contact__info, .contact__form"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      let digits = phoneInput.value.replace(/\D/g, "");
      if (digits.startsWith("8")) digits = "7" + digits.slice(1);
      if (!digits.startsWith("7")) digits = "7" + digits;
      digits = digits.slice(0, 11);

      const parts = [];
      if (digits.length > 1) parts.push("+7");
      if (digits.length > 1) parts.push(" (" + digits.slice(1, 4));
      if (digits.length >= 4) parts[parts.length - 1] += ")";
      if (digits.length > 4) parts.push(" " + digits.slice(4, 7));
      if (digits.length > 7) parts.push("-" + digits.slice(7, 9));
      if (digits.length > 9) parts.push("-" + digits.slice(9, 11));
      phoneInput.value = parts.join("");
    });
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.querySelector("#name");
      const phone = form.querySelector("#phone");
      const agree = form.querySelector('[name="agree"]');
      let valid = true;

      [name, phone].forEach((field) => {
        if (!field) return;
        const empty = !field.value.trim();
        field.classList.toggle("is-invalid", empty);
        if (empty) valid = false;
      });

      if (phone && phone.value.replace(/\D/g, "").length < 11) {
        phone.classList.add("is-invalid");
        valid = false;
      }

      if (agree && !agree.checked) valid = false;

      if (!valid) {
        const firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      form.classList.add("is-sent");
      if (success) success.hidden = false;
    });

    form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("input", () => field.classList.remove("is-invalid"));
    });
  }
})();
