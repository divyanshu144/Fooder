# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

## 1. What is Emmet?
    Emmet is a web development tool. It is used to do coding faster efficiently. It generates a code 
    snippet based on some abbreviations. It is available in many IDEs like Visual Studio Code, Atom. 
    It enhances the productivity of web developers by simplyfying the process of writing HTML and CSS code. 
## 2. Difference between a library & framework?
    
    Library is considered to be some set of files which is used to do some specific work. Libraries 
    are usually not responsible for the overall structure or flow of an application.
    
    Framework is a collection of libraries which tells that if you use it some set of functionality 
    will be imported in your project even though you are not using it. It provides a structured way 
    of building applications

## 3. What is CDN? Why do we use it?
    Content Delivery Network(CDN) is used to serve the contents on internet fastly. We use it to serve 
    some static files from CDN server to the client browser.Because it is fast the loading of static content 
    will be quick. It is located in different geographic locations. CDNs are optimized to handle high traffic
    loads and provide better scalability and reliability. As user access some page then CDN closest to them 
    will serve the static files.
## 4. Why is React known as React?
    React is known as react because it is reactive in nature. The term "reactive" refers to the ability of 
    a program to react or respond to changes in its environment. The name "React" reflects the library's fundamental 
    principle of reacting to changes in data and efficiently updating the UI
## 5. What is cross-origin in the script tag?
    The crossorigin attribute in script tags specifies the cross-origin policy for the script. The cross-origin 
    policy determines how the browser handles requests for the script from other domains. The crossorigin 
    attribute is only relevant when the script is retrieved from a third-party server. If the script is 
    retrieved from the same server as the page, the crossorigin attribute will have no effect. 
## 6. What is difference between React and ReactDOM?
    React and ReactDOM are two different JavaScript libraries that are used together to create React 
    applications. React is responsible for creating the UI components, while ReactDOM is responsible 
    for rendering those components to the DOM. ReactDOM act as a bridge between React and browser's DOM.
## 7. What is difference between react.development.js and react.production.js files via CDN?
    
    react.development.js - is used in development environment. this is not minified. in this easy to 
    debug and develop application. features wise - Source maps, warnings, hot reloading
    
    react.production.js - is used in production environment. this is minified file. optimized for performance.

## 8. What are async and defer? 
    
    Async - async attribute in script tag doesn't confirms the order of execution of scripts. whenever
    html parsing of html file happens in browser, then fetching or downloading of script file also 
    happens i.e parallely. Once the fetching of script file completed it stop html parsing and start 
    the execution of script files. After complete execution of script file, html parsing will continue.

    Defer - defer attribute in script tag maintains the order of execution of script files. Whenever 
    html parsing of html file happens in browser, the fetch or downloading of script files also happen 
    i.e. parallely. The execution of script file will happen only when html parsing gets completed.

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
