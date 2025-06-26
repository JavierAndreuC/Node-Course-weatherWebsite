const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From js'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            return messageOne.textContent = data.error
        }

        console.log(data)
        messageOne.textContent = `${data.address.charAt(0).toUpperCase() + data.address.slice(1)}, ${data.forecast}`
        messageTwo.textContent = `Temperature: ${data.temperature}°C\nFeels like: ${data.feelslike}°C\nPrecipitation: ${data.precipitation}`
    })
})
})