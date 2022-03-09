gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(MotionPathPlugin)
let triangle = document.querySelector('.triangle')

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
                scaleX: 1,
                scaleY: 1,
                ease: 'back',
            },
        )
    },
    defaults: { duration: 0.5 },
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
//         markers: true,
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
        onEnter: ({ direction }) => navAnimation(direction),
        onLeaveBack: ({ direction }) => navAnimation(direction),
        // markers: true
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

function render() {
    const imgs_l = gsap.utils.toArray('.l')
    const imgs_r = gsap.utils.toArray('.r')
    const circles = gsap.utils.toArray('.c')

    document.addEventListener('mousemove', (e) => {
        const { offsetX, offsetY } = e
        const { clientWidth, clientHeight } = e.target

        // console.log(clientWidth, clientHeight, offsetX, offsetY)
        const xCord = offsetX / clientWidth - 0.5
        const yCord = offsetY / clientHeight - 0.5

        // console.log(xCord, yCord)

        let offset = (index) => index * 5 + 0.5

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
    })
}
render()