document.addEventListener("DOMContentLoaded", () => {
    const codeContent = document.querySelector(".code-content");

    if (!codeContent) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Keep the original syntax colors and HTML formatting.
    if (reducedMotion) return;

    // Collect the existing text nodes without removing their colored spans.
    const walker = document.createTreeWalker(
        codeContent,
        NodeFilter.SHOW_TEXT
    );

    const textNodes = [];
    let currentNode;

    while ((currentNode = walker.nextNode())) {
        if (currentNode.textContent.length > 0) {
            textNodes.push({
                node: currentNode,
                text: currentNode.textContent
            });
        }
    }

    // Hide the text, but preserve every HTML element and syntax color.
    textNodes.forEach(({ node }) => {
        node.textContent = "";
    });

    // Create the blinking typing cursor.
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";

    let nodeIndex = 0;
    let charIndex = 0;

    function typeNextCharacter() {
        if (nodeIndex >= textNodes.length) {
            cursor.remove();
            return;
        }

        const current = textNodes[nodeIndex];

        // Keep the cursor beside the text currently being typed.
        current.node.parentNode.insertBefore(
            cursor,
            current.node.nextSibling
        );

        if (charIndex < current.text.length) {
            current.node.textContent += current.text.charAt(charIndex);
            charIndex++;

            setTimeout(typeNextCharacter, 35);
        } else {
            nodeIndex++;
            charIndex = 0;

            setTimeout(typeNextCharacter, 30);
        }
    }

    // Begin typing shortly after the page loads.
    setTimeout(typeNextCharacter, 600);
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) {
        console.error("Mobile navigation elements were not found.");
        return;
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(
        "#home, #about, #skills, #projects, #contact"
    );

    const navLinks = document.querySelectorAll(
        ".navbar .nav-links a"
    );

    if (!sections.length || !navLinks.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;

                    navLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === `#${sectionId}`;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => observer.observe(section));
});
