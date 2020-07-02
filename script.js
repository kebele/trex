// thanks to https://github.com/kubowania

document.addEventListener('DOMContentLoaded', () => {

    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alert = document.querySelector('#alert');
    let isJumping = false
    let gravity = 0.9
    let isGameOver = false

    function control(e){
        // keycode.info
        if(e.keyCode === 32){
            //code
            console.log('tıklandı!')
            if(!isJumping){
                isJumping = true
                jump();
            }
        }
    }

    document.addEventListener('keyup', control)

    let position = 0
    function jump(){
        let count = 0
        let timerId = setInterval(()=>{
            //move down
            if(count === 15){
                clearInterval(timerId)
                console.log("aşağı indi")
                let downTimerId = setInterval(() => {
                    if(count === 0){
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                    position -= 5
                    count --
                    position = position * gravity
                dino.style.bottom = position + 'px'
                }, 20)                
            }


            //move up,
            console.log("zıpladı")
            position += 30
            count ++
            position = position * gravity
            dino.style.bottom = position + 'px'
            console.log(dino.style.bottom)
        }, 20)
    }

    function generateObstacles(){
        let randomTime = Math.random() * 4000
        let obstaclePosition = 1000
        const obstacle = document.createElement('div')
        if(!isGameOver){obstacle.classList.add('obstacle')}
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'

        let timerId = setInterval(() => {
            //code
            if(obstaclePosition > 0 && obstaclePosition < 60 && position < 60 ){
                clearInterval(timerId)
                // alert("game over")
                alert.innerHTML = 'game over'
                isGameOver = true
                //remove all children
                while(grid.firstChild){
                    grid.removeChild(grid.lastChild)
                }
            }


            obstaclePosition -=10
            obstacle.style.left = obstaclePosition + 'px'
        }, 20)
        if(!isGameOver){
            setTimeout(generateObstacles, randomTime);
        }
    }

    generateObstacles();
})