import React, {PropTypes, Component} from 'react';
import { clearFilter } from '../actions'
import * as _ from 'lodash'

import 'css/Toolbar'

export default class PhotosCounterLabel extends Component {
    constructor(props) {
        super(props);
        this.handleShowAll = this.handleShowAll.bind(this)
        this.isFilterApplied = this.isFilterApplied.bind(this)
    }

    handleShowAll() {
        this.props.dispatch(clearFilter())
    }

    isFilterApplied() {
        const photosToRenderCount = this.props.photosToRender && this.props.photosToRender.length
        const photosCount = this.props.photos && this.props.photos.length

        return photosCount !== photosToRenderCount
    }

    render() {
        return (
            <div className="counterLabel valign">
                Displaying {_.size(this.props.photosToRender)} memories &nbsp;
                {this.isFilterApplied() ?
                    <span>(<span className="showAllBtn" onClick={this.handleShowAll}>Show All</span>)</span> : ''}
            </div>
        );
    }
}