const email = document.getElementById("inputEmail");
const password = document.getElementById("inputPassword")
const loginForm = document.getElementById("loginForm")
const loginError = document.getElementById("loginError")

loginForm.addEventListener("submit", login)

function login(event) {
    event.preventDefault()
    console.log(email.value)
    console.log(password.value)

    if (email.value !== "fakeemail@fake.com" || password.value !== "fake") {
        showError()
        return
    }
    window.location.href="/index.html"
    
    
}

function showError() {
    loginError.innerHTML = `
    <div class="alert alert-danger" role="alert">
    Incorrect username or password.
    </div>
    
    `
}


