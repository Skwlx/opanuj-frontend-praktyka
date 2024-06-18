function validator() {
  const input = document.getElementById('input');
  const button = document.getElementById('button');
  const button2 = document.getElementById('button2');
  const result = document.getElementById('result');

  const renderInvalidMessage = () => {
    result.innerHTML = 'Invalid';
  };

  button.addEventListener('click', () => {
    const inputValue = Number(input.value);

    if (!input.value) {
      renderInvalidMessage();
      return;
    }

    if (!Number.isInteger(inputValue)) {
      renderInvalidMessage();
      return;
    }

    if (inputValue < 0 || inputValue > 100) {
      renderInvalidMessage();
      return;
    }

    result.innerHTML = 'Valid';
  });

  button2.addEventListener('click', () => {
    input.value = '';
    result.innerHTML = '';
  });
}

validator();
