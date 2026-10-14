const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  toggle.textContent = open ? "Menu" : "Close";
  nav.classList.toggle("is-open", !open);
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
    nav.classList.remove("is-open");
  }
});

const form = document.querySelector("#contact-form");
const confirmation = document.querySelector("#confirmation");

const fields = [
  { id: "name", message: "Enter your name." },
  { id: "email", message: "Enter a valid email." },
  { id: "message", message: "Tell us a little about the floor." },
];

function showError(input, message) {
  const error = document.querySelector(`#${input.id}-error`);
  error.hidden = !message;
  error.textContent = message;
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let firstInvalid = null;

  fields.forEach(({ id, message }) => {
    const input = document.querySelector(`#${id}`);
    const value = input.value.trim();
    const invalid = id === "email" ? !input.checkValidity() || value === "" : value === "";
    showError(input, invalid ? message : "");
    if (invalid && !firstInvalid) firstInvalid = input;
  });

  if (firstInvalid) {
    firstInvalid.focus();
    confirmation.hidden = true;
    return;
  }

  form.hidden = true;
  confirmation.hidden = false;
});
