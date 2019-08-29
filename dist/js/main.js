const initSmoothScroll=(offset=30)=>{let anchors=document.querySelectorAll('a[href^="#"]');for(let item of anchors)item.addEventListener("click",e=>{e.preventDefault();let hash=item.getAttribute("href"),target=document.querySelector(hash);window.scrollTo(0,target.offsetTop-offset),history.pushState(null,null,null)})},updateArticleSectionsPosition=()=>{const children=document.querySelector(".article").children;let anchorPoints=[];for(let el in children)children[el].id&&anchorPoints.push([children[el].id,children[el].offsetTop]);return anchorPoints},findActiveSectionHash=anchorList=>{const scrollY=window.scrollY;let lastItemHash;for(let el in anchorList)scrollY>=anchorList[el][1]-30&&(lastItemHash=anchorList[el][0]);return highlightArticleLink(lastItemHash)},highlightArticleLink=hash=>{let anchors=document.querySelectorAll(".article-navigation__item a");[].forEach.call(anchors,el=>{el.classList.remove("current")});for(let item of anchors)item.getAttribute("href")==`#${hash}`&&item.classList.add("current")},initEventListeners=()=>{let articleHooks=updateArticleSectionsPosition();window.addEventListener("resize",()=>{articleHooks=updateArticleSectionsPosition()}),window.addEventListener("scroll",()=>{findActiveSectionHash(articleHooks)});const mobileSelect=document.querySelector("#article-mobile-navigation");mobileSelect.addEventListener("change",()=>{let hash=mobileSelect.value,target=document.querySelector(hash);window.scrollTo(0,target.offsetTop-30),history.pushState(null,null,null)}),document.querySelector("#more-space").addEventListener("click",()=>{document.querySelector("body").classList.add("stretched"),document.querySelector(".more-space").remove()})};initSmoothScroll(),initEventListeners();