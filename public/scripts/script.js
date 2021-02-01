const boxes = document.querySelectorAll('.box');
const answer = document.querySelectorAll('.box-answer');

console.log(boxes);

for(let i = 0; i<boxes.length; i++){
    boxes[i].addEventListener("mouseover", () =>{
        answer[i].classList.add('show');
    })
    boxes[i].addEventListener("mouseleave", () =>{
        answer[i].classList.remove('show');
    })
}
