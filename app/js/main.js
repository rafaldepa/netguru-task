// Smooth Scrolling to Element
const initSmoothScroll = (offset = 30) => {
    let anchors = document.querySelectorAll('a[href^="#"]');
    for (let item of anchors) {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            let hash = item.getAttribute('href');
            let target = document.querySelector(hash);
            window.scrollTo(0, target.offsetTop - offset);
            history.pushState(null, null, null);
        })
    }
}

// Find article parts & offset from top 
const updateArticleSectionsPosition = () => {
    const article = document.querySelector('.article');
    const children = article.children;
    let anchorPoints = [];
    for (let el in children) {
        if(children[el].id) {
            anchorPoints.push([children[el].id, children[el].offsetTop]);
        }
    }
    return anchorPoints;
}

// Find the current article section hash
const findActiveSectionHash = (anchorList) => {
    const scrollY = window.scrollY;
    let lastItemHash;
    for (let el in anchorList) {
        if(scrollY >= anchorList[el][1] - 30) {
            lastItemHash = anchorList[el][0];
        }
    }
    return highlightArticleLink(lastItemHash);
}

// Highlight Link in Article Navigation
const highlightArticleLink = (hash) => {
    let anchors = document.querySelectorAll('.article-navigation__item a');
    for (let el of anchors) {
        el.classList.remove("current");
    }   
    for (let item of anchors) {       
        if(item.getAttribute('href') == `#${hash}`) {
            item.classList.add('current');
        }
    }   
}

const initEventListeners = () => {
    // Active article section
    let articleHooks = updateArticleSectionsPosition();
    window.addEventListener('resize', () => {
        articleHooks = updateArticleSectionsPosition();        
    });
    window.addEventListener('scroll', () => {
        findActiveSectionHash(articleHooks);
    }); 

    // ScrollTo section on Mobile
    const mobileSelect = document.querySelector('#article-mobile-navigation');
    mobileSelect.addEventListener('change', () => {
        let offset = 30;
        let hash = mobileSelect.value;
        let target = document.querySelector(hash);
        window.scrollTo(0, target.offsetTop - offset);
        history.pushState(null, null, null);
    });

    // Stretch the page
    const stretcher = document.querySelector("#more-space");
    stretcher.addEventListener('click', () => {
        document.querySelector('body').classList.add('stretched');
        document.querySelector('.more-space').remove();
    });
}

initSmoothScroll();
initEventListeners();