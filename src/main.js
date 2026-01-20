const textAreaEl = document.getElementById('textarea-input');
const alertMessageEl = document.getElementById('alert-message');
const countMessageEl = document.getElementById('counter-message');

let count;
let limit = 200;

const countWordsFunc = () => {
  alertMessageEl.style.display = 'none';

  let textContent = textAreaEl.value;

  if (textContent === '') {
    alertMessageEl.textContent = '* Type something to count the words';
    alertMessageEl.style.display = 'block';
  }

  count = textContent.length;

  if (count > limit) {
    alertMessageEl.textContent = '* You have reached your character limit';
    alertMessageEl.style.display = 'block';

    textAreaEl.value = textContent.substring(0, limit - 1);
  } else {
    countMessageEl.textContent = `You have ${limit - textContent.length} out of ${limit} characters`;
  }

};

textAreaEl.addEventListener('input', countWordsFunc);

// buttons array
let btnArr = [
  {
    id: 1,
    name: "Uppercase",
    idAttr: "uppercase-btn",
  },
  {
    id: 2,
    name: "Lowercase",
    idAttr: "lowercase-btn",
  },
  {
    id: 3,
    name: "Capitalize",
    idAttr: "capitalize-btn",
  },
  {
    id: 4,
    name: "Bold",
    idAttr: "bold-btn",
  },
  {
    id: 5,
    name: "Italic",
    idAttr: "italic-btn",
  },
  {
    id: 6,
    name: "Clear",
    idAttr: "clear-btn",
  },
  {
    id: 7,
    name: "Copy",
    idAttr: "copy-btn",
  },
];

let btnContainerEl = document.getElementById("btn-container");
let fragmentEl = document.createDocumentFragment();

// appending the button elements in document,
for (let i = 0; i < btnArr.length; i++) {
  let btnEl = document.createElement('button');
  btnEl.setAttribute('id', btnArr[i].idAttr);
  btnEl.innerText = btnArr[i].name;
  btnEl.classList.add('btn-style');
  fragmentEl.append(btnEl);
}

btnContainerEl.append(fragmentEl);

// adding event listeners to every button in document,
let btnEls = document.querySelectorAll('.btn-style');
let messageEl = document.querySelector("#message-container");

textAreaEl.addEventListener('change', () => {
  alertMessageEl.style.display = 'none';
  let copyBtn = document.getElementById('copy-btn');
  copyBtn.innerText = 'Copy';
  copyBtn.classList.remove('bg-orange-500');
});

btnEls.forEach((btn) => {
  btn.addEventListener('click', () => {

    // text content extra space will be removed,
    let textContent = textAreaEl.value.trim().replace(/\s+/g, ' ');

    // text content is empty means error showing,
    if (textContent === '') {
      alertMessageEl.textContent = '* Please enter some text content';
      alertMessageEl.style.display = 'block';
      return;
    }

    // text  content has less than 3 characters means error,
    if (textContent.length < 3) {
      alertMessageEl.textContent = "* Text content should be more than three words";
      alertMessageEl.style.display = 'block';
      return;
    }

    // message element showing by this function,
    const messageFunc = (message) => {
      messageEl.textContent = message;
      messageEl.classList.remove('message-slide');
      setTimeout(() => {
        messageEl.classList.add('message-slide');
      }, 3000);
    };

    // using switch case to assign each events to respected buttons,
    switch (btn.id) {
      case 'uppercase-btn':
        let upperCaseText = textContent.toLocaleUpperCase();
        messageFunc('Text changed into Uppercase ✨');

        return textAreaEl.value = upperCaseText;

      case 'lowercase-btn':
        let lowercaseText = textContent.toLocaleLowerCase();
        messageFunc('Text changed into Lowercase ✨');

        return textAreaEl.value = lowercaseText;

      case 'capitalize-btn':
        let newText = textContent.toLocaleLowerCase().split(' ');
        let capitalizeText = newText.map((text) => (text.charAt(0).toLocaleUpperCase() + text.slice(1)));
        messageFunc('Text changed into Capitalize ✨');

        return textAreaEl.value = capitalizeText.join(' ');

      case 'bold-btn':
        let boldText = textContent;
        textAreaEl.value = boldText;
        btn.classList.toggle('bg-orange-500');
        messageFunc('Font weight changed ✨');

        return textAreaEl.classList.toggle('font-bold');

      case 'italic-btn':
        let italicText = textContent;
        textAreaEl.value = italicText;
        btn.classList.toggle('bg-orange-500');
        messageFunc('Text style changed ✨');

        return textAreaEl.classList.toggle('italic');

      case 'clear-btn':
        return textAreaEl.value = "";

      case 'copy-btn':
        let copiedText = textContent;

        setTimeout(() => {
          btn.classList.add('bg-orange-500');
          btn.innerText = 'Copied!';
        }, 1000);

        textAreaEl.value = copiedText;
        messageFunc('Your text copied to clipboard ✨');

        return navigator.clipboard.writeText(textAreaEl.value);
    }
  });
});
