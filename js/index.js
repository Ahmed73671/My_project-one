// check if there's local storage option
let minColor = window.localStorage.getItem("ption-color")
if (minColor !== null) {
    document.documentElement.style.setProperty("--main-color",minColor)
    // loop on li, remove class active
    document.querySelectorAll(".list-color li").forEach(function (element) {
        element.classList.remove("active")
        if (element.dataset.color === minColor ) {
            element.classList.add("active")
        }
    })
}

//toggle spin class on icon
// toggle class fa spin for  Rotation on self
document.querySelector(".toggle-setting .setting-icon").onclick = function () {
    this.classList.toggle("fa-spin")

    // toggle class open on Main settings box
    document.querySelector(".setting-box").classList.toggle("open")

} 

// Switch cloros
let listColor = document.querySelectorAll(".list-color li")
// Loop On List Items
listColor.forEach( function (li) {
    
    // Click On Every List Items
    li.onclick = function (e) {
        
        let valueColor = e.target.dataset.color;
        // Set color on Root
        document.documentElement.style.setProperty("--main-color",valueColor)
        //Set color on local storage
        window.localStorage.setItem("ption-color",valueColor)
        // remove class active
        handelActive(e)
    }
})

// check if there's local storage option random background 
// Rondom Background option 
let  backgroundOption = true;
// varible  ot control the interval
let itervalBackground;
let backgroundLocal = localStorage.getItem("background_option")
if (backgroundLocal !== null) {
    if (backgroundLocal === 'true') {
        backgroundOption = true;
        rondomBackground()
    } else {
        backgroundOption = false;
    }
    document.querySelectorAll(".setting-box .Random-background span").forEach(ele => {
        ele.classList.remove("active")
        
        if (backgroundLocal === 'true') {
            document.querySelector(".Random-background .yes").classList.add("active")
        } else {
            document.querySelector(".Random-background .no").classList.add("active")
        }
    })
}

// Switch Random Background
let randomBack = document.querySelectorAll(".setting-box .Random-background span")
randomBack.forEach( function (ran) {
    ran.onclick = function (e) {
        handelActive(e)
        if (e.target.dataset.background === "yes") {
            backgroundOption = true
            rondomBackground()
            localStorage.setItem("background_option",true)
        } else {
            clearInterval(itervalBackground)
            backgroundOption = false
            localStorage.setItem("background_option",false)
        }
    }
})

// start swech show bullets
let spanbullet = document.querySelectorAll(".option-box .Show-bullets span")
let showbullet = document.querySelector(".nav-bullets")
spanbullet.forEach((span) => {
    span.addEventListener("click", (e) => {
        handelActive(e)
        if (e.target.dataset.bullet === "yes") {
            showbullet.style.display = "block"
            localStorage.setItem("option-box","yes")
        } else {
            showbullet.style.display = "none"
            localStorage.setItem("option-box","no")
        }
    })
})


let checkbullet = localStorage.getItem("option-box")
if (checkbullet !== null) {
    spanbullet.forEach((span) => {
        span.classList.remove("active")
    })
    if (checkbullet === "yes") {
        showbullet.style.display = "block"
        document.querySelector(".option-box .Show-bullets span.yes").classList.add("active")
    } else {
        showbullet.style.display = "none"
        document.querySelector(".option-box .Show-bullets span.no").classList.add("active")
    }
}
// end swech show bullets

//start landing-page
let landing = document.querySelector(".landing-page")
let arryImge = ["imge1.jpg","imge2.jpg","imge3.webp","imge4.jpg","imge5.jpg"]

// function to randomize imge
function rondomBackground() {
    if (backgroundOption = true) {
        itervalBackground = setInterval( () => {
            let random = Math.floor(Math.random() * arryImge.length) 
            landing.style.backgroundImage =`url(imge/${arryImge[random]})`
        },10000)
    }
}
//end landing-page

// select skills 
let uorSkills = document.querySelector(".skills")
window.onscroll = function () {
    let skillsOffsetiop = uorSkills.offsetTop;
    let skillsoffheight = uorSkills.offsetHeight;
    let widowheight = this.innerHeight
    if (scrollY >= (skillsOffsetiop + skillsoffheight - widowheight)) {
        let animaetionspan = document.querySelectorAll(".skills-box .skill-progress span")
        animaetionspan.forEach(function(span) {
            span.style.width = span.dataset.progress;
        })
    }
}

// selct gallery image 

let galleryimages = document.querySelectorAll(".gallery img")
galleryimages.forEach( function (mg) {
    mg.addEventListener("click", function (e) {
// creat overlay 
        let overlay = document.createElement("div")
        overlay.className = "overlay-box"
        document.body.appendChild(overlay)
// creat popup box 
        let popupbox = document.createElement("div")
        popupbox.className = "popup-box"
        let popupimge = document.createElement("img")
        popupimge.src = e.target.src
        popupbox.appendChild(popupimge)
        document.body.appendChild(popupbox)
// add alt
        if (e.target.alt !== null) {
            let hedaingele = document.createElement("h3")
            let hedaingtext = document.createTextNode(e.target.alt)
            hedaingele.appendChild(hedaingtext)
            popupbox.prepend(hedaingele)
        }
        let spanclose = document.createElement("span")
        spanclose.className = "button-close"
        let spanclosetext = document.createTextNode("X")
        spanclose.appendChild(spanclosetext)
        popupbox.appendChild(spanclose)
    })
})

document.addEventListener("click", (e) =>{
    if (e.target.className == "button-close") {
        e.target.parentNode.remove()
        document.querySelector(".overlay-box").remove()
    }
})

//  start scrol bullets
let linkScroll = document.querySelectorAll(".link li a")
let bullets = document.querySelectorAll(".nav-bullets .bullet")
function scroling(ele) {
    ele.forEach(function (e) {
        e.addEventListener("click", function (element) {
            element.preventDefault()
            document.querySelector(element.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            })
        })
    })
}
scroling(linkScroll)
scroling(bullets)

function handelActive(ve) {
            ve.target.parentElement.querySelectorAll(".active").forEach(element => {
                element.classList.remove("active")
            })
            ve.target.classList.add("active")
        }

// start reset 
let reset = document.querySelector(".reset input")
reset.addEventListener("click", (e) => {
    if (e.target) {
        localStorage.clear()
        window.location.reload()
    }
})
// end reset 
// start menu 
let menu = document.querySelector(".header .container-link button")

menu.addEventListener("click", (e) => {
    e.stopPropagation()
    document.querySelector(".container-link ul").classList.toggle("toggol-menu")
})

let buttonmenu = document.querySelector(".header .container-link button")
let ulLinks = document.querySelector(".container-link ul")

ulLinks.onclick = function (e) {
    e.stopPropagation()
}
document.querySelectorAll(".container-link .toggol-menu li").onclick = function (e) {
    e.stopPropagation()
}
document.onclick = function (e) {
    if (e.target !== buttonmenu && e.target !== ulLinks  ) {
        if (ulLinks.classList.contains("toggol-menu")) {
            ulLinks.classList.toggle("toggol-menu")
        }
    }
}
//end menu

