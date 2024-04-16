// Title Typing Animation
const typed = new Typed(".company-title", {
  strings: ["Textism"],
  typeSpeed: 150,
  // backSpeed : 100,
  loop: false,
});

var theme = document.getElementsByClassName("theme-container")[0];

var theme_icon = document.getElementsByClassName("theme")[0];

if (localStorage.getItem("Mode") == "dark-theme") {
  document.body.classList.add("dark-theme");
  theme_icon.src = "/images/Sun.png";
}

theme.onclick = function () {
  document.body.classList.toggle("dark-theme");

  //swapping sun and moon icons
  if (document.body.classList.contains("dark-theme")) {
    theme_icon.src = "/images/Sun.png";
  } else {
    theme_icon.src = "/images/Moon.png";
  }

  //Preventing page from loss of theme upon page refresh
  if (
    (localStorage.getItem("Mode") == "light-theme") |
    (localStorage.getItem("Mode") == null)
  ) {
    localStorage.setItem("Mode", "dark-theme");
  } else {
    localStorage.setItem("Mode", "light-theme");
  }
};

document
  .getElementsByClassName("code")[0]
  .addEventListener("input", function () {
    var userInput = this.value;
    // Check if the input is exactly four digits
    /*if (userInput.length === 4 && !isNaN(userInput))*/
    if (userInput.length === 4) {
      // Wait for 4 seconds (4000 milliseconds)
      setTimeout(function () {
        // Open another HTML file
        window.location.href = "/receiver";
      }, 3000);
    }
  });
