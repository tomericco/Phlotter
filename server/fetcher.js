var dropbox = require('./storage/dropbox')

export function fetchPhotos(storageParams) {
    const storageType = storageParams['STORAGE_TYPE']

    switch (storageType) {
        case 'DROPBOX':
            return dropbox.getPhotos({
                path: storageParams['STORAGE_FOLDER_PATH'],
                accessToken: storageParams['STORAGE_ACCESS_TOKEN']
            })
        default:
            console.error('Storage type is not supported!', storageType)
            return []
    }
}