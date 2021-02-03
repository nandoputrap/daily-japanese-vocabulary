const boxes = document.querySelectorAll('.box');
const answer = document.querySelectorAll('.box-answer');

for(let i = 0; i<boxes.length; i++){
    boxes[i].addEventListener("mouseover", () =>{
        answer[i].classList.add('show');
    })
    boxes[i].addEventListener("mouseleave", () =>{
        answer[i].classList.remove('show');
    })
}

const pg = document.querySelectorAll('.pg');

for(let i = 0; i<pg.length; i++){
    pg[i].addEventListener("click", () =>{
        if(pg[i].classList.contains('correct')){
            pg[i].classList.toggle('pg-clicked-true');
        }else{
            pg[i].classList.toggle('pg-clicked');
        }
    })
}
