import * as React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import  lime from "@material-ui/core/colors/lime";


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker
} from '@material-ui/pickers';

export interface ICalendarAndTimeProps {
	selectedTime?: Date;
    selectedDate?: Date;
    personaSize?: number;
    primaryColorCode: string;
    secondaryColorCode: string;
    dateTimePickerLabel: string;
	updateResponse: (newValue: string) => void;
}

export interface ICalendarAndTimeState extends React.ComponentState, ICalendarAndTimeProps {
	personaSize: number;
	imagesFadeIn: boolean;
    primaryColorCode: string;
    secondaryColorCode: string;
    dateTimePickerLabel: string;
    updateResponse: (newValue: string) => void;
    //selectedTime: Date;
}



export class CalendarAndTimeComp extends React.Component<ICalendarAndTimeProps, ICalendarAndTimeState> {
	constructor(props: ICalendarAndTimeProps) {
		super(props);

		this.state = {
			//selectedTime: props.selectedTime || new Date(),
			imagesFadeIn: true,
			personaSize: 32,
            primaryColorCode: props.primaryColorCode,
            secondaryColorCode: props.secondaryColorCode,
            dateTimePickerLabel: props.dateTimePickerLabel,
            updateResponse: props.updateResponse
		};
        this.handleDateChange = this.handleDateChange.bind(this)
	}

    handleTimeChange = (newValue: any) => {
        this.setState({selectedTime: newValue})
    }

    handleDateChange = (newValue: any) => {
        //convert date to ISO format
        var date = new Date(newValue);
        var isoDate = date.toISOString();
        this.setState({selectedDate: newValue})
        //this.setState({selectedDate: isoDate});
        this.props.updateResponse(isoDate);
    }



    public render(): JSX.Element {
    const defaultMaterialTheme = createTheme({
        palette: {
            primary: {
                //main: '#4287f5',
                main: this.props.primaryColorCode,
                },
                secondary: {
                light: '#0066ff',
                main: this.props.secondaryColorCode,
                // dark: will be calculated from palette.secondary.main,
                contrastText: '#ffcc00',
                }
        },
        });

        return(
            <div>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            variant="inline"
                            label={this.props.dateTimePickerLabel}
                            inputVariant="outlined"
                            value={this.props.selectedDate}
                            onChange={this.handleDateChange}
                            fullWidth
                        />
                    </MuiPickersUtilsProvider>
                </ThemeProvider>


            </div>
        )
    }
}
