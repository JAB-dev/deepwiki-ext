# GitHub Deepwiki Button

## Overview
The GitHub Deepwiki Button is a Chrome extension/Userscript that adds an 'Ask Deepwiki' button to GitHub repository pages. This button allows users to quickly access the corresponding deepwiki page for the repository they are viewing.

## Features
- Adds an 'Ask Deepwiki' button to GitHub repository pages.
- Opens the corresponding deepwiki page in a new tab.
- Compatible with some of GitHub's dynamic content updates.

## Installation

### Userscript
1. Use a good userscript extension, ViolentMonkey
2. Click on the following link to install the userscript:
[Install DeepWiki Userscript](https://github.com/JAB-dev/deepwiki-ext/raw/refs/heads/main/deepwiki.user.js)

### Chrome Extension
1. Clone or download the repository:
   ```
   git clone https://github.com/JAB-dev/deepwiki-ext
   ```
2. Navigate to the project directory:
   ```
   cd deepwiki-ext
   ```
3. Open Chrome and go to `chrome://extensions/`.
4. Enable "Developer mode" in the top right corner.
5. Click on "Load unpacked" and select the `github-deepwiki-extension` directory.

## Usage
- Navigate to any GitHub repository page.
- Click the 'Ask DeepWiki' button to open the corresponding deepwiki page in a new tab.

## Development
- To modify the button's functionality, edit the `src/content/github-button.js` file.
- To change the button's styles, update the `src/styles/button-styles.css` file.
- For background tasks, you can modify `src/background/background.js`.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
