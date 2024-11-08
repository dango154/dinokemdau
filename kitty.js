document.addEventListener("DOMContentLoaded", () => {
    const yesButton = document.getElementById("yes-btn");
    const noButton = document.getElementById("no-btn");
    const helloKittyImage = document.querySelector(".hello-kitty");

    let isMusicPlaying = false;
    let audio = null; 
    let sparkleInterval; 

    function moveNoButton() {
        const randomX = Math.floor(Math.random() * 800) - 250;
        const randomY = Math.floor(Math.random() * 400) - 250;
        noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }


    function createSparkle() {
        const sparkle = document.createElement("div");

   
        const rand = Math.random();
        let sparkleClass;
        if (rand < 0.33) {
            sparkleClass = "sparkle-circle";
        } else if (rand < 0.66) {
            sparkleClass = "sparkle-diamond";
        } else {
            sparkleClass = "sparkle-heart";
        }

        sparkle.classList.add(sparkleClass);

        sparkle.style.top = Math.random() * window.innerHeight + "px";
        sparkle.style.left = Math.random() * window.innerWidth + "px";

        document.body.appendChild(sparkle);

   
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }

    function startSparkles() {
        sparkleInterval = setInterval(createSparkle, 100); 
    }

    function stopSparkles() {
        clearInterval(sparkleInterval); 
    }

    function playMusic() {
        if (!isMusicPlaying) {
            audio = new Audio("nhac/music.mp3");
            audio.loop = true;
            audio.play().catch(error => {
                console.log("Lỗi khi phát nhạc:", error);
            });
            isMusicPlaying = true;
        }
    }

    function stopMusicOnTabChange() {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                if (audio) {
                    audio.pause();  
                    isMusicPlaying = false;
                }
            } else {
                if (!isMusicPlaying && audio) {
                    audio.play();  
                    isMusicPlaying = true;
                }
            }
        });
    }

    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        noButton.addEventListener("click", moveNoButton);
    } else {
        noButton.addEventListener("mouseover", moveNoButton);
    }

    yesButton.addEventListener("click", () => {
        helloKittyImage.src = "pic/meoyeu.png";
        
        const message = document.createElement("div");
        message.classList.add("message");
        message.innerText = "💖˚🎂˖ e xinh lắm! 𓍢ִ໋🌷͙֒✧˚.🎀༘⋆";  


        message.addEventListener("click", () => {
            window.open("https://drive.google.com/file/d/1ygSB0BWj_xa4EKHjCJbue3p1Jo6sJDPo/view?usp=sharing", "_blank"); 
        });

        document.body.appendChild(message);
        

        document.body.classList.add("no-scroll");

        setTimeout(() => {
            message.remove(); 
            document.body.classList.remove("no-scroll"); 
        }, 100000);

        startSparkles(); 
        playMusic(); 
    });

  
    stopMusicOnTabChange();
});
