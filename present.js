const slides = [...document.querySelectorAll(".slide")];
const title = document.querySelector("#deck-title");
const count = document.querySelector("#count");
const dots = document.querySelector("#dots");
let index = 0;

slides.forEach((slide, i) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", slide.dataset.title);
  dot.addEventListener("click", () => show(i));
  dots.appendChild(dot);
});

function show(next) {
  index = (next + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    const active = i === index;
    slide.classList.toggle("is-active", active);
    slide.hidden = !active;
  });
  [...dots.children].forEach((dot, i) => {
    if (i === index) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
  title.textContent = slides[index].dataset.title;
  count.textContent = `${index + 1} / ${slides.length}`;
  document.title = `${slides[index].dataset.title} · Architechs #25795`;
}

document.querySelector("#prev").addEventListener("click", () => show(index - 1));
document.querySelector("#next").addEventListener("click", () => show(index + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
    event.preventDefault();
    show(index + 1);
  } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    show(index - 1);
  } else if (event.key === "Home") {
    show(0);
  } else if (event.key === "End") {
    show(slides.length - 1);
  } else if (event.key === "n" || event.key === "N") {
    document.body.classList.toggle("show-notes");
  }
});

let touchX = null;
document.addEventListener("touchstart", (event) => {
  touchX = event.changedTouches[0].clientX;
}, { passive: true });
document.addEventListener("touchend", (event) => {
  if (touchX == null) return;
  const delta = event.changedTouches[0].clientX - touchX;
  if (Math.abs(delta) > 40) show(index + (delta < 0 ? 1 : -1));
  touchX = null;
}, { passive: true });

show(0);
