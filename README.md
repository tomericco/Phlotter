# Phlotter
Phlotter lets you connect to any existing cloud photo storage, and plots it on a Google map. Phlotter reads your photos' [Geo tags](https://en.wikipedia.org/wiki/Geotagging) and position them on the map. It also reads the date each was taken and gives you the option to filter according to any date.

### Storage configuration
Phlotter now supply only one integration, to [Dropbox](https://www.dropbox.com/).  
You are welcome to add any integration you want, just PR and I'll review.

In order to connect your Dropbox account, you should provide the following details in `storage.config.js` file:

- `STORAGE_TYPE`: Currently set to Dropbox, as the only storage available
- `STORAGE_KEY`: The app key that Phlotter will use in order to call the storage API
- `STORAGE_SECRET`: The app secret that Phlotter will use in order to call the storage API
- `STORAGE_ACCESS_TOKEN`: Some storage providers require an access token for API calls, this is where you put it
- `STORAGE_USER_ID`: Some storage providers require a user ID for call API on behalf of, this is where you put it
- `STORAGE_FOLDER_PATH`: The path to photos folder in storage hierarchy

### Installation
- `git clone git@github.com:tomericco/Phlotter.git && cd Phlotter`  
- Fill up `storage.config.js` with all storage details (right now only Dropbox supported)
- `npm install`  
- `npm start`

### Deployment
Phlotter is ready for deployment to [Heroku](https://www.heroku.com/).

### Technology
Phlotter is built with React and Redux, written in ES6 Javascript, transpiled by Babel.  
Server side is running Express. No DB involved.
