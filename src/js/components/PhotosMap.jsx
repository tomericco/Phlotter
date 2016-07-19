import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import { fetchPhotos, toggleDatePicker } from '../actions'
import PhotoMarker from './PhotoMarker.jsx'

export default class PhotosMap extends Component {
    static get propTypes() {
        return {
            photos: PropTypes.array,
            center: PropTypes.any,
            zoom: PropTypes.number,
            markers: PropTypes.any
        }
    }

    static get defaultProps() {
        return {
            center: {lat: 32.0722235, lng: 34.7800799},
            zoom: 13
        }
    }

    constructor(props) {
        super(props);
        this.props.dispatch(fetchPhotos())
        this.closeDatePicker = this.closeDatePicker.bind(this)
    }

    closeDatePicker() {
        this.props.dispatch(toggleDatePicker(false))
    }

    render() {
        const PhotoMarkers = _
            .chain(this.props.photosToRender)
            .compact()
            .map((photo, index) => {
                if (photo) {
                    return (
                        <PhotoMarker key={index}
                                     index={index}
                                     photo={photo}
                                     lat={photo.geo.lat}
                                     lng={photo.geo.lng}
                                     dispatch={this.props.dispatch}/>
                    )
                }
            })
            .value()

        return (
            <GoogleMap ref="map"
                       bootstrapURLKeys={{key: "AIzaSyDvZEn2mtMoUZrd343IQPZ2VQnGbqyWdJw"}}
                       center={this.props.center}
                       zoom={this.props.zoom}
                       onClick={this.closeDatePicker}>
                {PhotoMarkers}
            </GoogleMap>
        );
    }
}