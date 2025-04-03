const gridPositions = document.querySelector('.map')
const slots = document.querySelectorAll('.button')
const playGame = document.querySelector('.play')
const mainGame = document.querySelector('main')
const gameTime = document.querySelector('.timer')
const flagCounter = document.querySelector('.flag')
const retryGame = document.querySelector('.retry')
const retryMessage = document.querySelector('#retrymessage')
const victoryMessage = document.querySelector('#victorymessage')
const instructionImage = document.querySelector('.image')

let count = 0;
let timerInterval
let cleared = 0;
let flag = 10;


function play(){
    mainGame.classList.remove('hide')
    playGame.classList.add('hide')
    instructionImage.classList.add('hide')
    minePosition()
    minesNearbyCheck()
    gameTimer()
    gameTime.textContent = `${count}`
    flagCounter.textContent = `${flag}`   
}


function slotClicked(event){
    const clickedSlotPosition = event.target
    if(event.target.classList.contains('mine')){
        event.target.innerHTML = 'M'
        clearInterval(timerInterval)
        slots.forEach(slot => {
            slot.classList.remove('unclicked')
            slot.classList.remove('flag')
            if(slot.classList.contains('mine')){
                slot.innerHTML = 'M' 
            }  
        })
        gameTime.classList.add('hide')
        flagCounter.classList.add('hide')
        retryGame.classList.remove('hide')
        retryMessage.textContent = "Unlucky, You Lost!"
    }
    if(clickedSlotPosition.classList.contains("level1")){
        clickedSlotPosition.innerHTML = '1'
    }
    if(clickedSlotPosition.classList.contains("level2")){
        clickedSlotPosition.innerHTML = '2'
    }
    if(clickedSlotPosition.classList.contains("level3")){
        clickedSlotPosition.innerHTML = '3'
    }
    if(clickedSlotPosition.classList.contains("level4")){
        clickedSlotPosition.innerHTML = '4'
    }
    if(clickedSlotPosition.classList.contains("level5")){
        clickedSlotPosition.innerHTML = '5'
    }
    if(clickedSlotPosition.classList.contains("level6")){
        clickedSlotPosition.innerHTML = '6'
    }
    if(clickedSlotPosition.classList.contains("level7")){
        clickedSlotPosition.innerHTML = '7'
    }
    if(clickedSlotPosition.classList.contains("level8")){
        clickedSlotPosition.innerHTML = '8'
    }
    recursiveMineSweep(clickedSlotPosition)
}


function recursiveMineSweep(clickedSlotPosition){

    let leftPosition = clickedSlotPosition.id -1;
    let rightPosition = clickedSlotPosition.id - (-1);
    let upPosition = clickedSlotPosition.id -10;
    let downPosition = clickedSlotPosition.id -(-10);
    
    
    if(clickedSlotPosition.classList.contains('unclicked')){
        cleared ++;
        if(cleared === 90){
            winCondition()
        }
    }
    clickedSlotPosition.classList.remove('unclicked')
    
    if(clickedSlotPosition.classList.contains('level0')){

        if(leftPosition >= 0 && leftPosition <= 99){
            if(clickedSlotPosition.id % 10 !== 0){
                if(slots[leftPosition].classList.contains('level0') && slots[leftPosition].classList.contains('unclicked')){
                    recursiveMineSweep(slots[leftPosition])
                }
            }
        }
        if(rightPosition >= 0 && rightPosition <= 99){
            if(clickedSlotPosition.id % 10 !== 9){
                if(slots[rightPosition].classList.contains('level0') && slots[rightPosition].classList.contains('unclicked')){                   
                    recursiveMineSweep(slots[rightPosition])
                }
            } 
        } 
        if(upPosition >= 0 && upPosition <= 99){
            if(slots[upPosition].classList.contains('level0') && slots[upPosition].classList.contains('unclicked')){
                recursiveMineSweep(slots[upPosition])
            }
        }
        if(downPosition >= 0 && downPosition <= 99){
            if(slots[downPosition].classList.contains('level0') && slots[downPosition].classList.contains('unclicked')){
                recursiveMineSweep(slots[downPosition])
            }
        }
    }
    
}


function minePosition(){
    const minePositionArray = []
    
    while(true) {
        const randomPos = Math.floor(Math.random() * 99)

        if(!minePositionArray.includes(randomPos)){
            minePositionArray.push(randomPos)
        }
        if(minePositionArray.length === 10){
            break;
        }
    }
    
    minePositionArray.forEach((minePositionArray) => {
        const minePosition = document.getElementById(`${minePositionArray}`)
        minePosition.classList.add('mine')
    })
}


