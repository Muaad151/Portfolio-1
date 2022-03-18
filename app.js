gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(MotionPathPlugin)
let triangle = document.querySelector('.triangle')
let bodyScrollBar

function smoothScroll() {
    // let Scrollbar = window.Scrollbar
    // console.log(Scrollbar)
    bodyScrollBar = Scrollbar.init(document.querySelector('.viewPort'), {
        damping: 0.05,
    })
    const viewport = document.querySelector('.viewPort')
    bodyScrollBar.track.xAxis.element.remove()
        // console.log(document.querySelector('.viewPort'))
        // Tell ScrollTrigger to use these proxy getter/setter methods for the "body" element:
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            if (arguments.length) {
                bodyScrollBar.scrollTop = value // setter
            }
            return bodyScrollBar.scrollTop // getter
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            }
        },
    })

    // when the smooth scroller updates, tell ScrollTrigger to update() too:
    bodyScrollBar.addListener(ScrollTrigger.update)
}
smoothScroll()

let t1 = gsap.timeline()

t1.fromTo(
    '.dot', {
        AutoAlpha: 0,
        opacity: 0,
        duration: 0.5,
        // y: -10,
        scaleX: 0,
        scaleY: 0,
        ease: 'back',
        delay: 0.5,
    }, {
        duration: 0.5,
        autoAlpha: 1,
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        ease: 'back',
        onComplete: () => {
            triangle.classList.add('rotate_around_circle')
        },
        delay: 0.5,
    },
)

gsap.to('.triangle', {
    delay: 1,
    duration: 0.5,
    zIndex: 2,
    opacity: 1,
    ease: 'power4',
})
gsap.registerEffect({
    name: 'popout',
    effect: (target, config) => {
        return gsap.fromTo(
            target, {
                AutoAlpha: 0,
                opacity: 0,
                duration: 0.5,
                delay: config.delay,
                // y: -10,
                scaleX: 0,
                scaleY: 0,
                ease: 'back',
            }, {
                delay: config.delay,
                duration: 0.5,
                autoAlpha: 1,
                opacity: 1,
                scaleX: config.scaleX,
                scaleY: config.scaleY,
                ease: 'back',
            },
        )
    },
    defaults: { duration: 0.5, scaleX: 1, scaleY: 1 },
})

gsap.effects.popout('.decor-circle', { delay: 0.1 })
gsap.effects.popout('.decor-circle1', { delay: 0.2 })
gsap.effects.popout('.decor-circle2', { delay: 0.3 })
gsap.effects.popout('.decor-circle3', { delay: 0.2 })
gsap.effects.popout('.decor-circle4', { delay: 0.5 })
gsap.effects.popout('.decor-circle5', { delay: 0.6 })
gsap.effects.popout('.dot1', { delay: 0 })

gsap.set('.triangle', {
    xPercent: -50,
    yPercent: -50,
    transformOrigin: '50% 50%',
})

// gsap.to('.triangle', {
//     duration: 1,
//     motionPath: {
//         path: '.circle_path',
//         autoRotate: true,
//         align: 'self',
//     },
// })

// gsap.from('showreel-img', {
//     x: 500,
//     autoAlpha: 0,
//     scrollTrigger: {
//         target: '.showreel-img',
//         start: 'top 30%',
//     },
// })

//-----------------------------nav links-----------------

const mainNavLinks = gsap.utils.toArray('.nav-link')
const mainNavLinks_reverse = gsap.utils.toArray('.nav-link').reverse()
mainNavLinks.forEach((link) => {
    link.addEventListener('mouseleave', (e) => {
        link.classList.add('animate-out')
        setTimeout(() => {
            link.classList.remove('animate-out')
        }, 300)
    })
})

// gsap.to(navLinks, {
//     duration: 0.3,
//     stagger: 0.05,
//     autoAlpha: 0,
//     y: 10,
//     ease: 'Power4.out',
// })
// console.log(navLinks)
// console.log(navLinks_reverse)

function navAnimation(direction) {
    const scrollingDown = direction === 1
    const links = scrollingDown ? mainNavLinks : mainNavLinks_reverse
    return gsap.to(links, {
        duration: 0.3,
        stagger: 0.05,
        autoAlpha: () => (scrollingDown ? 0 : 1),
        y: () => (scrollingDown ? 20 : 0),
        ease: 'power4.out',
    })
}

