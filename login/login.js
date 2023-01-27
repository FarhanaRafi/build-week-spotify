const email = document.getElementById("inputEmail");
const password = document.getElementById("inputPassword")
const loginForm = document.getElementById("loginForm")
const loginError = document.getElementById("loginError")

loginForm.addEventListener("submit", login)

function login(event) {
    event.preventDefault()
    console.log(email.value)
    console.log(password.value)

    if (email.value !== "johndoe@xyz.com" || password.value !== "abcd") {
        showError()
        return
    }
    window.location.href="/index.html"
    
    
}

function showError() {
    loginError.innerHTML = `
    <div class="alert alert-danger" role="alert">
    <i class="bi bi-exclamation-diamond-fill"></i> Incorrect username or password.
    </div>
    
    `
}


