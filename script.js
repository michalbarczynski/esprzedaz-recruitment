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
    mask = function(value) {
      let output = [];
        for(let i = 0; i < value.length; i++) {
          if(i == 2) {
            output.push("-");
          }
          output.push(value[i]);
        }
        return output.join("");
    },
    unmask = function(value) {/^\d{0,5}$/g
      let output = value.replace(new RegExp(/[^\d]/, 'g'), '');
      return output;
    },
    keydownHandler = function(e) {
      oldValue = e.target.value;
    },
    inputHandler = function(e) {
          let el = e.target,
          newValue = el.value;
          newValue = unmask(newValue);
          
          if(newValue.match(regex)) {
            newValue = mask(newValue);
            el.value = newValue;
          } else {
            el.value = oldValue;
          }
    };
input.addEventListener('keydown', keydownHandler );
input.addEventListener('input', inputHandler );

// Fetching form inputs and sending to URL
form.addEventListener("submit", e => {
  e.preventDefault();

  let formErrors = false;

  //2 etap - sprawdzamy poszczególne pola gdy ktoś chce wysłać formularz
  for (const el of inputs) {
      markFieldAsError(el, false);
      toggleErrorField(el, false);

      if (!el.checkValidity()) {
          markFieldAsError(el, true);
          toggleErrorField(el, true);
          formErrors = true;
      }
  }

  if (!formErrors) {
      const submit = form.querySelector("[type=submit]");
      submit.disabled = true;
      submit.classList.add("loading");

      //generuję dane do wysyłki
      const formData = new FormData(form);

      const url = form.getAttribute("action"); //pobieramy adres wysyłki z action formularza
      const method = form.getAttribute("method"); //tak samo metodę

      fetch(url, {
          method: method,
          body: formData
      })
      .then(res => res.json())
      .then(res => {
          //tutaj odpowiedź
      }).finally(() => { //gdy zakończy się połączenie chcemy włączyć przycisk submit
          submit.disabled = false;
          submit.classList.remove("loading");
      });
  }
});