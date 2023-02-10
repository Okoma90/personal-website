// Burger navigation handler
const navbar = document.querySelector(".navClick");
const iconBurger = document.querySelector(".fa-bars");
const iconX = document.querySelector(".fa-xmark");
const column = document.querySelector(".aside");

navbar.addEventListener("click", () => {
  iconBurger.classList.toggle("show");
  iconX.classList.toggle("show");
  column.classList.toggle("show");
});

// Scroll to top button handler
const topBtn = document.querySelector(".topBtn");

window.onscroll = () => showTopBtn();

const showTopBtn = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

topBtn.addEventListener("click",
  () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });


// Type Effect
const hello = document.getElementById("typeEffect")
const text = "Hello.";
let i = 0;

const typeEffect = () => {
  if (i < text.length) {
    hello.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 300);
  }
};

const removeText = () => {
  hello.innerHTML = "";
  i = 0;
};

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    typeEffect();
  } else {
    removeText();
  }
});

observer.observe(hello);

// EmailJS
const submitButton = document.querySelector(".submitBtn");
submitButton.addEventListener('click', (e) => submitButtonHandler(e));

const submitButtonHandler = (e) => {
  e.preventDefault();

  // Inputs
  const inputName = document.querySelector(".contactName");
  const inputEmail = document.querySelector(".contactEmail");
  const inputMessage = document.querySelector(".contactMessage");

  //Value from inputs
  const inputNameValue = inputName.value;
  const inputEmailValue = inputEmail.value;
  const inputMessageValue = inputMessage.value;
  const formResult = {
    to_name: 'Krzysiek',
    from_name: inputNameValue,
    user_email: inputEmailValue,
    message: inputMessageValue,
    reply_to: inputEmailValue
  };

  // Email Validation
  const patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Data from emailJS
  const templateId = "template";
  const serviceId = "okoma90";


  // Validation and function sent by EmailJS
  if (inputNameValue === "" || inputEmailValue === "" || inputMessageValue === "") {
    return
  } else if (!patternEmail.test(inputEmailValue)) {
    inputEmail.value = "Wrong email address!";
    inputEmail.style.border = "1px solid #f00";
    return;
  } else {
    emailjs.send(serviceId, templateId, formResult)
      .then(function (response) {
        console.log('Message sent', response.status, response.text);
        displaySuccessMessage();
        clearForm();
      }, function (error) {
        alert('Something went wrong', error);
      });
  }

  function displaySuccessMessage() {
    const successMessage = document.createElement('p');
    successMessage.innerHTML = "Your message was sent successfully!";
    successMessage.className = 'successMessage';
    document.querySelector('form').appendChild(successMessage);
  }

  function clearForm() {
    inputName.value = "";
    inputEmail.value = "";
    inputMessage.value = "";
    inputEmail.style.border = "1px solid #ccc";
  }


}