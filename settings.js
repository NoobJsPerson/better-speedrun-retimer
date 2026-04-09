/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-template-curly-in-string
const modMessage = 'Mod Message: Time starts at ${start} and ends at ${end}${pauses}with a framerate of ${framerate} FPS to get a final time of ${timeStr}.\nRetimed using [Better Speedrun Retimer](https://noobjsperson.github.io/better-speedrun-retimer)';
let currentModMessage = localStorage.getItem('currentModMessage') || modMessage;
const select = document.getElementsByTagName('select')[0];
const framerateInput = document.getElementById('framerate-input');
framerateInput.value = localStorage.getItem('framerate') || 30;
select.value = localStorage.getItem('LA') || 'EN';
select.onchange = (event) => {
	localStorage.setItem('LA', event.target.value);
	// eslint-disable-next-line no-undef
	translatePage(false);
};
framerateInput.onchange = () => {
	localStorage.setItem('framerate', framerateInput.value);
};
document.getElementById('customModMessage').value = currentModMessage;
document.documentElement.setAttribute('theme', localStorage.getItem('theme') || 'light');
function setModMessage(event) {
	if (event && event.target.value.replace(/\s/g, '') && event.target.value !== modMessage) {
		currentModMessage = event.target.value;
		localStorage.setItem('currentModMessage', currentModMessage);
	}
}
function changeMode() {
	const wanted = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
	document.documentElement.setAttribute('theme', wanted);
	localStorage.setItem('theme', wanted);
}

function resetModMessage() {
	localStorage.removeItem('currentModMessage');
	document.getElementById('customModMessage').value = modMessage;
}