function minesNearbyCheck(){
    slots.forEach((slot) => {
        if(slot.classList.contains('mine')){
            return;       
        }
        let minesFound = 0;

        let leftPosition = slot.id -1;

        let rightPosition = slot.id - (-1);
        
        let upPosition = slot.id -10;

        let upRightPosition = slot.id -9;

        let upLeftPosition = slot.id -11;

        let downPosition = slot.id -(-10);

        let downLeftPosition = slot.id -(-9);

        let downRightPosition = slot.id -(-11);

        

        if(leftPosition >= 0 && leftPosition <= 99){
            if(slot.id % 10 !== 0){
                if(slots[leftPosition]?.classList.contains('mine')) {
                    minesFound ++;
                }
            }
        }
        if(rightPosition >= 0 && rightPosition <= 99){
            if(slot.id % 10 !== 9){
                if(slots[rightPosition]?.classList.contains('mine')) {
                    minesFound ++;
                }
            }
        }
        if(upPosition >= 0 && upPosition <= 99){
            if(slots[upPosition]?.classList.contains('mine')) {
                minesFound ++;
            }
        }

        if(upRightPosition >= 0 && upRightPosition <= 99){          
            if(slot.id % 10 !== 9){
                if(slots[upRightPosition]?.classList.contains('mine')) {
                    minesFound ++;
                }
            }
        }
        if(upLeftPosition >= 0 && upLeftPosition <= 99){
            if(slot.id % 10 !== 0){
                if(slots[upLeftPosition]?.classList.contains('mine')) {
                    minesFound ++;
                }
            }
        }
        if(downPosition >= 0 && downPosition <= 99){
            if(slots[downPosition]?.classList.contains('mine')) {
                minesFound ++;
            }
        }
        if(downLeftPosition >= 0 && downLeftPosition <= 99){
            if(slot.id % 10 !== 0){
                if(slots[downLeftPosition]?.classList.contains('mine')) {
                    minesFound ++;
                }
            }
        }
        if(downRightPosition >= 0 && downRightPosition <= 99){
            if(slot.id % 10 !== 9){
                if(slots[downRightPosition]?.classList.contains('mine')) {
                    minesFound ++;
                }
            }
        }
        
        slot.classList.add("level"+ `${minesFound}`) 
    })
} 


function gameTimer(){
    timerInterval = setInterval(() => {
		if(count >= 0){
			count ++;
            gameTime.textContent = `${count}`
		}
	}, 1000) 
}


function winCondition(){
    clearInterval(timerInterval)
    retryGame.classList.remove('hide')
    victoryMessage.textContent = "Congratulation, You Won in " + `${count}` + " seconds"
    gameTime.classList.add('hide')
    flagCounter.classList.add('hide')
    slots.forEach(slot => {
        slot.classList.remove('flag')   
    })
}

function resetGame(){
    slots.forEach(slot => {
        slot.classList.add('unclicked')
        slot.classList.remove('flag')   
        slot.classList.remove('mine')      
        slot.classList.remove('level0')
        slot.classList.remove('level1') 
        slot.classList.remove('level2')
        slot.classList.remove('level3') 
        slot.classList.remove('level4')
        slot.innerHTML = ""  
    })
    retryGame.classList.add('hide')
    mainGame.classList.add('hide')
    playGame.classList.remove('hide')
    retryMessage.textContent = ""
    victoryMessage.textContent = ""
    gameTime.classList.remove('hide')
    flagCounter.classList.remove('hide')
    instructionImage.classList.remove('hide')
    count = 0;
    flag = 10;
    cleared = 0

    gameTime.textContent = `${count}`
    flagCounter.textContent = `${flag}`



}

playGame.addEventListener('click', play)
retryGame.addEventListener('click', resetGame)

slots.forEach(slot => {
    slot.addEventListener('click', slotClicked)
       
})

window.oncontextmenu = (e) => {
    e.preventDefault()
    
    const rightClickedSlotPositon = e.target
    if(rightClickedSlotPositon.classList.contains('unclicked') && !rightClickedSlotPositon.classList.contains('flag')){
        e.target.classList.add("flag")
        flag --;
    } else if(rightClickedSlotPositon.classList.contains('unclicked') && rightClickedSlotPositon.classList.contains('flag')){
        e.target.classList.remove("flag")
        flag ++;
    } else if(!rightClickedSlotPositon.classList.contains('unclicked') && rightClickedSlotPositon.classList.contains('flag')){
        e.target.classList.remove("flag")
        flag ++;
    }
    flagCounter.textContent = `${flag}`
}


