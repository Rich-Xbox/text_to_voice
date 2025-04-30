const textInput = document.getElementById('text');
const voiceSelect = document.getElementById('voiceSelect');
 const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');
const rateValue = document.getElementById('rateValue');
const pitchValue = document.getElementById('pitchValue');

 const synth = window.speechSynthesis;
 let voices = [];

function populateVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach((voice, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

function speak() {
  if (synth.speaking) {
    synth.cancel(); 
  }

  const utterance = new SpeechSynthesisUtterance(textInput.value);
  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.rate = parseFloat(rateInput.value);
  utterance.pitch = parseFloat(pitchInput.value);
  synth.speak(utterance);
}

rateInput.oninput = () => rateValue.textContent = rateInput.value;
pitchInput.oninput = () => pitchValue.textContent = pitchInput.value;
