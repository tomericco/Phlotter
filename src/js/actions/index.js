import fetch from 'isomorphic-fetch'
import * as _ from 'lodash'

export const FILTER_PHOTOS = 'FILTER_PHOTOS'
export const CLEAR_FILTER = 'CLEAR_FILTER'
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS'
export const SHOW_LIGHTBOX = 'SHOW_LIGHTBOX'
export const HIDE_LIGHTBOX = 'HIDE_LIGHTBOX'
export const TOGGLE_DATE_PICKER = 'TOGGLE_DATE_PICKER'

export function fetchPhotos() {
    return dispatch => {
        return fetch('/photos')
            .then(response => {
                if (response.status >= 400) {
                    throw new Error(response.statusText);
                }
                return response.json()
            })
            .then(json => {
                const photos = _.compact(json.photos)
                dispatch(receivePhotos(photos))
            })
    }
}

export function filterPhotos(query) {
    return {
        type: FILTER_PHOTOS,
        query: query
    }
}

export function clearFilter() {
    return {
        type: CLEAR_FILTER
    }
}

export function receivePhotos(photos) {
    return {
        type: RECEIVE_PHOTOS,
        photos
    }
}

export function showLightBox(photo) {
    return {
        type: SHOW_LIGHTBOX,
        photo
    }
}

export function hideLightBox() {
    return {
        type: HIDE_LIGHTBOX
    }
}

export function toggleDatePicker(show) {
    return {
        type: TOGGLE_DATE_PICKER,
        show: show
    }
}