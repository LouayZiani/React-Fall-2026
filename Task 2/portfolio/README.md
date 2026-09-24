# Task 2: Building a React app:

## 1. React app structure:

App
│
|---- Navbar
│   |---- Name
│   |---- About
│   |---- Projects
│   |---- Contact
│
|---- Main
│   |---- Profile Sidebar
│   │   |---- Profile Image
│   │   |---- Name
│   │   |---- Location
│   │   |---- GitHub
│   │   |---- Linkedin
│   │   |---- IG
│   │
│   |---- Introduction
│   │   |---- Short introduction
│   │   |---- About Me
│   │
│   |---- Projects
│       |---- Project 1
│       |---- Project 2
│       |---- Project 3
│       |---- Project 4
│
|---- Footer
│   |---- Name

## 2. Creating React app (using Vite instead of CRA):

---> N.B.: Vite is a fast modern frontend build tool and local development server created by Evan You, the creator of Vue.js.

PS C:\Users\Louay\Desktop\React-Class\Task 2> npm create vite@latest portfolio

Project name: portfolio
Framework: React
Variant: JS

Then I ran:

npm install

(to install all the dependencies)

I also installed `react-icons` to use icons for GitHub, linkedin, ig, and the location.

## 3. Breakdown of the files We got:

Main files are:

* `App.jsx`: contains the main React app structure and connects all the components together.
* `App.css`: contains the custom styling for the application, including the layout, navbar, profile section, projects, background, and responsive design.
* `index.css`: contains global styling such as the font, box sizing, smooth scrolling, and default body styling.
* `main.jsx`: the file that starts the React application and renders the `App` component.

I also created a `components` folder containing the different parts of the page:

* `Navbar.jsx`: navigation bar at the top of the page.
* `ProfileSideBar.jsx`: profile image, name, location, and social media links.
* `Introduction.jsx`: introduction and About Me section.
* `Projects.jsx`: displays my projects and their descriptions.
* `Footer.jsx`: footer at the bottom of the page.

## 4. Planning the components:

In this assignment, we need at least 3 React components.

-- 1st Component: Navbar

This is the navigation bar at the top of the page.

It contains:

Home | About | Projects | Contact

The links use section IDs to navigate to different parts of the single-page application.

-- 2nd Component: Profile Sidebar

This section contains my profile information:

* Profile image
* Name
* Location
* GitHub
* LinkedIn
* Instagram

I used `react-icons` for the different icons.

-- 3rd Component: Introduction

Main introduction:

Hello, I am Louay!

I'm a senior Computer Systems and Software student at the Kazakh-British Technical University in Almaty, Kazakhstan.

The section also contains a short About Me description about my interests in artificial intelligence, human-centered technology, research, internships, and international experiences.

-- 4th Component: Projects

This section presents some of the projects I have worked on:

* SilentScript: Real-Time Gesture Recognition
* Braille-Inspired Multi-Modal Feedback via Acoustic Levitation
* NeuroStar: AR Cognitive Engagement Game
* Medical AI: Blood Cell Detection

Some projects also include a GitHub link.

-- 5th Component: Footer

A simple footer at the bottom of the page containing:

By Louay Ziani

## 5. CSS styling:

For the styling, I created a custom layout instead of using a template.

The page uses:

* Space Grotesk font
* A blurred Morocco-themed background
* A semi-transparent / glass-like navbar and footer
* A two-column layout with the profile sidebar on the left
* A main content section on the right
* Circular profile image
* Hover effects on navigation and social links
* Responsive design for smaller screens

The layout changes to a single-column layout when the screen width becomes smaller.

## 6. Running the application:

To run the application locally:

npm run dev

Then open the local development server in the browser.

## 7. Deployment using GitHub Pages:

To deploy the React application, I used GitHub Pages.

First, I installed the `gh-pages` package:

npm install gh-pages --save-dev

Then I added the following configuration to `vite.config.js` so that Vite knows the correct base path for the GitHub Pages deployment:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
```

I then added deployment scripts to `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

The `predeploy` script builds the React application, while the `deploy` script publishes the generated `dist` folder to the `gh-pages` branch.

After connecting the local project to my GitHub repository, I ran:

npm run deploy

This created the `gh-pages` branch and uploaded the production build of the application.

Finally, in the GitHub repository, I went to:

Settings → Pages

and selected the `gh-pages` branch as the source for the deployment.

The application is then available through the GitHub Pages URL:

https://louayziani.github.io/portfolio/

## 8. Final submission:

The assignment requires the following:

1. GitHub repository link
2. Deployed application link
3. Screenshot of the application running in the browser
4. Press the Turn In button before the deadline

GitHub Repository:
[Add repository link here]

Deployed Application:
https://louayziani.github.io/portfolio/