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

const { github, linkedin, me, bridge, mountain, desktop } = assets

const ReactHint = ReactHintFactory(React)

const App = () => {
    const [navBarBackground, setNavBarBackground] = useState(false)
    const [menuIn, setMenuIn] = useState(false)
    const [appIn, setAppIn] = useState(false)
    const [pageIndex, setPageIndex] = useState(0)
    const [fullHeight, setFullHeight] = useState(false)

    const scrollContainerRef = useRef()

    useEffect(() => {
        setNavBarBackground(
            menuIn || (![0, 7, 8].includes(pageIndex) && pageIndex > 0)
        )
    }, [pageIndex, menuIn])

    useEffect(() => {
        if (menuIn) {
            setFullHeight(true)
        } else {
            setTimeout(() => setFullHeight(false), 250)
        }
    }, [menuIn])

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.addEventListener('scroll', (e) => {
                const pageIndex = Math.floor(
                    (e.target.scrollTop * 4) / e.target.clientHeight
                )
                setPageIndex(pageIndex)
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
            <p
                className={`link ${
                    Math.floor((pageIndex + 1) / 4) === 1 && 'active'
                }`}
                onClick={navigateToPage('about')}
            >
                About
            </p>
            <p
                className={`link ${
                    Math.floor((pageIndex + 1) / 4) === 2 && 'active'
                }`}
                onClick={navigateToPage('projects')}
            >
                Projects
            </p>
            {/* <p className={`link ${Math.floor((pageIndex + 1) / 4) === 1 && 'active'}`} onClick={navigateToPage('products')}>
                Products
            </p> */}
            <p
                className={`link ${
                    Math.floor((pageIndex + 1) / 4) === 3 && 'active'
                }`}
                onClick={navigateToPage('contact')}
            >
                Contact
            </p>
            <div>
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
        </div>
    )

    const connectButton = (
        <button
            className="hoverable icon"
            onClick={openLinkInNewTab(
                'https://www.linkedin.com/in/andrew-lor/'
            )}
        >
            Connect
            <img className="icon" src={linkedin} />
        </button>
    )

    return (
        <>
            <CSSTransition in={appIn} timeout={1000} classNames="app">
                <div className="app">
                    <div
                        className={`navbar ${
                            navBarBackground && 'background'
                        } ${fullHeight && 'full-height'}`}
                    >
                        <div className="main">
                            <div
                                className="logo-container hoverable"
                                onClick={navigateToPage('home')}
                            >
                                <img className="me" src={me} />
                                <p>Andrew Lor</p>
                            </div>
                            <div className="menu-mobile-icon">
                                <span
                                    className="material-icons hoverable"
                                    onClick={() => setMenuIn((x) => !x)}
                                >
                                    {menuIn ? 'close' : 'menu'}
                                </span>
                            </div>
                            {renderMenu('menu-desktop')}
                        </div>
                        <CSSTransition
                            in={menuIn}
                            timeout={250}
                            classNames="menu-mobile"
                            unmountOnExit
                        >
                            {renderMenu('menu-mobile')}
                        </CSSTransition>
                    </div>
                    <div ref={scrollContainerRef} className="scroll-container">
                        <div id="home" className="page">
                            <img className="background-img" src={desktop} />
                            <div className="content">
                                <p className="first">
                                    Software Developer & UWaterloo Bachelor of
                                    Comp. Sci. 2021.
                                </p>
                                <p>
                                    Currently: Freelancing & open to fulltime
                                    opportunities.
                                </p>
                                <div className="button-menu">
                                    {connectButton}
                                    <button
                                        className="hoverable"
                                        onClick={navigateToPage('projects')}
                                    >
                                        Explore Projects
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="about" className="page">
                            <img src={mountain} />
                            <div className="text">
                                <p>About</p>
                                <p>
                                    I'm a Bachelor of Computer Science from
                                    UWaterloo and have 3+ years of professional
                                    experience as a frontend and fullstack
                                    developer at startups and corporations
                                    across Canada.
                                </p>
                                <p>
                                    View my resumé for more details on my
                                    background.
                                </p>
                                <div className="button-menu">
                                    <button
                                        className="hoverable icon"
                                        onClick={openLinkInNewTab(
                                            'https://andrewlor.me/AndrewLorResume.pdf'
                                        )}
                                    >
                                        Resumé
                                        <span className="material-icons icon">
                                            open_in_new
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="projects" className="page">
                            <Projects projects={projects} />
                        </div>
                        {/* <div id="products" className="page">
                            <Products products={products} />
                        </div> */}
                        <div id="contact" className="page">
                            <div className="text">
                                <p>Contact</p>
                                <p>
                                    Hit me up about opportunities, inquiries or
                                    just to connect!
                                </p>
                                <div className="button-menu">
                                    <button
                                        className="hoverable icon"
                                        data-rh="andrewlor332@gmail.com"
                                        onClick={() =>
                                            copy('andrewlor332@gmail.com')
                                        }
                                    >
                                        Copy Email
                                        <span className="material-icons icon">
                                            content_copy
                                        </span>
                                    </button>
                                    {connectButton}
                                </div>
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