// updated trigger to #main instead of absolute 100
ScrollTrigger.create({
        trigger: '#main',
        start: 'top top-=100',
        end: 'bottom bottom-=200',
        toggleClass: {
            targets: 'body',
            className: 'scrolled',
        },
        onEnter: ({ direction }) => {
            navAnimation(direction)
            document.body.classList.add('scrolled')
        },
        onLeaveBack: ({ direction }) => {
            navAnimation(direction)
            document.body.classList.remove('scrolled')
        },
    })
    //----------------------------------------curser-------------------------------------------

// let curser = document.querySelector('.curser')
// const cursor = document.querySelector('.cursor')
// document.addEventListener('mousemove', (e) => {
//     cursor.setAttribute(
//             'style',
//             'top: ' + (e.pageY - 10) + 'px; left: ' + (e.pageX - 10) + 'px;',
//         )
//         // cursor.style.backdropFilter = 'none'
// })

// document.addEventListener('click', (e) => {
//     cursor.classList.add('expand')
//     setTimeout(() => cursor.classList.remove('expand'), 200)
//     cursor.style.backdropFilter = 'none'
// })

// console.log(cursor.style.backdrop-filter)

//---------------------------------side_bar---------------

let hamberger_menu = document.querySelector('.hambergur-button')
let aside = document.querySelector('aside')
hamberger_menu.addEventListener('click', () => {
    if (aside.style.transform != 'translateX(0%)') {
        aside.style.visibility = 'visible'
        aside.style.zIndex = 50
        aside.style.transform = 'translateX(0%)'
        hamberger_menu.innerHTML = `<i class="fa-solid fa-xmark" style="color:white; font-size:1.5rem;"></i>`
            // hamberger_menu.childNodes.classList.add('.hamberger-menu .cross')
    } else {
        aside.style.transform = 'translateX(50vw)'
        hamberger_menu.innerHTML = ` <span class="bar1"></span>
                <span class="bar2"></span>
                <span class="bar3"></span> `
            // hamberger_menu.childNodes.classList.remove('.hamberger-menu .cross')
    }
})

//---------------------------------pararllax--------------------------------

function mousemove() {
    console.log('hi')
    document.querySelector('.render').addEventListener('mousemove', parallax)
}
mousemove()

function parallax(e) {
    const { offsetX, offsetY } = e
    const { clientWidth, clientHeight } = e.target

    // console.log(clientWidth, clientHeight, offsetX, offsetY)

    const xCord = offsetX / clientWidth - 0.5
    const yCord = offsetY / clientHeight - 0.5

    // console.log(xCord, yCord)

    let offset = (index) => index * 1.2 + 0.5

    const imgs_l = gsap.utils.toArray('.hg__left .hg__image')
    const imgs_r = gsap.utils.toArray('.hg__right .hg__image')

    imgs_l.forEach((img, index) => {
        gsap.to(img, {
            duration: 1.2,
            x: xCord * 20 + offset(index),
            y: yCord * 30 + offset(index),
            rotationX: xCord * 10,
            rotationY: yCord * 40,
            ease: 'Power4.out',
        })
    })

    imgs_r.forEach((img, index) => {
        gsap.to(img, {
            duration: 1.2,
            x: xCord * 20 + offset(index),
            y: -yCord * 30 + offset(index),
            rotationX: xCord * 10,
            rotationY: yCord * 40,
            ease: 'Power4.out',
        })
    })
}

//-----------------------reveal gallary--------------------

function hoverReveal(e) {
    // console.log(e.target)
    const {
        img,
        mask,
        explanation,
        explanationMask,
        explanationP,
        text,
        imgsrc,
    } = e.target

    const t1 = gsap.timeline({
        defaults: {
            duration: 0.5,
            ease: 'power4',
        },
    })

    if (e.type === 'mouseenter')
        t1.to(mask, { yPercent: 0 })
        .to(img, { yPercent: 0 }, 0)
        .to(text, { yPercent: -explanation.clientHeight / 2 }, 0)
        .to(explanationMask, { yPercent: 0 }, 0)
        .to(explanationP, { yPercent: 0 }, 0)
        .to(imgsrc, { duration: 1.2, scale: 1.2 }, 0)
    else {
        t1.to(mask, { yPercent: 100 })
            .to(img, { yPercent: -100 }, 0)
            .to(text, { yPercent: 0 }, 0)
            .to(explanationP, { yPercent: 100 }, 0)
            .to(explanationMask, { yPercent: -100 }, 0)
            .to(imgsrc, { duration: 1.2, scale: 1 }, 0)
    }

    return t1
}

