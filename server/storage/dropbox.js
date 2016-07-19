var fetch = require('isomorphic-fetch')
var _ = require('lodash')
var url = require('url')

var DROPBOX_API_LIST_FOLDER_URL = 'https://api.dropboxapi.com/2/files/list_folder'
var DROPBOX_API_GET_LINK_URL = 'https://api.dropboxapi.com/2/sharing/list_shared_links'

function parseResponse(res) {
    return res.json()
}

function getPhotoPublicUrl(photoPath, accessToken) {
    return fetch(DROPBOX_API_GET_LINK_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path: photoPath,
            direct_only: true
        })
    }).then(parseResponse)
}

function parseJSON(json) {
    const photos = _.chain(json.entries)
        .map(photo => {
            if (!photo.media_info || !photo.media_info.metadata.location) {
                return null
            }

            return {
                id: photo.id,
                takenAt: photo.media_info.metadata.time_taken,
                geo: {
                    lat: photo.media_info.metadata.location.latitude,
                    lng: photo.media_info.metadata.location.longitude
                },
                path: photo.path_display
            }
        })
        .compact()
        .value()

    return photos;
}

export function getPhotos(params) {
    return fetch(DROPBOX_API_LIST_FOLDER_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + params.accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path: params.path,
            include_media_info: true
        })
    })
        .then(parseResponse)
        .then(parseJSON)
        .then(photos => {
            console.log('Photos with metadata', photos.length)

            const photosWithUrlsPromise = photos.map(photo => {
                return getPhotoPublicUrl(photo.path, params.accessToken)
            })

            return Promise.all(photosWithUrlsPromise).then(photosWithUrls => {
                console.log('Photos with sharing URL', photosWithUrls.length)

                let photosMap = _.groupBy(photos, 'id')
                let photosWithUrlsMap = _.chain(photosWithUrls)
                    .map(photo => photo.links[0])
                    .compact()
                    .groupBy('id')
                    .value()

                return _.chain(photosMap)
                    .map((val, id) => {
                        if (!photosWithUrlsMap[id]) {
                            return null;
                        }

                        const parsedUrl = url.parse(photosWithUrlsMap[id][0].url)
                        val[0].url = 'https://dl.dropboxusercontent.com' + parsedUrl.pathname

                        return val[0];
                    })
                    .compact()
                    .value()
            }, err => {
                console.error('Error', err)
                throw new Error('Error while fetching photo public URL', err)
            }).catch(err => {
                console.error('Error', err)
                throw new Error('Could not complete URLs fetching from Dropbox', err)
            })
        }).catch(err => {
            console.error('Error', err)
            throw new Error('Could not fetch photos list from Dropbox', err)
        })
}