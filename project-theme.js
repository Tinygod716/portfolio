const wrapProjectTitleLetters = (root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) {
        if (walker.currentNode.textContent.trim()) textNodes.push(walker.currentNode);
    }

    textNodes.forEach((textNode) => {
        const fragment = document.createDocumentFragment();

        textNode.textContent.split(/(\s+)/).forEach((segment) => {
            if (!segment) return;

            if (/^\s+$/.test(segment)) {
                fragment.appendChild(document.createTextNode(segment));
                return;
            }

            const word = document.createElement("span");
            word.className = "project-word";
            word.setAttribute("aria-hidden", "true");

            [...segment].forEach((character) => {
                const letter = document.createElement("span");
                letter.className = "project-letter";
                letter.textContent = character;
                word.appendChild(letter);
            });

            fragment.appendChild(word);
        });

        textNode.replaceWith(fragment);
    });
};

document.querySelectorAll("header h1").forEach((title) => {
    title.setAttribute("aria-label", title.textContent.replace(/\s+/g, " ").trim());
    wrapProjectTitleLetters(title);
});
