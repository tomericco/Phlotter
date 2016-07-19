import React, {PropTypes, Component} from 'react';
import { DateRange } from 'react-date-range';
import { filterPhotos, toggleDatePicker } from '../actions'

import 'css/Toolbar'

export default class DatePickerButton extends Component {
    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleButtonClick() {
        this.props.dispatch(toggleDatePicker(!this.props.showDatePicker))
    }

    handleSelect(range) {
        if (!range.startDate.isSame(range.endDate)) {
            this.props.dispatch(filterPhotos(range))
        }
    }

    render() {
        return (
            <div className="datePickerBtn valign">
                <img src="/assets/calendar_icon.png"
                     onClick={this.handleButtonClick} />
                {this.props.showDatePicker ?
                    <div className="datePicker">
                        <DateRange
                            onChange={this.handleSelect}
                            calendars="1"
                            theme={{
                                DateRange: { background: 'rgba(255, 255, 255, 0.7)', marginTop: 10 },
                                Calendar: { background: 'transparent' }
                            }}/>
                    </div> : ''}
            </div>
        );
    }
}