window.addEventListener("DOMContentLoaded", () =>{
    const input = document.querySelector(".informal__input");
          searchButton = document.querySelector(".informal__search");
          mainContainer = document.querySelector(".about__container");
          showStatusErorr = document.querySelector(".error__status");

    searchButton.addEventListener("click", () =>{
        const url = `https://baza-gai.com.ua/nomer/${takenum(input)}`;
              key = "f27dc346b760748b58f82326f7005f4d";

        function takenum(number){
            const result = number.value.replace(/\s+/g, '').toUpperCase();
            return result;
        }
        getResource(url, {
            headers: {
                "Accept": "application/json",
                "X-Api-Key": key,
            }
        })
        .then(data => createElemet(data))
        .catch(err => console.log(err))
    
        async function getResource(link, headers){
            const res = await fetch(link, headers);
            
            if(!res.ok){
                showStatusErorr.innerText = `Не найдено.${res.status}`;
                throw new Error(`Could not find. Status: ${res.status}`)
            }else{
                showStatusErorr.innerText = "";
            }
            return await res.json()
        }
     
        function stealOfCar(steal){
            const info = {
                stolen: "Ваша машина в розыске",  
                clear: "Не числится в угоне на сегодняшний день"
            }
            return steal ? info.stolen : info.clear;
        }

        function checkOperations(arr){
            const containerOflaws = document.querySelector(".about__laws");
            const div = document.createElement("div")
            div.classList.add("about__technical");
            let infoAboutFirstRegistration = "";
            if(arr.length > 1){
                arr.forEach((element, index) => {
                    div.innerHTML += `
                        <div class="about__card">
                            <div class="about__item">
                                <p class="about__item-name">Адрес</p> 
                                ${element.address}
                            </div>
                            <div class="about__item">
                                 <p class="about__item-name">Тип</p>  
                                 ${element.kind.ru}
                            </div>
                            <div class="about__item">
                                <p class="about__item-name">Цвет</p> 
                                ${element.color.ru}
                            </div>
                            <div class="about__item">
                                <p class="about__item-name">Год</p>
                                ${element.modelYear}
                            </div>
                            <div class="about__item">
                                <p class="about__item-name">Приметы</p>
                                ${element.notes}
                            </div>
                            <div class="about__item">
                                <p class="about__item-name">Регистрация</p>
                                ${element.registered_at}
                            </div>
                        </div>
                    `
                });
            }else{
                arr.forEach(element  =>{
                    infoAboutFirstRegistration = `
                    <div class="about__card">
                        <div class="about__item">
                            <p class="about__item-name">Адрес</p> 
                            ${element.address}
                        </div>
                        <div class="about__item">
                            <p class="about__item-name">Цвет</p>
                            ${element.color.ru}
                        </div>
                        <div class="about__item">
                            <p class="about__item-name">Тип</p>  
                            ${element.kind.ru}
                        </div>
                        <div class="about__item">
                            <p class="about__item-name">Год</p>
                            ${element.modelYear}
                        </div>
                        <div class="about__item">
                            <p class="about__item-name">Приметы</p>
                            ${element.notes}
                        </div>
                        <div class="about__item">
                            <p class="about__item-name">Регистрация</p>
                            ${element.registered_at}
                        </div>
                    </div>
                    `
                })
                div.innerHTML = infoAboutFirstRegistration;
            }
            mainContainer.appendChild(div);
        }   

        function createElemet(response){
            mainContainer.innerHTML = `
            <div class="about__car">
                <h2 class="about__title">${response.vendor} ${response.model} <span class="about__title-year">${response.model_year}<span></h2>
                <div class="about__photo">
                    <img class="about__img" src="${response.photo_url}" alt="${response.vendor}">
                </div>
            </div>
            <div class="about__laws">
                <a class="about__insurance" href="https://policy-web.mtsbu.ua/" target="_blank">Узнать VIN и страховку</a>
                <div class="about__steal">${stealOfCar(response.is_stolen)}</div>
            </div>
            <div class="registration__num">Машину регистрировали: ${response.operations.length}</div>
            `
            checkOperations(response.operations);
        }
        mainContainer.innerHTML = ""
    })
})


const aboutProject = document.querySelector(".header__link-open")
const popup = document.querySelector(".popup")
const closeBtn = document.querySelector(".close-popup")

aboutProject.addEventListener("click", () =>{
    if(popup){
        popup.classList.add("popup--active")
    }
    popup.classList.add("popup--active")
})

closeBtn.addEventListener("click", () =>{
    if(popup.classList.contains("popup--active")){
        popup.classList.remove("popup--active");
    }
})

