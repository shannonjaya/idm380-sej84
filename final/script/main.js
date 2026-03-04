function formatPhoneInput() {
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, ''); 
      if (value.length > 0) {
        if (value.length <= 3) {
          value = value;
        } else if (value.length <= 6) {
          value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
          value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
      }
      e.target.value = value;
    });
  }
}


function preventEmptyLinkNavigation() {
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      const href = e.target.getAttribute('href');
      if (href === '' || href === '#') {
        e.preventDefault();
      }
    }
  });
}

function submitForm() {
  const form = document.querySelector('form');
  if (!form) return;

  const submitBtn = document.querySelector('#submit-btn');
  const inputs = form.querySelectorAll('input, select, textarea');

  const checkFormValid = () => {
    const location = form.querySelector('select[name="location"]').value !== '0';
    const subject = form.querySelector('select[name="subject"]').value !== '';
    const firstName = form.querySelector('input[name="firstName"]').value.trim() !== '';
    const lastName = form.querySelector('input[name="lastName"]').value.trim() !== '';
    const email = form.querySelector('input[name="email"]').value.trim() !== '';
    const contactMethod = form.querySelector('input[name="contact-method"]:checked') !== null;
    const message = form.querySelector('textarea[name="message"]').value.trim() !== '';
    const consent = form.querySelector('input[name="consent"]').checked;

    const isValid = location && subject && firstName && lastName && email && contactMethod && message && consent;
    
    if (isValid) {
      submitBtn.classList.remove('btn-disabled');
    } else {
      submitBtn.classList.add('btn-disabled');
    }
  };

  inputs.forEach(input => {
    input.addEventListener('change', checkFormValid);
    input.addEventListener('input', checkFormValid);
  });

  form.addEventListener('submit', (e) => {
    if (submitBtn.classList.contains('btn-disabled')) {
      e.preventDefault();
    } else {
      e.preventDefault();
      alert('Thank you for contacting Topgolf!');
      form.reset();
      checkFormValid();
    }
  });

  checkFormValid();
}

function initialize() {
  formatPhoneInput();
  preventEmptyLinkNavigation();
  submitForm();
}


document.addEventListener('DOMContentLoaded', initialize);
