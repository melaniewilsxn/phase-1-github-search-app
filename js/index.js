
const search = () => {
    const inputForm = document.querySelector("form#github-form");
  
    inputForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = document.querySelector("input#search");
      
        fetch(`https://api.github.com/users/${input.value}`, {
            method: 'GET',
            headers: {
            "Accept": "application/vnd.github.v3+json"
            }
          })
          .then((response) => response.json())
          .then((userData) => createUser(userData))
          
        //     document.querySelector(`#${userData.login}`).addEventListener('click', () => {
        //         fetch(`https://api.github.com/users/${userData.login}/repos`,{
        //             method: 'GET',
        //             headers: {
        //             "Accept": "application/vnd.github.v3+json"
        //             }
        //         })
        //         .then((response) => response.json())
        //         .then((repoData) => repoData.forEach(repo => {
        //             let repoElement = document.createElement('div')
        //             repoElement.innerHTML = `${repo.name}`
                    
        //             document.querySelector("#repos-list").appendChild(repoElement)
        //         }))
                // .then((repoData) => repoData.forEach(){
                //   let repo = document.createElement('div')
                //   user.innerHTML = `
                //   <img src="${data.avatar_url}"/>
                //   <h1>${data.login}</h1>
                //   <a href="${data.html_url}">Profile Link</a>`
      
                //   document.querySelector("#user-list").appendChild(user)
        //     })
        //   })
        })
  };

document.addEventListener('DOMContentLoaded', search);

function createUser(userData){
    let user = document.createElement('div')
    user.className = "searched_user"
    user.innerHTML = `
    <img id="${userData.login}" src="${userData.avatar_url}"/>
    <h2>${userData.login}</h2>
    <p>Visit ${userData.login}\'s Github profile
    <a href="${userData.html_url}">here</a></p>
    <p>Click ${userData.login}\'s avatar to load their repositories
    </p>`

    document.querySelector("#user-list").appendChild(user)

    let repo = document.createElement('div')
    repo.className = "searched_user_repo"
    repo.id = `${userData.login}Repo`
    document.querySelector("#repos-list").appendChild(repo)

    document.querySelector(`img#${userData.login}`).addEventListener('click', () => {
        fetch(`https://api.github.com/users/${userData.login}/repos`,{
            method: 'GET',
            headers: {
            "Accept": "application/vnd.github.v3+json"
            }
            })
        .then((response) => response.json())
        // .then((repoData) => createRepo(repoData))
        .then((repoData) => repoData.forEach(repo => createRepo(repo)))
    })
}

function createRepo(repo){
    let repoElement = document.createElement('li')
    repoElement.innerHTML = `${repo.name}`
    
    document.querySelector(`div#${repo.owner.login}Repo`).appendChild(repoElement)
    document.querySelector("#repos-list").className = ""
}

// function createRepo(repoData){
//     // console.log(repoData)
//     for (i=0; i<repoData.length; i++){
//         console.log(repoData[i].name)
//     }
// }