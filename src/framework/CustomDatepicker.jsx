import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomDatePicker = ({
  label = "Select Date",
  format = "DD/MM/YYYY",
  value = null,
  onChange,
  views = ["year", "month", "day"],
  disabled = false,
  minDate,
  maxDate,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        format={format}
        views={views}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
