let cardsArr = [];

let SearchBtn = document.querySelector(".search_btn button");
SearchBtn.addEventListener("click", () => {
    let Api_key = "98a07470068b960d762b6ee157eb0555";
  let inputCity = document.querySelector(".search_bar input");
let inputCityName = inputCity.value.trim();
  getWeatherDetails(Api_key, inputCityName);
   inputCityName.value = "";
});

let err = document.querySelector(".error-message");
async function getWeatherDetails(Api_key, cityName) {
  try {
    let Url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${Api_key}&units=metric`;
    let response = await fetch(Url);
    let data = await response.json();
    createCard(data);
    err.style.display = "none";
  } catch (data) {
    err.style.display = "block";
  }
}
let Cards_Container = document.querySelector(".weather_cards");
let weatherImg = document.querySelector(".weather-img img");
function createCard(cityData) {
  let max_Temp = Math.floor(cityData.main.temp_max);
  let min_Temp = Math.floor(cityData.main.temp_min);
  let cityName = cityData.name;
  let temperature = Math.floor(cityData.main.temp);
  let weatherType = cityData.weather[0].main;
  let weatherImage;
  if (cityData.weather[0].main == "Clouds") {
    weatherImage = "./images/Moon cloud fast wind.png";
  }
  if (cityData.weather[0].main == "Haze") {
    weatherImage = "images/Moon cloud mid rain.png";
  }
  if (cityData.weather[0].main == "Clear") {
    weatherImage = "images/clear sky.png";
  }
  if (cityData.weather[0].main == "Rain") {
    weatherImage = "images/Moon cloud fast wind.png";
  }
  if (cityData.weather[0].main == "Drizzle") {
    weatherImage = "images/Tornado.png";
  }
  if (cityData.weather[0].main == "Mist") {
    weatherImage = "images/Moon cloud mid rain.png";
  }
  let CardDiv = document.createElement("div");
  CardDiv.classList.add("single_card");
  CardDiv.classList.add("animate__animated", "animate__fadeIn");
  let cardHtml = `<div class="single_card">
    <div class="background-svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="343" height="175" viewBox="0 0 343 175" fill="none">
            <path
                d="M0.42749 66.4396C0.42749 31.6455 0.42749 14.2484 11.7535 5.24044C23.0794 -3.76754 40.0301 0.147978 73.9315 7.97901L308.33 62.1238C324.686 65.9018 332.864 67.7909 337.646 73.8031C342.427 79.8154 342.427 88.2086 342.427 104.995V131C342.427 151.742 342.427 162.113 335.984 168.556C329.54 175 319.169 175 298.427 175H44.4275C23.6857 175 13.3148 175 6.87114 168.556C0.42749 162.113 0.42749 151.742 0.42749 131V66.4396Z"
                fill="url(#paint0_linear_642_26)" />
            <defs>
                <linearGradient id="paint0_linear_642_26" x1="0.42749" y1="128" x2="354.57" y2="128"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#5936B4" />
                    <stop offset="1" stop-color="#362A84" />
                </linearGradient>
            </defs>
        </svg>
    </div>
    <div class="card-top">
        <div class="temp">${temperature}°</div>
        <div class="weather-img">
            <img src="${weatherImage}" alt="tornado">
        </div>

    </div>
    <div class="card-bottom">
        <div class="bottom-left">
            <div class="pressure">
                <div class="high">H:${max_Temp}</div>
                <div class="low">L:${min_Temp}</div>
            </div>
            <div class="city_name">
               ${cityName}
            </div>

        </div>
        <div class="bottom-right">${weatherType}</div>

    </div>
</div> `;
  CardDiv.innerHTML = cardHtml;
  cardsArr.push({ temperature, CardDiv });
  appendUi(cardsArr);
}
function appendUi(CardsArr) {
  Cards_Container.innerHTML = "";
  CardsArr.sort((a, b) => a.temperature - b.temperature);
  CardsArr.forEach((card) => {
    Cards_Container.appendChild(card.CardDiv);
  });
}
