

fetch('todo.json')
  .then(response => response.json())
  .then(data => {
    // Connects the JSON 'text' field to the HTML element
    document.getElementById('todo-list').textContent = data.text;
  })
  .catch(error => console.error('Error loading JSON:', error));




const button = document.querySelector("#myButton");

button.addEventListener("click", ()=> {
    alert("Button Clicked");
});