let boxes = document.querySelectorAll('.box')

let body = document.querySelector('body')
let icon = document.querySelector('#btn')

icon.addEventListener('click',() => {
    body.classList.toggle('light')
    if(body.classList.contains('light')){
        body.style.backgroundColor = 'black'
        body.style.color = 'white'
        icon.children[0].classList.replace('fa-moon','fa-sun')
        icon.style.color = 'yellow'
        for(let box of boxes)
            box.style.boxShadow = '5px 10px 20px rgba(255,255,255,0.2)'
    }
    else{
        body.style.backgroundColor = 'white'
        body.style.color = 'black'
        icon.children[0].classList.replace('fa-sun','fa-moon')
        icon.style.color = 'black'
        for(let box of boxes)
            box.style.boxShadow = '5px 10px 20px rgba(0, 0, 0, 0.4)'
    }
})

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
]

const checkWinner = () => {
    for(let pattern of winPatterns){
        let val1 = boxes[pattern[0]].innerText
        let val2 = boxes[pattern[1]].innerText
        let val3 = boxes[pattern[2]].innerText
        if(val1 && val2 && val3){
            if(val1 === val2 && val2 === val3){
                return val1
            }
        }
    }
}

let currentChoice = ''
let turns = document.querySelectorAll('.turn')
for (let turn of turns) {
    turn.addEventListener('click', () => {
        currentChoice = turn.getAttribute('id')
    })
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (!currentChoice) {
            alert('Please choose X or O first!');
            return
        }
        if (box.innerText !== '') 
            return
        // or box.disabled = true

        currentChoice === 'X' ?  box.style.color = 'green' : box.style.color = 'red'
        box.innerText = currentChoice;
        currentChoice = currentChoice === 'X' ? 'O' : 'X';

        if (checkWinner()){
            let resetBtn = document.querySelector('.reset-win')
            resetBtn.innerText = `Player ${checkWinner()} Wins!!`
            setTimeout(() => {
                location.reload()
            },3000)
            setTimeout(() => {
                alert('Game Restarts in 3 seconds')
            },1000)
        }
    })
})
