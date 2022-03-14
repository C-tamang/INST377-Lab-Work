function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min)
  const newMax = Math.floor(max)
  return Math.floor(
    Math.random() * (newMax - newMin + 1) + newMin
  )
}

// Data Handler
function dataHandler(dataArray) {
  console.log('fired dataHandler')
  //console.table(dataArray)
  const range = [...Array(15).keys()]
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1)
    return dataArray[restNum]
  })
  //console.log(listItems)
  return listItems
}

function createHtmlList(collection) {
  console.log('fired HTML creator')
  console.log(collection)
  const targetList = document.querySelector('.resto-list')
  targetList.innerHTML = ''
  collection.forEach((item) => {
    const {name} = item
    const displayName = name.toLowerCase()
    const injectThisItem = `<li>${displayName}</li>`
    targetList.innerHTML += injectThisItem
  });
}

// Main function
async function mainEvent() { // the async keyword means we can make API requests
  console.log('script loaded')
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('.submit_button')
  submit.style.display = 'none'

  const results = await fetch('/api/foodServicesPG')
  const arrayFromJson = await results.json()
  console.log(arrayFromJson)

  if(arrayFromJson.data.length > 0) {
    submit.style.display = 'block'
    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault()
      console.log('form submission')
      const restoArray = dataHandler(arrayFromJson.data)
      createHtmlList(restoArray)
    })

  }


}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
