
const submitButton = document.getElementById('submitBtn');

submitButton.addEventListener('click', ()=>{
    const key = document.getElementById('task-title').value;
    const value = document.getElementById('task-desc').value;

    
    localStorage.setItem(key,value);

    console.log("saved Successfully");
})
