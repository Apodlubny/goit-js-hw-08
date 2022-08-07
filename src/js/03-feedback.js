const throttle = require("lodash.throttle");

const STORAGE_KEY = "feedback-form-state";
const refs = {
  form: document.querySelector(".feedback-form"),
  textarea: document.querySelector(".feedback-form textarea"),
  input: document.querySelector("input"),
};

let formData = {};

populateTexrarea();

refs.form.addEventListener("input", throttle(onTextareaInput, 500));

refs.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  e.target.reset();
  formData = {};
  console.log(formData);
}

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  const stringifiedData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringifiedData);
}

// function populateTexrarea() {
//   const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
//   if (savedMessage === null) {
//     return;
//   }
//   refs.textarea.value = savedMessage["message"] || "";
//   refs.input.value = savedMessage["email"] || "";
// }

// function populateTexrarea() {
//   let persistedFilters = localStorage.getItem(STORAGE_KEY);
//   if (persistedFilters) {
//     persistedFilters = JSON.parse(persistedFilters);
//     Object.entries(persistedFilters).forEach(([name, value]) => {
//       filterForm.elements[name].value = value;
//     });
//   }
// }
