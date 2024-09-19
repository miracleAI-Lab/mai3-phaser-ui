// import React from 'react'
// import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
import Game from './Game'

const game = new Game().Run();
let check = false

checkOrientation()
window.addEventListener('orientationchange', checkOrientation.bind(this));


function checkOrientation() {
    const width = game.scale.width
    const height = game.scale.height
    console.log(window.orientation)
    if (window.orientation === 90) {
        game.scale.setGameSize(height, width)
        check = true
    } else {
        if (check === true) {
            game.scale.setGameSize(height, width)
        }
    }
}

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// )
