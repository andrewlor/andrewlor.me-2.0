import {
    createAction,
    createReducer,
    configureStore,
    createListenerMiddleware,
} from '@reduxjs/toolkit'
import { fetchProjects } from './api/airtable'

export const actions = {
    projects: {
        fetch: {
            requested: createAction('projects.fetch.requested'),
            started: createAction('projects.fetch.started'),
            succeeded: createAction('projects.fetch.succeeded'),
            failed: createAction('projects.fetch.failed'),
        },
    },
}

const initialState = {
    projects: null,
    isLoading: false,
    error: null,
}

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.projects.fetch.succeeded, (state, action) => {
            state.projects = action.payload
            state.isLoading = false
        })
        .addCase(actions.projects.fetch.failed, (state, action) => {
            state.projects = null
            state.error = action.payload
            state.isLoading = false
        })
        .addCase(actions.projects.fetch.started, (state) => {
            state.isLoading = true
        })
})

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    actionCreator: actions.projects.fetch.requested,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners()
        await listenerApi.delay(500)
        listenerApi.dispatch(actions.projects.fetch.started(action.payload))
    },
})

listenerMiddleware.startListening({
    actionCreator: actions.projects.fetch.started,
    effect: async (action, listenerApi) => {
        try {
            const projects = await fetchProjects(action.payload)
            listenerApi.dispatch(actions.projects.fetch.succeeded(projects))
        } catch (e) {
            listenerApi.dispatch(actions.projects.fetch.failed(e.message))
        }
    },
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
