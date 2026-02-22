document.addEventListener("DOMContentLoaded", function () {
  // 1. Load the Header
  fetch("Header.html")
    .then((response) => response.text())
    .then((data) => {
      const headerLoc = document.getElementById("Header");
      if (headerLoc) {
        headerLoc.innerHTML = data;
        setupMobileMenu(); // Now it exists!
      }
    });

  // 2. Load the Footer
  fetch("Footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footerLoc = document.getElementById("Footer");
      if (footerLoc) {
        footerLoc.innerHTML = data;
      }
    });
});
