// Title Typing Animation
const typed = new Typed(".company-title", {
  strings: ["Textism"],
  typeSpeed: 150,
  // backSpeed : 100,
  loop: false,
});

const codeInputEl = document.querySelector("#code-inp");

const goButton = document.querySelector("#go-btn");

codeInputEl.addEventListener("input", (e) => {
  if (!e.target.value) {
    goButton.disabled = true;
  } else {
    goButton.disabled = false;
  }
});

goButton.addEventListener("click", (e) => {
  const code = codeInputEl.value;

  if (code) {
    window.location.href = `/receiver/${code}`;
  }
});
