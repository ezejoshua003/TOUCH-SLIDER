const slider = document.querySelector('.slider-container'),
slides = Array.from(document.querySelectorAll('.slide'))

let isDragging = false,
 startPos = 0,
 currentTranslate = 0,
 prevTranslate = 0,
 animationID,
 currentIndex = 0


slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('img')

    //disable default image drag
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())

//Touch events
slide.addEventListener('touchstart', touchStart(index) )
slide.addEventListener('touchend', touchEnd) 
slide.addEventListener('touchmove', touchMove) 

//Mouse events
slide.addEventListener('mousedown', touchStart(index))
slide.addEventListener('mouseup', touchEnd)
slide.addEventListener('mousemove', touchMove)
slide.addEventListener('mouseleave', touchEnd)

})
//Disable context menu
window.oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPprogation()
    return false
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function touchStart(index) {
    return function(event) {
        currentIndex = index
        startPos = getPositionX(event)
        isDragging = true
        animationID = requestAnimationFrame(Animation)
        slider.classList.add('grabbing')

    }
}

function touchMove(event) {
    if (isDragging) {
        const currentPostion = getPositionX(event)
        currentTranslate = prevTranslate + currentPostion - startPos
    }  
}

function touchEnd() {
    cancelAnimationFrame(animationID)
    isDragging = false
    const movedBy = currentTranslate - prevTranslate


    if(movedBy < -100 && currentIndex < slides.length -1) currentIndex += 1

    if(movedBy < 100 && currentIndex > 0) currentIndex -= 1

    setPositionByIndex()

    slider.classList.remove('grabbing')

}

function Animation() {
    setSliderPosition()
        if(isDragging) requestAnimationFrame(animation)
    
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate
    setSliderPosition()
    
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px) `   
}
