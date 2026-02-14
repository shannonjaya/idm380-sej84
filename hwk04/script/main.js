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

function initialize() {
  formatPhoneInput();
  preventEmptyLinkNavigation();
}


document.addEventListener('DOMContentLoaded', initialize);
