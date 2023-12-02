import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function InputDate({ dateOfBirth, changeDate }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker label="Date of birth" value={dateOfBirth} onChange={(newValue) => changeDate(newValue)} />
            </DemoContainer>
        </LocalizationProvider>
    );
}
