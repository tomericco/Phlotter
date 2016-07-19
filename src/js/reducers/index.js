import * as _ from 'lodash'
import { combineReducers } from 'redux'
import {
    FILTER_PHOTOS,
    CLEAR_FILTER,
    RECEIVE_PHOTOS,
    SHOW_LIGHTBOX,
    HIDE_LIGHTBOX,
    TOGGLE_DATE_PICKER
} from '../actions'

function map(state = {}, action = {}) {
    switch (action.type) {
        case FILTER_PHOTOS:
            const query = action.query
            const photosToRender = _.filter(state.photos, photo => {
                var takenAt = moment(photo.takenAt)
                return !photo ? false : takenAt.isAfter(query.startDate) && takenAt.isBefore(query.endDate)
            })

            return _.assign({}, state, { photosToRender })

        case CLEAR_FILTER:
            return _.assign({}, state, { photosToRender: state.photos })

        case RECEIVE_PHOTOS:
            const updatedPhotos = {
                photos: action.photos,
                photosToRender: action.photos
            }
            return _.assign({}, state, updatedPhotos)

        case TOGGLE_DATE_PICKER:
            return _.assign({}, state, {
                showDatePicker: action.show
            })

        default:
            return state
    }
}

function lightBox(state = {}, action = {}) {
    switch (action.type) {
        case SHOW_LIGHTBOX:
            return _.assign({}, state, {
                showLightBox: true,
                photoRef: action.photo
            })

        case HIDE_LIGHTBOX:
            return _.assign({}, state, {
                showLightBox: false,
                photoRef: null
            })

        default:
            return state
    }
}

const rootReducer = combineReducers({
    map,
    lightBox
})

export default rootReducer
