import React, { memo, useState } from 'react'
import Project from './Project'
import { CSSTransition } from 'react-transition-group'
import './Projects.sass'

const Projects = ({ projects }) => {
    const [index, setIndex] = useState(0)
    const [leftTransition, setLeftTransition] = useState(true)

    const cycleProject = (direction) => () => {
        setLeftTransition(direction > 0)
        setIndex((i) =>
            direction < 0 && i == 0
                ? projects.length - 1
                : (i + direction) % projects.length
        )
    }

    return (
        <div className="projects">
            {projects &&
                projects.map((project, i) => (
                    <CSSTransition
                        in={index === i}
                        timeout={1000}
                        classNames={
                            leftTransition ? 'project-left' : 'project-right'
                        }
                        unmountOnExit
                        key={project.title}
                    >
                        <Project
                            project={project}
                            next={cycleProject(1)}
                            prev={cycleProject(-1)}
                        />
                    </CSSTransition>
                ))}
        </div>
    )
}

export default memo(Projects)
