const usernameInput = document.getElementById("username");

usernameInput.addEventListener("input", async (e) => {
    const username = e.target.value.trim();

    if (username.length == 0) {
        return;
    }
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {  
            document.getElementById("result-container").innerHTML = `<p id="error-message">User not found</p>`;
            document.getElementById("repos").innerHTML = "";
            return;
        }

        const data = await response.json();    

        const profileDiv = document.getElementById("profile");
        const joinDate = new Date(data.created_at).toLocaleDateString();

        profileDiv.innerHTML = `
            <div class="user-card">
                <img src="${data.avatar_url}" alt="${data.login}" width="230" style="border-radius: 2px; margin-top:20px"/>
                <div id="user-info">
                    <h2 id="user-id">${data.login}${data.name ? ` (${data.name})` : ""}</h2>
                    <div id="info">
                        <p>bio: ${data.bio || " -"}</p>
                        <p>company: ${data.company || " -"}</p>
                        <p>location: ${data.location || " -"}</p>
                        <p>Member Since: ${joinDate}</p>
                        <br>
                        <span class="user-stat follow">Follwers: ${data.followers} &nbsp;| &nbsp;Following: ${data.following}</span>
                        <span class="user-stat gist">Public Gists: ${data.public_gists}</span>
                        <span class="user-stat repos">Public Repos: ${data.public_repos}</span>
                    </div>
                </div>
            </div>
        `

            //레포 정보 불러오기
            const responseRepos = await fetch(`https://api.github.com/users/${username}/repos`);

            const reposData = await responseRepos.json(); 
            console.log(reposData);

            const reposDiv = document.getElementById("repos");
            if (!reposData || reposData.length === 0) {
                reposDiv.innerHTML = `<p>No repositories found....</p>`;
                return;
            }
           
            reposDiv.innerHTML = `<h3 style="margin:0 10px;">Latest Repos</h3>`;

            const reposList = document.createElement("div");
            reposList.classList.add("repos-list"); 
    
            for (let item of reposData) {
                const repoCard = document.createElement("div");    
                repoCard.classList.add("repos-card");
                repoCard.innerHTML = `
                    <h3>${item.name}</h3>
                    <p style="font-weight:500; margin-bottom:35px; ${item.description ? '' : "color:#cdcdcd;"}">
                        ${item.description || "No description"}
                    </p>
                    <span class="repo-stat watchers">watchers: ${item.watchers_count}</span>
                    <span class="repo-stat stars">stars: ${item.stargazers_count}</span>
                    <span class="repo-stat forks">forks: ${item.forks_count}</span>
                    <p style="margin-top: 7px">Language - ${item.language || ""}</p> 
                `;
                reposList.appendChild(repoCard);
            }

            reposDiv.appendChild(reposList);


    }
    catch {
        console.error("API 요청 실패:", err);
    }
});