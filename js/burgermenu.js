const mainnav = document.querySelector("#my-button");
const burger = document.querySelector(".navigation");

mainnav.addEventListener("click", () => {
    burger.classList.toggle("open");
    mainnav.classList.toggle("open");
});