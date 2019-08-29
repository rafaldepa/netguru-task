// Highlight current active article part
const toggleArticle = () => {
    let anchors = document.querySelectorAll('.article-navigation__item a');
    for(let item of anchors) {
        item.addEventListener('click', () => {
            [].forEach.call(anchors, (el) => {
                el.classList.remove("current");
            });
            item.classList.add('current');
        });
    }   
}

// Smooth Scrolling to Element
const initSmoothScroll = (offset = 30) => {
    let anchors = document.querySelectorAll('a[href^="#"]');

    for (let item of anchors) {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            let hash = item.getAttribute('href');
            let target = document.querySelector(hash);
            console.log(target.offsetTop)
            window.scrollTo(0, target.offsetTop - offset);
            history.pushState(null, null, null);
        })
    }
    return;
}


const initEventHandlers = () => {
    toggleArticle();
}

initSmoothScroll();
initEventHandlers();