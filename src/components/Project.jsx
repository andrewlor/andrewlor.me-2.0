import React, { memo } from 'react'
import './Project.sass'

const renderLink = (link, icon, label) =>
    link && (
        <a className="hoverable" href={link} target="_blank" data-rh={label}>
            <span className="material-icons">{icon}</span>
        </a>
    )

const renderTag = (name) => (
    <div key={name} className="tag">
        {name}
    </div>
)

const Project = ({ project, next, prev }) => (
    <div className="project">
        <img src={project.img} />
        <div className="menu">
            <span className="material-icons hoverable" onClick={prev}>
                chevron_left
            </span>
            <div className="text-container">
                <div className="title-container">
                    <h2>{project.title}</h2>
                    {renderLink(project.source, 'source', 'Source Code')}
                    {renderLink(project.demo, 'play_circle', 'Live Demo')}
                </div>
                <p className="description">{project.description}</p>
                <div className="tag-container">
                    {project.tags
                        .split(',')
                        .map((x) => x.trim())
                        .map(renderTag)}
                </div>
            </div>
            <span className="material-icons hoverable" onClick={next}>
                chevron_right
            </span>
        </div>
    </div>
)

export default memo(Project)
