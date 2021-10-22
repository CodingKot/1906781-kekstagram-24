import {DESCRIPTIONS_NUMBER, createPictureDescription} from '/utils/data-creator.js';

const PictureDescriptions = Array.from({
  length: DESCRIPTIONS_NUMBER,
}, createPictureDescription);

for (let i = 0; i <= DESCRIPTIONS_NUMBER; i++) {
  let property = '';
  let txt = '';
  const description = PictureDescriptions[i];
  for (property in description) {
    txt += `${description[property]} `;
  }
  const testData  = document.createElement('p');
  testData.textContent = txt;
  const parent = document.querySelector('body');
  parent.append(testData);
}

