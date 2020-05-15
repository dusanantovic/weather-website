const weatherForm = document.querySelector("form");
const search = document.querySelector("input[name='location']");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    const response = await fetch(`/weather?address=${location}`);
    const data = await response.json();
    messageOne.textContent = "";
    if(data.error) {
        messageOne.textContent = data.error;
    } else {
        messageOne.textContent = data.forecast;
        messageTwo.textContent = data.location;
    }
});