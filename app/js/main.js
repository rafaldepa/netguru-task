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

// Highlight current active article part
const toggleArticle = (hash) => {
    let anchors = document.querySelectorAll('.article-navigation__item a');
    [].forEach.call(anchors, (el) => {
        el.classList.remove("current");
    });
    for(let item of anchors) {       
        if(item.getAttribute('href') == `#${hash}`) {
            item.classList.add('current');
        }
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

// Find current section hash
const updateActiveSection = (anchorList) => {
    const scrollY = window.scrollY;
    let lastItemHash;
    for (let el in anchorList) {
        if(scrollY >= anchorList[el][1] - 30) {
            lastItemHash = anchorList[el][0];
        }
    }
    return toggleArticle(lastItemHash);
}


const initEventListeners = () => {
    // Active Article Section
    let articleHooks = updateArticleSectionsPosition();
    window.addEventListener('resize', () => {
        articleHooks = updateArticleSectionsPosition();        
    });
    window.addEventListener('scroll', () => {
        updateActiveSection(articleHooks)
    }); 
}

initSmoothScroll();
initEventListeners();