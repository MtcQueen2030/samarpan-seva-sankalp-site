const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    });
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

// Replace this with the organisation's verified email address before launch.
const ORGANISATION_EMAIL = "";

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  if (!ORGANISATION_EMAIL) {
    formStatus.textContent = "This demo is ready, but the organisation's official email has not been configured yet. Add it in script.js and update the contact details in index.html.";
    return;
  }

  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Website enquiry: ${data.get("interest")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nInterest: ${data.get("interest")}\n\nMessage:\n${data.get("message")}`
  );
  window.location.href = `mailto:${ORGANISATION_EMAIL}?subject=${subject}&body=${body}`;
  formStatus.textContent = "Your email app should open with the message prepared. Please send it from your email app.";
});
