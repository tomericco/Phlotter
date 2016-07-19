import React, { Component, PropTypes } from 'react'
import ImageGallery from 'react-image-gallery';
import { hideLightBox } from '../actions'
import * as _ from 'lodash'

import 'css/PhotoLightBox'

export default class PhotoLightBox extends Component {
    static get propTypes() {
        return {
            dispatch: PropTypes.func,
            photosToRender: PropTypes.array,
            photoRef: PropTypes.number
        }
    }

    constructor(props) {
        super(props)
        this.handleLightBoxClose = this.handleLightBoxClose.bind(this)
        this.handleEscKeyDownEvent = this.handleEscKeyDownEvent.bind(this)
    }

    handleLightBoxClose() {
        this.props.dispatch(hideLightBox())
    }

    handleEscKeyDownEvent(event) {
        const ESC_KEY_CODE = 27
        const LEFT_ARROW_KEY_CODE = 37
        const RIGHT_ARROW_KEY_CODE = 39

        switch (event.keyCode) {
            case ESC_KEY_CODE:
                this.handleLightBoxClose()
                break;
            case LEFT_ARROW_KEY_CODE:
                if (this._imageGallery._canSlideLeft()) {
                    this._imageGallery._slideLeft()
                }
                break;
            case RIGHT_ARROW_KEY_CODE:
                if (this._imageGallery._canSlideRight()) {
                    this._imageGallery._slideRight()
                }
                break;
        }

        // Do not let Google map listen to keyboard
        event.stopPropagation()
    }

    componentWillMount(){
        document.addEventListener('keydown', this.handleEscKeyDownEvent, true)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEscKeyDownEvent, true)
    }

    render() {
        const images = _.map(this.props.photosToRender, photo => {
            return {
                original: photo.url
            }
        })

        return (
            <div className="photoLightBox">
                <div className="closeBtn" onClick={this.handleLightBoxClose}>&#10005;</div>
                <ImageGallery
                    ref={i => this._imageGallery = i}
                    items={images}
                    startIndex={this.props.photoRef}
                    showNav={true}
                    lazyLoad={false}
                    infinite={false}
                    showThumbnails={false} />
            </div>
        )
    }
}