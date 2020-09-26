// -----------------------  variables  --------------------------- //
let prevBtn = document.getElementById('previous');
let nextBtn = document.getElementById('next');

let showWindow = document.querySelector('section.container');
let windowWidth = showWindow.getBoundingClientRect().width;
let thumbs = document.getElementById('thumbs');
let imgs = thumbs.children;

let imgWidth;
imgs[0].addEventListener('load', ()=> {
    imgWidth = imgs[0].getBoundingClientRect().width;
});
let imgsLength = imgs.length;
// -----------------------  sliding  --------------------------- //
let pos = 0;
let count = 0;
let prevPos = 0;

function moveLeft() {
    count++;
    prevPos = pos;
    pos -= imgWidth;
    if (count >= imgsLength) { 
        count = 0;
        pos = 0;
    }
    //console.log(pos) 
    thumbs.style.left = pos + 'px'; 
}

function moveRight() {
    count--;
    prevPos = pos;
    pos += imgWidth;
    if (count < 0) { 
        count = imgsLength-1;
        pos = -(imgWidth*(imgsLength-1));
    }
    //console.log(pos)
    thumbs.style.left = pos + 'px';
}

function slider() {
    if (count == imgsLength-1) moveLeft();
    else {    moveLeft();
        thumbs.animate([
        {//from
            left: prevPos + 'px'},
        {//to
            left: pos + 'px'}
    ], {
        direction: 'normal',
        easing: 'ease-out',
        duration: 3000
    })}
}

// -----------------------  autoslider  --------------------------- //

let autoslider = setInterval(slider, 3000);

// -----------------------  buttons functionality  --------------------------- //
// ------------ mouseevents --------------

prevBtn.addEventListener('click', () => {moveRight(); clearInterval(autoslider)});
nextBtn.addEventListener('click', () => {moveLeft(); clearInterval(autoslider)});

// ------------ keyboardevents --------------
document.addEventListener('keyup', (event) => {
    if (event.code == 'ArrowLeft') {moveRight(); clearInterval(autoslider)}
    else if (event.code == 'ArrowRight') {moveLeft(); clearInterval(autoslider)};
});

// -----------------------  image functionality  --------------------------- //
function scaleImg () {
    showWindow.style.width = '40vw';
    showWindow.className = 'highlighted'
    event.target.style.width = '40vw';
    clearInterval(autoslider);
}

thumbs.addEventListener('mouseover', scaleImg)

thumbs.addEventListener('mouseout', (event) => {
    removeEventListener('mouseover', scaleImg);
    showWindow.style.width = '30vw';
    showWindow.className = '';
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.width = '30vw';
    }
    autoslider = setInterval(slider, 3000);
})

