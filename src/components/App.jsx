import React, { memo } from 'react'
import './App.sass'
import Me from '../../public/assets/me.png'
import github from '../../public/assets/github.svg'
import linkedin from '../../public/assets/linkedin.svg'
import { openLinkInNewTab } from '../utils'
import Projects from './Projects'
import ReactHintFactory from 'react-hint'
const ReactHint = ReactHintFactory(React)

const App = () => (
    <div id="app">
        <div id="navbar">
            <img id="me" src={Me} />
            <div id="text-container">
                <h1>Andrew Lor</h1>
                <small>
                    Software Developer&nbsp;&nbsp;|&nbsp;&nbsp;Bachelor of
                    Computer Science, University of Waterloo
                </small>
            </div>
            <img
                className="link hoverable"
                src={github}
                onClick={openLinkInNewTab('https://github.com/andrewlor')}
                data-rh="Github Profile"
            />
            <img
                className="link hoverable"
                src={linkedin}
                onClick={openLinkInNewTab(
                    'https://www.linkedin.com/in/andrew-lor/'
                )}
                data-rh="Linkedin Profile"
            />
        </div>
        <ReactHint autoPosition events />
        <Projects />
    </div>
)

export default memo(App)
