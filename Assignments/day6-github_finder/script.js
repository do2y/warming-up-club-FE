const usernameInput = document.getElementById("username");

usernameInput.addEventListener("input", async (e) => {
    const username = e.target.value.trim();

    if (username.length == 0) {
        //아무것도.....
        return;
    }
    try {
        //Github api
        //fetch함수 안에 api를 ....
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {  //fetch api에서 반환된 응답(객체)에 있는 속성 - boolean값
            document.getElementById("result-container").innerHTML = `<p id="error-message">User not found</p>`;
            document.getElementById("repos").innerHTML = "";
            return;
        }

        //response.ok가 true면
        const data = await response.json();    
        //응답을 읽어서 json을 js객체로 파싱 -> response.json()가 promise라서 await 붙여야함.
        //body를 JSON 객체로 변환해서 data에 담는 과정
        console.log(data);

        const profileDiv = document.getElementById("profile");
        profileDiv.innerHTML = `
            <div class="user-card">
                <img src="${data.avatar_url}" alt="${data.login}" width="200" style="border-radius: 2px;"/>
                <div id="user-info">
                    <h2 id="user-id">${data.login}${data.name ? ` (${data.name})` : ""}</h2>
                    <div id="info">
                        <p>Follwer: ${data.followers} | Following: ${data.following}</p>
                        <p>bio: ${data.bio || ".."}</p>
                        <p>company: ${data.company || ".."}</p>
                        <br>
                        <p>Public Repos: ${data.public_repos}</p>
                    </div>
                </div>
            </div>
        `



    }
    catch {

    }
});


async function getUser(username) {
  const profileRes = await fetch(`https://api.github.com/users/${username}`);
  const profile = await profileRes.json();

  const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await repoRes.json();

  console.log(profile); // 프로필 정보
  console.log(repos);   // 레포 정보
}