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
