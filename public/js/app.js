console.log("client side JS file is loaded");


// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=> {
//         console.log(data)
//     })
// })




const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')




weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    //console.log(location);
    const url = '/weather?address=' + location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message1.textContent = JSON.stringify(data.error)
                message2.textContent = ''
            }
            else {
                message1.textContent = ''
                message2.textContent =  JSON.stringify(data.forecast)  }
        })
    })
})
