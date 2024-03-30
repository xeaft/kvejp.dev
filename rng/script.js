function getRandomNumber() {
    return Math.round(Math.random() * 100) % 100;
}

let text = document.getElementsByTagName("p")[0];
text.innerText = getRandomNumber();

document.onmouseup = () => { text.innerText = getRandomNumber(); };
document.ontouchend = () => { text.innerText = getRandomNumber(); };
