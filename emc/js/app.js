(() => {
    "use strict";
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (() => {
        console.log(`Ширина окна: ${window.innerWidth}px`);
        console.log(`Высота окна: ${window.innerHeight}px`);
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        document.querySelector(".home__buttonlink").addEventListener("click", (() => {
            const headerHeight = document.querySelector(".header").offsetHeight;
            const secondBlock = document.querySelector("#services");
            const offset = secondBlock.offsetTop - headerHeight;
            window.scrollTo({
                top: offset,
                behavior: "smooth"
            });
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const header = document.querySelector(".header");
        const block = document.querySelector(".home");
        function setBlockHeight() {
            const headerHeight = header.offsetHeight;
            block.style.height = `calc(100vh - ${headerHeight}px)`;
        }
        window.addEventListener("resize", setBlockHeight);
        setBlockHeight();
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const header = document.querySelector("header");
        const main = document.querySelector("main");
        if (!header || !main) {
            console.error("Header or Main not found!");
            return;
        }
        function adjustMainMargin() {
            setTimeout((() => {
                const headerHeight = header.offsetHeight;
                main.style.marginTop = `${headerHeight}px`;
                console.log("Header height:", headerHeight);
            }), 400);
        }
        window.addEventListener("resize", adjustMainMargin);
        adjustMainMargin();
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        document.querySelectorAll(".copymy").forEach((button => {
            button.addEventListener("click", (() => {
                const text = button.innerText.trim();
                console.log("Текст кнопки:", text);
                if (text) {
                    const tempInput = document.createElement("input");
                    tempInput.value = text;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    try {
                        document.execCommand("copy");
                        console.log("Текст скопирован:", text);
                    } catch (err) {
                        console.error("Ошибка копирования:", err);
                    }
                    document.body.removeChild(tempInput);
                } else console.warn("Кнопка пустая, нечего копировать.");
            }));
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const scrollToTopButton = document.querySelector(".scroll-to-top");
        const main = document.querySelector("main");
        const footer = document.querySelector("footer");
        const handleScroll = () => {
            main.getBoundingClientRect();
            const footerRect = footer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (window.scrollY > 150) scrollToTopButton.classList.add("visible"); else scrollToTopButton.classList.remove("visible");
            if (footerRect.top < windowHeight) {
                scrollToTopButton.style.position = "absolute";
                scrollToTopButton.style.bottom = "10px";
            } else {
                scrollToTopButton.style.position = "fixed";
                scrollToTopButton.style.bottom = "10px";
            }
        };
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
        scrollToTopButton.addEventListener("click", scrollToTop);
        window.addEventListener("scroll", handleScroll);
    }));
    window["FLS"] = true;
    menuInit();
})();