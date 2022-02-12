document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#github-form')
    form.addEventListener('submit', submitForm)
    form.addEventListener('submit', fetchQuery)
})

function submitForm(e) {
    e.preventDefault()
    const search = e.target.search.value
    console.log(search)
    console.log("we out here")
}

function fetchQuery(e) {
    const username = e.target.search.value
    console.log(username)
    fetch(`https://api.github.com/search/users?q=${username}`)
    .then(res => res.json())
    .then(data => renderResult(data))
}

function renderResult(rawObj) {
    // console.log() the data received from GET Request.
    console.log(rawObj.items[0])

    // Iterate through the raw obj to get an easier to use object.
    // Cleans up the code.
    const usrObj = rawObj.items[0]

    // Grab the conatiner to append the User information
    const userContainer = document.querySelector('#user-list')

    // Create elements to append to the DOM

    // Create a User *card* to hold all information
    const li = document.createElement('li')
    const card = document.createElement('div')
    card.className = "card"
    li.appendChild(card)

    // Username
    const title = document.createElement('h1')
    title.innerText = usrObj.login
    card.appendChild(title)

    // User avatar
    const avatar = document.createElement('img')
    avatar.src = usrObj.avatar_url
    avatar.className = "img"
    avatar.addEventListener('click', () => {fetchRepos(usrObj)})
    card.appendChild(avatar)

    // GitHub link
    const gitHubLink = document.createElement('a')
    gitHubLink.href = usrObj.html_url
    gitHubLink.innerText = "Visit my Github page!"
    card.appendChild(gitHubLink)

    userContainer.appendChild(card)
}

function fetchRepos(obj) {
    console.log(obj)
    fetch(`https://api.github.com/users/${obj.login}/repos`)
    .then(res => res.json())
    .then(repos => repos.map((repo) => renderRepo(repo)))
}

function renderRepo(repo) {
    console.log(repo)

    const reposList = document.querySelector('#repos-list')
    const li = document.createElement('li')
    const a = document.createElement('a')
    li.appendChild(a)
    a.href = repo.html_url
    a.innerText = repo.name
    reposList.appendChild(li)
}

// This is an example of the object received through a GET Request to the API.
// let gitHubObject = {
//     "login": "foreverluiscastro",
//     "id": 79421975,
//     "node_id": "MDQ6VXNlcjc5NDIxOTc1",
//     "avatar_url": "https://avatars.githubusercontent.com/u/79421975?v=4",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/foreverluiscastro",
//     "html_url": "https://github.com/foreverluiscastro",
//     "followers_url": "https://api.github.com/users/foreverluiscastro/followers",
//     "following_url": "https://api.github.com/users/foreverluiscastro/following{/other_user}",
//     "gists_url": "https://api.github.com/users/foreverluiscastro/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/foreverluiscastro/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/foreverluiscastro/subscriptions",
//     "organizations_url": "https://api.github.com/users/foreverluiscastro/orgs",
//     "repos_url": "https://api.github.com/users/foreverluiscastro/repos",
//     "events_url": "https://api.github.com/users/foreverluiscastro/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/foreverluiscastro/received_events",
//     "type": "User",
//     "site_admin": false,
//     "score": 1
// }