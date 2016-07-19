import React, { Component, PropTypes } from 'react'
import DatePickerButton from '../components/DatePickerButton.jsx'
import PhotosCounterLabel from '../components/PhotosCounterLabel.jsx'

import 'css/Toolbar'

export default class Toolbar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="toolbar">
                <DatePickerButton dispatch={this.props.dispatch}
                                  showDatePicker={this.props.showDatePicker} />
                <PhotosCounterLabel dispatch={this.props.dispatch}
                                    photosToRender={this.props.photosToRender}
                                    photos={this.props.photos}/>
            </div>
        )
    }
}