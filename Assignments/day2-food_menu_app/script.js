    const menuItem = [
        { menu: "팬케이크", category: "breakfast", prices: "5000원",
            discription: "갓 구운 팬케익과 맛있는 메이플 시럽", photo: "img/pancakes.png" 
        },
        { menu: "샌드위치", category: "breakfast", prices: "6000원",
            discription: "신선하고 맛있는 샌드위치", photo: "img/sandwich.png" 
        },
        { menu: "베이글", category: "breakfast", prices: "5000원",
            discription: "담백한 베이글과 크림치즈", photo: "img/bagel.png" 
        },
        { menu: "샐러드", category: "breakfast", prices: "3000원", 
            discription:"신선한 샐러드", photo: "img/salad.png" 
        },


        { menu: "우동", category: "lunch", prices: "6000원",
            discription: "따뜻한 우동", photo: "img/woodong.png" 
        },
        { menu: "라면", category: "lunch", prices: "4000원", 
            discription: "맛있는 라면", photo: "img/ramen.png" 
        },
        { menu: "돈까스", category: "lunch", prices: "6000원", 
            discription: "바삭한 돈까스", photo: "img/porkcutlet.png"
        },
        

        { menu: "초밥", category: "dinner", prices: "8000원",  
            discription: "신선한 활어회 초밥", photo: "img/sushi.png" 
        },
        { menu: "스테이크", category: "dinner", prices: "12000원", 
            discription: "잘 구운 스테이크", photo: "img/steak.png"
        },
        { menu: "피자", category: "dinner", prices: "9000원",
            discription: "신선한 치즈와 직접 반죽한 도우", photo: "img/pizza.png"
        },


        { menu: "초코쉐이크", category: "shakes", prices: "4000원",
            discription: "진한 초코쉐이크", photo: "img/chocoshake.png"
        },
        { menu: "딸기쉐이크", category: "shakes", prices: "3000원",
            discription: "딸기로 만든 상큼한 딸기 쉐이크", photo: "img/strawberryshake.png"
        },
        { menu: "요거트쉐이크", category: "shakes", prices: "2000원",
            discription: "상큼한 요거트 쉐이크", photo: "img/yogurtshake.png"
        }
    ]


    const foodContainer = document.querySelector("#food-container");
    const buttons = document.querySelectorAll("#category-buttons button");


    // 버튼 선택에 따라서 아이템 생성하는 함수
    function createList(item) {
        const div = document.createElement("div"); 
        div.classList.add("food-item");   
    
        const img = document.createElement("img");
        img.src = item.photo; 
        img.alt = item.menu;    
    
        const infoDiv = document.createElement("div"); 
        infoDiv.classList.add("food-info");
    

        const titlePriceDiv = document.createElement("div");
        titlePriceDiv.classList.add("food-title");
    
        const title = document.createElement("h3");  
        title.textContent = item.menu;
    
        const price = document.createElement("p");
        price.textContent = `${item.prices}`;
    
        titlePriceDiv.appendChild(title);
        titlePriceDiv.appendChild(price);
    
        
        const line = document.createElement("hr");
        line.classList.add("food-line");
    
        const desc = document.createElement("p");
        desc.textContent = item.discription;
    
        infoDiv.appendChild(titlePriceDiv);
        infoDiv.appendChild(line); 
        infoDiv.appendChild(desc); 
    
        div.appendChild(img);
        div.appendChild(infoDiv); 
    
        foodContainer.appendChild(div);
    }
    

    function renderMenu(category) {
        foodContainer.innerHTML = ""; 

        const filteredMenu =
            category === "all" ? menuItem : menuItem.filter((item) => item.category === category);

        filteredMenu.forEach(createList);
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            renderMenu(category);
        });
    });

    renderMenu("all");    // 첫화면에서 모든 메뉴 표시
