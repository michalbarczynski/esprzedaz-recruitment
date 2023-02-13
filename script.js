// Swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Zip code validator
var input = document.getElementById('zip-code'),
  oldValue,
  regex = new RegExp(/^\d{0,5}$/g),

  mask = function (value) {
    let output = [];
    for (let i = 0; i < value.length; i++) {
      if (i == 2) {
        output.push("-");
      }
      output.push(value[i]);
    }
    return output.join("");
  },
  unmask = function (value) {
    /^\d{0,5}$/g
    let output = value.replace(new RegExp(/[^\d]/, 'g'), '');
    return output;
  },

  keydownHandler = function (e) {
    oldValue = e.target.value;
  },

  inputHandler = function (e) {
    let el = e.target,
      newValue = el.value;
    newValue = unmask(newValue);

    if (newValue.match(regex)) {
      newValue = mask(newValue);
      el.value = newValue;
    } else {
      el.value = oldValue;
    }
  },

  isZipValid = function (e) {
    let el = e.target.value;
    if (el.length != 6) { alert('Kod pocztowy musi zawierać 5 cyfr!') }
  }

input.addEventListener('keydown', keydownHandler);
input.addEventListener('input', inputHandler);
input.addEventListener('change', isZipValid);

// Fetching form inputs and sending to URL
const form = document.querySelector('#contact-form');

form.addEventListener("submit", e => {
  e.preventDefault();

  const prePayload = new FormData(form);
  const payload = new URLSearchParams(prePayload);
  console.log([...payload]);

  const url = form.getAttribute("action");
  const method = form.getAttribute("method");

  fetch(url, {
    method: method,
    body: payload
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
});
 