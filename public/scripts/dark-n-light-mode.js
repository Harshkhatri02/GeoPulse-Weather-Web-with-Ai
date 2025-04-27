function toggleDarkMode() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    document.querySelector('html').classList.toggle('d-n-l-mode', isDarkMode);
    if (isDarkMode) {
      document.querySelector('.logo h4').style.backgroundImage = "url('cloud.jpg')";
      document.querySelector('nav h4').style.color = "white";
      document.querySelector('nav ul').style.color = "white";
      document.querySelector('nav button').style.color = "white";
    } else {
      document.querySelector('.logo h4').style.backgroundImage = "";
      document.querySelector('nav h4').style.color = "";
      document.querySelector('nav ul').style.color = "";
      document.querySelector('nav button').style.color = "";
    }
  }
  
  function dark() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    localStorage.setItem("darkMode", !isDarkMode);
    toggleDarkMode();
  }
  
  document.addEventListener("DOMContentLoaded", toggleDarkMode);
  