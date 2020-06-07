var adminName = "test";
var adminPassword = "1234";

var page = document.getElementById("main");

if ( localStorage.getItem("adminName") == "test")
{
    adminMenu();
}
else if ( localStorage.getItem("adminName") == null)
{
    logginPage();
}


function logginPage()
{
    page.innerHTML = "";
    page.insertAdjacentHTML("beforeend", 
    `
        <div>Admin inloggning</div>
        <div> Name:<input id='nameInput' type='text' ></input></div>
        <div>Lösenord: <input id='passInput' type='password'></input></div>
        <div><button id='loginButton'>Logga in</button></div>
    `
    );
    

    let loggin = document.getElementById("loginButton");
    loggin.addEventListener("click", function()
    {
        let name = document.getElementById("nameInput").value;
        let pass = document.getElementById("passInput").value;

        if (name == adminName && pass == adminPassword)
        {
            localStorage.setItem("adminName", "test")
            adminMenu()
        }
        else
        {
            logginPage();
        }

    });
}

function adminMenu()
{
    console.log("Inloggad!")
    page.innerHTML = "";
    page.insertAdjacentHTML("beforeend",
    `
    <div><button onclick='listUsers()'>Lista användare</button></div>
    <div><button onclick='listUsersString()'>Mail på prenumeranter</button></div>
    <div><button onclick='logout()'>Logga ut</button></div>

    `
    );

}

function logout()
{
    localStorage.removeItem("adminName");
    logginPage();
}
function listUsers()
{
    console.log("här var det användare!");

    fetch("http://localhost:3100/users") // fixa rätt väg lokalt
    .then(function(response)
    {
        return response.json();
    })
    .then(function(json)
    {
        page.innerHTML = "";
        page.insertAdjacentHTML("beforeend","<div><h2> Lista på användare </h2></div>");
        
        for (let i = 0; i < json.length; i++)
        {
        console.log(json[i]);  
        page.insertAdjacentHTML("beforeend",
        `
        <div>
        <b>Id:</b> ${json[i].id}, 
        <b>Namn:</b> ${json[i].userName}, 
        <b>Mail:</b> ${json[i].mail},
        <b>Password:</b> ${json[i].password} 
        <b>Prenumerationsstatus:</b> ${json[i].subscription} 
        </div>
        `
        );
        }

        page.insertAdjacentHTML("beforeend","<div><button onclick='adminMenu()'>Tillbaka till menyn</button></div>");
    });
}

function listUsersString()
{
    console.log("här var det användare i en sträng!");
    fetch("http://localhost:3100/users") // fixa rätt väg lokalt
    .then(function(response)
    {
        return response.json();
    })
    .then(function(json)
    {
        let allUsers = "";
        let mail = json.filter(a => a.subscription == true);
        page.innerHTML = "";
        page.insertAdjacentHTML("beforeend","<div><h2> Lista på användare </h2></div>");
        
        for (let i = 0; i < mail.length; i++)
        {
                allUsers += mail[i].mail + ", ";
        }
        page.insertAdjacentHTML("beforeend","<div>" + allUsers + "</div>");
       
        page.insertAdjacentHTML("beforeend","<div><button onclick='adminMenu()'>Tillbaka till menyn</button></div>");
    });
    
}
