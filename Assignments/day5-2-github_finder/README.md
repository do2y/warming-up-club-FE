## 🧭 GitHub Finder App

> GitHub 사용자의 프로필과 공개 저장소 정보를 조회할 수 있는 사용자 검색 웹 애플리케이션입니다. <br>
> 사용자가 입력한 GitHub username을 기반으로 API 요청을 보내 프로필 정보와 최신 저장소 목록을 화면에 표시합니다.

<br>

### 🎞 Preview
<p align="center">
  
![2025-12-04160357-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/60d9a806-b4d0-4551-b1d8-59fb2ab86e2b)

</p>
<br>

## ⁘ 기능 소개

#### 1. GitHub 사용자 검색  
사용자가 username을 입력하면 GitHub API(`https://api.github.com/users/{username}`)로 요청을 보내  
해당 사용자의 공개 프로필 정보를 실시간으로 가져옵니다.

#### 2. 프로필 정보 출력  
조회된 사용자 데이터에서 다음 정보를 시각적으로 구성해 화면에 표시합니다.  
- 아바타 이미지  
- 사용자명 및 실제 이름  
- bio, company, location  
- 가입일  
- followers / following / public repos / public gists  

#### 3. 저장소 목록 조회  
사용자의 공개 저장소(repos) API를 호출하여  
각 저장소의 이름, 설명, watchers, stars, forks, 사용 언어 등을 카드 형태로 출력합니다.

#### 4. 사용자 존재 여부 확인  
존재하지 않는 username을 입력한 경우:  
- 프로필과 저장소 영역을 초기화하고  
- **"User not found"** 메시지를 화면에 표시합니다.

#### 5. 실시간 입력 기반 검색  
폼 제출 방식이 아닌 **input 이벤트 기반 자동 검색**으로 구현해  
사용자가 입력하는 즉시 결과가 갱신되도록 구성했습니다.

<br>

## ⁘ 기술적 구현 특징
- `fetch` API를 활용해 GitHub REST API와 비동기 통신을 수행하고 응답 상태 코드를 기반으로 에러를 처리했습니다.  
- 프로필 정보와 저장소 정보 영역을 분리하여 API 응답에 따라 각각 독립적으로 DOM이 업데이트되도록 설계했습니다.  
- 입력 이벤트(input) 기반의 즉각적 검색 방식을 적용해 사용자 입력 변화에 실시간으로 반응하도록 구성했습니다.
  
