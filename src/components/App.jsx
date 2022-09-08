import React, { memo, useState, useRef, useEffect } from 'react'
import ReactHintFactory from 'react-hint'
import { CSSTransition } from 'react-transition-group'
import copy from 'copy-to-clipboard'
import { assets } from '../data'
import { openLinkInNewTab } from '../utils'
import { projects } from '../data'
import Projects from './Projects'
import './App.sass'
import './transitions.sass'
import './hint.sass'

const { github, linkedin, me, bridge, mountain } = assets

const ReactHint = ReactHintFactory(React)

const App = () => {
    const [navBarBackground, setNavBarBackground] = useState(false)
    const [menuIn, setMenuIn] = useState(false)
    const [appIn, setAppIn] = useState(false)

    const scrollContainerRef = useRef()

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.addEventListener('scroll', (e) => {
                if (
                    e.target.scrollTop >= e.target.clientHeight &&
                    navBarBackground === false
                ) {
                    setNavBarBackground(true)
                } else {
                    setNavBarBackground(false)
                }
            })
        }
        window.addEventListener('resize', (e) => {
            if (e.target.innerWidth < 800) {
                setMenuIn(false)
            } else {
                setMenuIn(true)
            }
        })
        setTimeout(() => setAppIn(true), 1000)
    }, [])

    const navigateToPage = (id) => () => {
        setMenuIn(false)
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
    }

    const renderMenu = (className) => (
        <div className={className}>
            <p className="link" onClick={navigateToPage('about')}>
                About
            </p>
            <p className="link" onClick={navigateToPage('projects')}>
                Projects
            </p>
            <p className="link" onClick={navigateToPage('contact')}>
                Contact
            </p>
            <img
                className="icon hoverable"
                src={github}
                onClick={openLinkInNewTab('https://github.com/andrewlor')}
            />
            <img
                className="icon hoverable"
                src={linkedin}
                onClick={openLinkInNewTab(
                    'https://www.linkedin.com/in/andrew-lor/'
                )}
            />
        </div>
    )

    return (
        <>
            <CSSTransition in={appIn} timeout={1000} classNames="app">
                <div className="app">
                    <div
                        className={`navbar ${
                            navBarBackground ? 'background' : ''
                        }`}
                    >
                        <div className="main">
                            <img className="me" src={me} />
                            <div className="text-container">
                                <h1>Andrew Lor</h1>
                            </div>
                            <div className="menu-mobile-icon">
                                <span
                                    className="material-icons hoverable"
                                    onClick={() => setMenuIn((x) => !x)}
                                >
                                    menu
                                </span>
                            </div>
                            {renderMenu('menu-desktop')}
                        </div>
                        <CSSTransition
                            in={menuIn}
                            timeout={500}
                            classNames="menu-mobile"
                            unmountOnExit
                        >
                            {renderMenu('menu-mobile')}
                        </CSSTransition>
                    </div>
                    <div ref={scrollContainerRef} className="scroll-container">
                        <div id="home" className="page">
                            <div className="content">
                                <p>Web Development + Design</p>
                                <button
                                    className="hoverable"
                                    onClick={navigateToPage('about')}
                                >
                                    About
                                </button>
                            </div>
                        </div>
                        <div id="about" className="page">
                            <img src={mountain} />
                            <div className="text">
                                <p>About</p>
                                <p>
                                    My name is Andrew. I'm a freelance software
                                    developer.
                                </p>
                                <p>
                                    I am passionate about Front-end Development
                                    and Design on the Web. I also know my way
                                    around the backend.
                                </p>
                                <p>Explore my portfolio of projects below.</p>
                                <button
                                    className="hoverable"
                                    onClick={navigateToPage('projects')}
                                >
                                    Explore
                                </button>
                            </div>
                        </div>
                        <div id="projects" className="page">
                            <Projects projects={projects} />
                        </div>
                        <div id="contact" className="page">
                            <div className="text">
                                <p>Contact</p>
                                <p>
                                    If you have a project you think I'd be a
                                    good fit to work on, reach out.
                                </p>
                                <button
                                    className="hoverable email"
                                    data-rh="andrewlor332@gmail.com"
                                    onClick={() =>
                                        copy('andrewlor332@gmail.com')
                                    }
                                >
                                    Copy Email
                                    <span class="material-icons">
                                        content_copy
                                    </span>
                                </button>
                            </div>
                            <img src={bridge} />
                        </div>
                    </div>
                </div>
            </CSSTransition>
            <CSSTransition in={!appIn} timeout={500} classNames="splash-screen">
                <div className="splash-screen">
                    <span className="material-icons">hourglass_top</span>
                </div>
            </CSSTransition>
            <ReactHint autoPosition events />
        </>
    )
}

export default memo(App)
