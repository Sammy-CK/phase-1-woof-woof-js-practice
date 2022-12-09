document.addEventListener('DOMContentLoaded', showDog)


//shows the dog name and details
    function showDog(){
const names = document.querySelector('#dog-bar')

const details = document.querySelector("#dog-info")

const dogImg = document.createElement('img')

const h2DogName = document.createElement('h2')

const goodBadButton = document.createElement('button')

fetch('http://localhost:3000/pups')
.then(resp => resp.json())
.then(data => {
    data.forEach(dog => {
const nameSpan = document.createElement('span')

nameSpan.innerText = dog.name
names.appendChild(nameSpan)


nameSpan.addEventListener('click', dogDetails)


//shows the dog details
    function dogDetails(){

    dogImg.src = dog.image
    details.appendChild(dogImg)

    h2DogName.innerText = dog.name
    details.appendChild(h2DogName)

    if(dog.isGoodDog === true){
        goodBadButton.innerText = 'Good Dog!'
    }else if(dog.isGoodDog === false)
    goodBadButton.innerText = 'Bad Dog!'


    goodBadButton.addEventListener('click', goodBadToggle)


//toggles between true and false in isGoodDog 
    function goodBadToggle(){
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                Accept : "application/json"
            },
            body : JSON.stringify({
                name : dog.name,
                isGoodDog : ((dog.isGoodDog === true)? false : true),
                image : dog.image
            })
        }).then(resp => resp.json())
        .then(data => {
            goodBadButton.innerText = (data.isGoodDog === true)?'Good Dog!': (data.isGoodDog === false)?"Bad Dog!":"hey"
        })

    }

    details.appendChild(goodBadButton)
}


    })
})

}