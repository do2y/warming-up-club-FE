const usernameInput = document.getElementById("username");

usernameInput.addEventListener("input", async (e) => {
    //깃허브 api 연동해서.... username에 해당하는 사용자 정보 불러오기
    //(프로필 정보 / 레포 정보)

    //만약 대응하는 username이 없을 시 wrap-container 상단 구역에 User not found div 나타나도록.
    const username = e.target.value.trim();

    if (username.length == 0) {
        //아무것도.....
        return;
    }
    try {
        //Github api
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            //User non found div 만들기
        }
        const data = await response.json();

        //#profile에 프로필 정보,
        //#repos에 레포 정보 보여주기

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