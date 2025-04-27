# GitHub Deepwiki Button

## Overview
The GitHub Deepwiki Button is a Chrome extension that adds a 'deepwiki' button to GitHub repository pages. This button allows users to quickly access the corresponding deepwiki page for the repository they are viewing.

## Features
- Adds a 'deepwiki' button to GitHub repository pages.
- Opens the corresponding deepwiki page in a new tab.
- Compatible with GitHub's dynamic content updates.

## Installation
1. Clone or download the repository:
   ```
   git clone https://github.com/JAB-dev/deepwiki-ext
   ```
2. Navigate to the project directory:
   ```
   cd github-deepwiki-extension
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