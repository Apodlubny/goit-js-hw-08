import '../css/common.css';
import '../css/03-feedback.css';
const throttle = require('lodash.throttle');

const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('input'),
};

let formData = {};

populateTextarea();

refs.form.addEventListener('input', throttle(onTextareaInput, 500));

refs.form.addEventListener('submit', onFormSubmit);

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

function populateTextarea() {
  let savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    savedMessage = JSON.parse(savedMessage);
    Object.entries(savedMessage).forEach(([name, value]) => {
      formData[name] = value;
      refs.form.elements[name].value = value;
    });
  }
}
