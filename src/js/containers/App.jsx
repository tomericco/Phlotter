import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import PhotosMap from '../components/PhotosMap.jsx'
import PhotoLightBox from '../components/PhotoLightBox.jsx'
import Footer from '../components/Footer.jsx'
import Toolbar from './Toolbar.jsx'

import 'bootstrap/dist/css/bootstrap.css'
import 'css/App'

class App extends Component {
    static get propTypes() {
        return {
            dispatch: PropTypes.func.isRequired,
            map: PropTypes.shape({
                photos: PropTypes.array
            }),
            lightBox: PropTypes.shape({
                showLightBox: PropTypes.boolean,
                photoRef: PropTypes.number
            })
        }
    }

    componentDidMount() {
        document.ontouchmove = e => e.preventDefault();
    }


    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="appContainer">
                <Toolbar dispatch={this.props.dispatch}
                         photos={this.props.map.photos}
                         photosToRender={this.props.map.photosToRender}
                         showDatePicker={this.props.map.showDatePicker} />
                <PhotosMap dispatch={this.props.dispatch}
                         photosToRender={this.props.map.photosToRender} />
                {this.props.lightBox.showLightBox ?
                    <PhotoLightBox dispatch={this.props.dispatch}
                                   photosToRender={this.props.map.photosToRender}
                                   photoRef={this.props.lightBox.photoRef} /> : '' }
                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(App)