function reveal() {
    const strips = document.querySelectorAll('.strip')
    strips.forEach((strip) => {
        strip.img = strip.querySelector('.image')
        strip.imgsrc = strip.querySelector('.image img')
        strip.mask = strip.querySelector('.mask')
        strip.text = strip.querySelector('.text')
        strip.explanation = strip.querySelector('.explanation')
        strip.explanationMask = strip.querySelector('.explanation-mask')
        strip.explanationP = strip.querySelector('.explanation-mask p')

        gsap.set(strip.img, { yPercent: -101 })
        gsap.set(strip.mask, { yPercent: 100 })
        gsap.set(strip.explanationP, { yPercent: 100 })
        gsap.set(strip.explanationMask, { yPercent: -100 })

        strip.addEventListener('mouseenter', hoverReveal)
        strip.addEventListener('mouseleave', hoverReveal)
    })
}

const plot = document.querySelectorAll('.plot')
const progressBarPercentage = document.querySelectorAll(
    '.box-progress-percentage',
)
const progressBarOrange = document.querySelectorAll('.box-progress-bar span')

function progress() {
    gsap.set(progressBarOrange, { scaleX: 0 })
        // gsap.set('.plot', { opacity: 0 })

    gsap.to(progressBarOrange, {
        duration: 0.6,
        scaleX: 1,
        ease: 'power4.out',
    })
}

function progressBarReveal() {
    let tl = gsap.timeline()

    tl.from('.left', {
        x: -60,
        // delay: 0.1,
        stagger: 1,
        autoAlpha: 0,
        duration: 1.2,
        scrollTrigger: {
            trigger: '.software-skils',
            start: 'top-=600 top',
            end: 'bottom-=250 bottom',
            // markers: true,
            onEnter: () => {
                progress()
            },
            scrub: 1,
        },
        ease: 'power1.out',
    })
    tl.from('.right', {
        x: 60,
        // delay: 0.1,
        stagger: 1,
        autoAlpha: 0,
        duration: 1.2,
        scrollTrigger: {
            trigger: '.software-skils',
            start: 'top-=600 top',
            end: 'bottom-=250 bottom',
            // markers: true,
            onEnter: () => {
                progress()
            },
            scrub: 1,
        },
        ease: 'power1.out',
    })
}

function showcaseReveal() {
    const projects = gsap.utils.toArray('.showcase')

    gsap.from('.showcase-0', {
        x: 100,
        ease: 'power4.out',
        autoAlpha: 0,
        stagger: 0.5,
        duration: 1,
        scrollTrigger: {
            id: 'my 0',
            trigger: '.showcase-0',
            start: 'top 50%',
            // end: 'bottom bottom',
        },
        scrub: 1,
    })
    gsap.from('.showcase-1', {
        x: -100,
        ease: 'power4.out',
        autoAlpha: 0,
        stagger: 0.5,
        duration: 1,
        scrollTrigger: {
            id: 'my -1',
            trigger: '.showcase-1',
            start: 'top 50%',
        },
        scrub: 1,
    })
    gsap.from('.showcase-2', {
        x: 100,
        ease: 'power4.out',
        autoAlpha: 0,
        stagger: 0.5,
        duration: 1,
        scrollTrigger: {
            trigger: '.showcase-2',
            start: 'top 50%',
        },
        scrub: 1,
    })
}

const links = document.querySelectorAll('.categories a')
const fields = document.querySelector('.fields')
const frameL = document.querySelector('.frame-l')
const frameS = document.querySelector('.frame-s')
const imgS = document.querySelector('.imageS')
const imgL = document.querySelector('.imageL')

