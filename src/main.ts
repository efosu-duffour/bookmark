import './style.css'
import gsap from 'gsap';
import Lenis from 'lenis';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import closeIcon from "/images/icon-close.svg";
import openIcon from "/images/icon-hamburger.svg";


document.addEventListener("DOMContentLoaded", () => {
    // Initialize a new Lenis instance for smooth scrolling
    const lenis = new Lenis();
    
    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);
    
    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });
    
    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);

    const menuButton = document.querySelector("[menu-button]") as HTMLButtonElement;
    const mobileNav = document.querySelector("[mobile-nav]") as HTMLElement;

    menuButton.addEventListener("click", () => {

        mobileNav.classList.toggle("active");

        if (mobileNav.classList.contains("active")) {
            // Change the icon to close-icon
            menuButton.querySelector("img")!.src = closeIcon;

            // Stop scrolling
            lenis.stop();

            // display the menu
            menuSlideIn();

        }else {
            // Change the icon to open-icon
            menuButton.querySelector("img")!.src = openIcon;

            // Start scrolling
            lenis.start();

            // remove the menu
            menuSlideOut();
        }
    })

    let previousScrollY = 0;
    window.addEventListener("scroll", () => {
        const body = document.body;

        if (window.scrollY === 0) {
            if (body.classList.contains("page-up")) {
                body.classList.remove("page-up");
            }

            return;
        }

        if (previousScrollY > window.scrollY) {
            if(!body.classList.contains("page-up")) {
                body.classList.add("page-up");
            }

            if (body.classList.contains("page-down")) {
                document.body.classList.remove("page-down");
            }
        }else{
            if (!body.classList.contains("page-down")) {
                body.classList.add("page-down");
            }

            if (body.classList.contains("page-up")) {
                document.body.classList.remove("page-up");
            }
        }

        previousScrollY = window.scrollY
    })

    window.addEventListener("resize", () => {
        if (Math.floor(window.innerWidth) >= 870) {
            mobileNav.classList.remove("active")

            menuButton.querySelector("img")!.src = openIcon;

            lenis.start();

            menuSlideOut();
        }
    })

    function menuSlideIn() {
        gsap.to("[mobile-nav] ul", {
            right: 0,
            ease: "power2.out",
            onStart: () => {
                mobileNav.style.visibility = "visible";
            }
        })
    }

    function menuSlideOut() {
        gsap.to("[mobile-nav] ul", {
            right: "-100%",
            ease: "power2.in",
            onComplete: () => {
                mobileNav.style.visibility = "hidden";
            }
        })
    }

})


