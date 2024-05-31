/* eslint-disable no-unused-vars */
const inputUrl = document.getElementById('url');
const ytRegex = /youtu(?:be\..+?|.be)\/(?:watch.*?v=|embed\/|shorts\/|)([A-Za-z0-9_-]+).*?((?<=(?:\?|&)t=))*(\d+)*/;
const twitchRegex = /twitch\.tv\/videos\/(\d+)/;
const driveRegex = /drive\.google\.com\/file\/d\/(.*)\//;

const select = document.getElementsByTagName('select')[0];
select.value = localStorage.getItem('LA') || 'EN';
select.onchange = (event) => {
	localStorage.setItem('LA', event.target.value);
	// eslint-disable-next-line no-undef
	translatePage(false);
};

function parseTwitchId(videoUrl) {
	const reg = videoUrl.match(twitchRegex);
	if (reg && reg.length >= 2) return reg[1];
	return null;
}

function parseYoutubeId(videoUrl) {
	const reg1 = videoUrl.match(ytRegex);
	if (reg1 && reg1.length >= 2) return [reg1[1], reg1[2]];
	return [null];
}

function parseDriveId(videoUrl) {
	const reg = videoUrl.match(driveRegex);
	if (reg && reg.length >= 2) return reg[1];
	return null;
}

function redirectYoutube(url) {
	const [id, t] = parseYoutubeId(url);
	if (id) window.location.href = `new_run.html?id=${id}&type=y${t ? `&t=${t}` : ''}`;
}

function redirectTwitch(url) {
	const id = parseTwitchId(url);
	if (id) window.location.href = `new_run.html?id=${id}&type=t`;
}

function redirectDrive(url) {
	const id = parseDriveId(url);
	if (id) window.location.href = `new_run.html?id=${id}&type=d`;
}

function redirect() {
	const url = inputUrl.value;
	redirectYoutube(url);
	redirectTwitch(url);
	redirectDrive(url);
}

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/speedrun-timer/ServiceWorker.js');
	});
}