function categoryReveal(e) {
    if (e.type == 'mouseenter') {
        const sibling = Array.from(links).filter((item) => item != e.target)
        const { color, imagel, images } = e.target.dataset
        const tl = gsap.timeline()

        const current = e.target

        tl.set(imgL, { backgroundImage: `url(${imagel})` })
            .set(imgS, { backgroundImage: `url(${images})` })
            .to(
                [frameL, frameS], {
                    duration: 0.5,
                    autoAlpha: 1,
                },
                0,
            )
            .to(sibling, { color: '#1e2022', opacity: 0.2, autoAlpha: 0.2 }, 0)
            .to(current, { color: 'white', opacity: 1, autoAlpha: 1 }, 0)
            .to(fields, { backgroundColor: color, ease: 'none' }, 0)
    } else if (e.type == 'mouseleave') {
        const tl = gsap.timeline()
        tl.to([frameL, frameS], { autoAlpha: 0 }, 0).to(
            links, {
                color: '#1e2022',
                autoAlpha: 0.2,
            },
            0,
        )
    }
}

function categoryMove(e) {
    const { clientY } = e
    // console.log(clientY)
    gsap.to(frameL, {
        duration: 1,
        y: -(document.querySelector('.categories').clientHeight - clientY) / 3,
    })
    gsap.to(frameS, {
        delay: 0.1,
        duration: 1,
        y: -(document.querySelector('.categories').clientHeight - clientY) / 2,
    })
}

function fieldsReveal() {
    links.forEach((link) => {
        link.addEventListener('mouseenter', categoryReveal)
        link.addEventListener('mouseleave', categoryReveal)
        link.addEventListener('mousemove', categoryMove)
    })
}

function parrallaxReveal() {
    const images = gsap.utils.toArray('.parallax')
    images.forEach((div) => {
        const img = div.querySelector('.info__image img')
            // console.log(img)
        gsap.to(img, {
            yPercent: 20,
            scrollTrigger: {
                // markers: true,
                trigger: img,
                scrub: true,
            },
            ease: 'none',
        })
    })
}

function pinning() {
    const links = document.querySelectorAll('.fixed-nav ul')
        // console.log(links)
    ScrollTrigger.create({
        trigger: links,
        pin: true,
        pinSpacing: false,
        start: 'top center',
        markers: true,
        endTrigger: '.contact',
        end: 'bottom bottom+=900',
        pinReparent: true,
    })
    const infos = gsap.utils.toArray('.info')
        // console.log(infos)
    infos.forEach((ele, index) => {
        const links = document.querySelectorAll('.fixed-nav li')
            // console.log(links)
        ScrollTrigger.create({
            trigger: ele,
            start: 'top center',
            end: `+=${ele.clientHeight}`,
            // markers: true,
            toggleClass: {
                targets: links[index],
                className: 'is-active',
            },
            onEnter: () => {
                // console.log(links)
                let color = links[index].querySelector('a').dataset.color
                document.documentElement.style.setProperty('--background-color', color)
            },
            onLeaveBack: () => {
                let color = links[index].querySelector('a').dataset.color
                document.documentElement.style.setProperty('--background-color', color)
            },
        })
    })
}

function scrollto() {
    const links = gsap.utils.toArray('.fixed-nav li a')
    links.forEach((li) => {
        const target = li.getAttribute('href')
        li.addEventListener('click', (e) => {
            e.preventDefault()
            bodyScrollBar.scrollIntoView(document.querySelector(target), {
                damping: 0.07,
                offsetTop: 100,
            })
        })
    })
}

// let container = document.querySelector('.scroll-container')
// let height = document.querySelector('.scroll-container').clientHeight

// function setHeight() {
//     document.body.style.height = container.clientHeight + 'px'
//     height = container.clientHeight
// }

// ScrollTrigger.addEventListener('refreshInit', setHeight)

// gsap.to(container, {
//     y: () => {
//         height - document.documentElement.clientHeight
//     },
//     ease: 'none',
//     scrollTrigger: {
//         trigger: document.body,
//         start: 'top top',
//         end: 'bottom bottom',
//         markers: true,
//         scrub: 1,
//         invalidateOnRefresh: true,
//     },
// })

window.addEventListener('load', function() {
    reveal()
    progressBarReveal()
    showcaseReveal()
    fieldsReveal()
    parrallaxReveal()
    pinning()
    scrollto()
        // setHeight()
})