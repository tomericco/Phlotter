import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { showLightBox } from '../actions'

import 'css/PhotoMarker'

export default class PhotoMarker extends Component {
    static get propTypes() {
        return {
            dispatch: PropTypes.func,
            index: PropTypes.number,
            photo: PropTypes.shape({
                url: PropTypes.string,
                geo: PropTypes.shape({
                    lat: PropTypes.number,
                    lng: PropTypes.number
                }),
                takenAt: PropTypes.string
            }).isRequired
        }
    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldPureComponentUpdate;
        this.handleMarkerClick = this.handleMarkerClick.bind(this)
    }

    handleMarkerClick() {
        this.props.dispatch(showLightBox(this.props.index))
    }

    render() {
        return (
            <div className="photoMarker" onClick={this.handleMarkerClick}>
                <img src={this.props.photo.url} />
            </div>
        );
    }
}