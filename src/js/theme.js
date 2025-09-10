const body = document.body;
const toggleBtn = document.querySelector(".color-change");


if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
  localStorage.setItem("theme", "dark");
  } else {
  localStorage.setItem("theme", "light");
  }
});