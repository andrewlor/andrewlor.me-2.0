import React, { memo } from 'react'
import './Project.sass'

const renderLink = (link, icon, label) =>
    link && (
        <a className="hoverable" href={link} target="_blank" data-rh={label}>
            <span className="material-icons">{icon}</span>
        </a>
    )

const Project = ({ project, handleTag }) => {
    const renderTag = (name) => (
        <div key={name} className="tag hoverable" onClick={handleTag(name)}>
            {name}
        </div>
    )

    return (
        <div className="project">
            <div className="title-container">
                <h2>{project.name}</h2>
                {renderLink(project.source, 'source', 'Source Code')}
                {renderLink(project.demo, 'play_circle', 'Live Demo')}
            </div>
            <p>{project.description}</p>
            <div className="tag-container">
                {project.tags.split(',').map(renderTag)}
            </div>
        </div>
    )
}

export default memo(Project)
