import React, { memo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Project from './Project'
import loadingGif from '../../public/assets/loading.gif'
import './Projects.sass'
import { actions } from '../redux'

const Projects = ({ projects, isLoading, error, fetchProjects }) => {
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchProjects(search)
    }, [search])

    const handleTag = (tag) => () => setSearch(tag)

    return (
        <div id="projects">
            <div className="search-container">
                <input
                    id="searchbar"
                    placeholder="Search Development + Design Portfolio"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && search.length > 0 && (
                    <span
                        className="material-icons clear-search hoverable"
                        onClick={() => setSearch('')}
                    >
                        close
                    </span>
                )}
            </div>
            <div id="container" className={isLoading ? 'loading' : ''}>
                {projects &&
                    (projects.length === 0 ? (
                        <p>No projects found</p>
                    ) : (
                        projects.map((project) => (
                            <Project
                                key={project.id}
                                project={project}
                                handleTag={handleTag}
                            />
                        ))
                    ))}
                {error && <p>{error}</p>}
            </div>
            {(isLoading || !projects) && (
                <div id="loading-overlay">
                    <img id="loader" src={loadingGif} />
                </div>
            )}
        </div>
    )
}

export default connect(
    (state) => ({
        projects: state.projects,
        isLoading: state.isLoading,
        error: state.error,
    }),
    (dispatch) => ({
        fetchProjects: (search) =>
            dispatch(actions.projects.fetch.requested(search)),
    })
)(memo(Projects))
