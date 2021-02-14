"use strict";

const cups = document.getElementById("cups");
let smallCups = document.querySelectorAll(".cup-small");
const liters = document.getElementById("liters");
const myRange = document.getElementById("myRange");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");
const height = remained.clientHeight;

myRange.addEventListener("change", () => {
  updateCupRange();
  updateBigCup();
  updateEventListener();
});

updateBigCup();
updateCupRange();
updateEventListener();

function highlightCups(idx) {
  if (
    smallCups[idx].classList.contains("full") &&
    !smallCups[idx].nextElementSibling.classList.contains("full")
  ) {
    idx--;
  }

  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll(".cup-small.full").length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(fullCups / totalCups) * height}px`;
    percentage.innerText = `${((fullCups / totalCups) * 100).toFixed(2)} %`;
  }

  if (fullCups === totalCups) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
  } else {
    remained.style.visibility = "visible";
    liters.innerText = `${myRange.value - (250 * fullCups) / 1000}L`;
  }
}

function updateCupRange() {
  const amoutOfCups = myRange.value / 0.25;

  cups.innerHTML = "";

  for (let i = 1; i <= amoutOfCups; i++) {
    const div = document.createElement("div");
    div.classList.add("cup", "cup-small");
    div.innerText = "250 ml";
    cups.appendChild(div);
  }
}

function updateEventListener() {
  smallCups = document.querySelectorAll(".cup-small");

  smallCups.forEach((cup, idx) => {
    cup.addEventListener("click", () => {
      highlightCups(idx);
    });
  });
}
