// ==UserScript==
// @name         GitHub Deepwiki Button
// @namespace   Violentmonkey Scripts
// @version     1.0
// @description  Adds a 'deepwiki' button to GitHub repo pages that opens the corresponding deepwiki page.
// @author       JAB
// @updateURL    https://github.com/JAB-dev/deepwiki-ext/raw/refs/heads/main/deepwiki.user.js
// @downloadURL  https://github.com/JAB-dev/deepwiki-ext/raw/refs/heads/main/deepwiki.user.js
// @match        https://github.com/*/*
// @exclude      https://github.com/marketplace*
// @exclude      https://github.com/settings*
// @exclude      https://github.com/notifications*
// @exclude      https://github.com/pulls*
// @exclude      https://github.com/issues*
// @exclude      https://github.com/codespaces*
// @exclude      https://github.com/topics*
// @exclude      https://github.com/trending*
// @exclude      https://github.com/sponsors*
// @exclude      https://github.com/new*
// @exclude      https://github.com/search*
// @exclude      https://github.com/orgs/*
// @exclude      https://github.com/users/*
// @grant        GM_openInTab
// @icon         https://github.githubassets.com/favicons/favicon.svg
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const BUTTON_ID = 'deepwiki-userscript-button';
    const MOBILE_BUTTON_ID = 'deepwiki-userscript-button-mobile';
    const TARGET_LIST_SELECTOR = 'ul.pagehead-actions';
    const MOBILE_CONTAINER_SELECTOR = 'div.d-block.d-md-none .d-flex.flex-row.gap-2';
    const DEEPWIKI_DOMAIN = 'deepwiki.com'; // <-- IMPORTANT: Change this if your target domain is different

    function createAndAddButton() {
        const actionsList = document.querySelector(TARGET_LIST_SELECTOR);

        // Exit if the list isn't found or if the button already exists (checking inside the list)
        if (!actionsList || actionsList.querySelector(`#${BUTTON_ID}`)) {
             // console.log('Deepwiki Button: Target list not found or button already exists.');
             return false;
        }

        // Check if we are on a page that looks like a main repo page
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        if (pathParts.length !== 2) {
             // console.log('Deepwiki Button: Not on a main repo page.');
             return false;
        }

        console.log("Deepwiki Button: Actions list found, adding button.");

        // Add custom CSS for button glow effect
        if (!document.getElementById('deepwiki-button-style')) {
            const style = document.createElement('style');
            style.id = 'deepwiki-button-style';
            style.textContent = `
                #${BUTTON_ID} {
                    background-color: #0366d6 !important;
                    color: white !important;
                    border-color: #0256b0 !important;
                    box-shadow: 0 0 5px rgba(3, 102, 214, 0.5);
                    transition: all 0.3s ease;
                }
                #${BUTTON_ID}:hover {
                    box-shadow: 0 0 8px rgba(3, 102, 214, 0.8);
                    transform: translateY(-1px);
                }
                #${MOBILE_BUTTON_ID} {
                    background-color: #0366d6 !important;
                    color: white !important;
                    border-color: #0256b0 !important;
                    box-shadow: 0 0 5px rgba(3, 102, 214, 0.5);
                    transition: all 0.3s ease;
                }
                #${MOBILE_BUTTON_ID}:hover {
                    box-shadow: 0 0 8px rgba(3, 102, 214, 0.8);
                    transform: translateY(-1px);
                }
            `;
            document.head.appendChild(style);
        }

        const button = document.createElement('button');
        button.id = BUTTON_ID; // Assign ID to the button itself for potential targeting
        button.textContent = 'Ask DeepWiki';
        button.title = 'Open tab with DeepWiki'; // Tooltip text

        // Apply general GitHub button styles. Removed margin class, as list spacing might handle it.
        // Add back 'mr-2' if needed after testing.
        button.classList.add('Button', 'Button--secondary', 'Button--small');
        button.type = 'button';

        button.addEventListener('click', (event) => {
            event.preventDefault();
            try {
                const currentUrl = window.location.href;
                // Construct the DeepWiki URL from the main repo URL parts
                const deepwikiUrl = `https://${DEEPWIKI_DOMAIN}/${pathParts[0]}/${pathParts[1]}`;

                console.log(`Deepwiki Button: Opening ${deepwikiUrl}`);
                GM_openInTab(deepwikiUrl, { active: true, insert: true });
            } catch (error) {
                console.error("Deepwiki Button Error:", error);
                alert("Failed to generate or open Deepwiki URL.");
            }
        });

        const listItem = document.createElement('li');

        listItem.appendChild(button);

        actionsList.prepend(listItem);

        // Create and add the mobile version too
        createAndAddMobileButton(pathParts);

        return true;
    }

    function createAndAddMobileButton(pathParts) {
        const mobileContainer = document.querySelector(MOBILE_CONTAINER_SELECTOR);

        // Exit if container not found or button already exists
        if (!mobileContainer || mobileContainer.querySelector(`#${MOBILE_BUTTON_ID}`)) {
            return false;
        }

        console.log("Deepwiki Button: Mobile container found, adding mobile button.");

        // Create button similar to GitHub's mobile buttons
        const button = document.createElement('button');
        button.id = MOBILE_BUTTON_ID;
        button.type = 'button';
        button.title = 'Ask DeepWiki';
        button.setAttribute('aria-label', 'Open DeepWiki for this repository');
        button.classList.add('Button', 'Button--iconOnly', 'Button--secondary', 'Button--medium');

        const svgContent = `
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon Button-visual">
                <path fill="currentColor" d="M8 0a8 8 0 100 16A8 8 0 008 0zm1.5 13.5v-1.5c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1.5c-2.5-.5-4.5-2.5-5-5H3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1H1.5C2 2.5 4 .5 6.5 0H8c2.5.5 4.5 2.5 5 5H11.5c-.55 0-1 .45-1 1v1.5c0 .55.45 1 1 1H13c-.5 2.5-2.5 4.5-5 5z"/>
            </svg>`;

        button.innerHTML = svgContent;

        button.addEventListener('click', (event) => {
            event.preventDefault();
            try {
                const deepwikiUrl = `https://${DEEPWIKI_DOMAIN}/${pathParts[0]}/${pathParts[1]}`;
                console.log(`Deepwiki Button: Opening ${deepwikiUrl} from mobile button`);
                GM_openInTab(deepwikiUrl, { active: true, insert: true });
            } catch (error) {
                console.error("Deepwiki Button Error (mobile):", error);
                alert("Failed to generate or open Deepwiki URL.");
            }
        });

        mobileContainer.appendChild(button);
        return true;
    }

    // --- MutationObserver Logic ---
    const observer = new MutationObserver((mutationsList, observer) => {
        // Check if the desktop target list exists and doesn't contain our button yet
        const listExists = document.querySelector(TARGET_LIST_SELECTOR);
        if (listExists && !listExists.querySelector(`#${BUTTON_ID}`)) {
            createAndAddButton();
        }

        // Check if mobile container exists and doesn't have our button
        const mobileContainerExists = document.querySelector(MOBILE_CONTAINER_SELECTOR);
        if (mobileContainerExists && !mobileContainerExists.querySelector(`#${MOBILE_BUTTON_ID}`)) {
            const pathParts = window.location.pathname.split('/').filter(Boolean);
            if (pathParts.length === 2) {
                createAndAddMobileButton(pathParts);
            }
        }

        // Check if our button was removed (e.g., by GitHub re-rendering the list)
        for (const mutation of mutationsList) {
            if (mutation.removedNodes) {
                let buttonRemoved = false;
                mutation.removedNodes.forEach(node => {
                    // Check if the removed node *is* the LI containing our button, or contains it
                    if (node.nodeType === 1 && node.querySelector(`#${BUTTON_ID}`)) {
                         buttonRemoved = true;
                    }
                    // Also check if the removed node *is* the button itself (less likely if wrapped in LI)
                    if (node.nodeType === 1 && node.id === BUTTON_ID) {
                         buttonRemoved = true;
                    }
                });
                // If button was removed and the list still exists, try re-adding
                if (buttonRemoved && document.querySelector(TARGET_LIST_SELECTOR)) {
                     // console.log("Deepwiki Button: Detected button removal, attempting re-add.");
                     createAndAddButton();
                     break; // No need to check other mutations if we already tried re-adding
                }
            }
        }

        // Also check if mobile button was removed
        for (const mutation of mutationsList) {
            if (mutation.removedNodes) {
                let mobileButtonRemoved = false;
                mutation.removedNodes.forEach(node => {
                    if (node.nodeType === 1 && (
                        node.querySelector(`#${MOBILE_BUTTON_ID}`) ||
                        node.id === MOBILE_BUTTON_ID
                    )) {
                        mobileButtonRemoved = true;
                    }
                });

                if (mobileButtonRemoved && document.querySelector(MOBILE_CONTAINER_SELECTOR)) {
                    const pathParts = window.location.pathname.split('/').filter(Boolean);
                    if (pathParts.length === 2) {
                        createAndAddMobileButton(pathParts);
                    }
                    break;
                }
            }
        }
    });

    // Start observing the document body for changes in the subtree and child list
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    createAndAddButton();
})();
