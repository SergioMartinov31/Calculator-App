const timeElem = document.querySelector(".phone-header__time-text");


let updateTime = function() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); 
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeElem.textContent = `${hours}:${minutes}`;
}

updateTime();

setInterval(updateTime, 1000);