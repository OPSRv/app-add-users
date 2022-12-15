import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { default as getMonth, default as getYear } from "date-fns/getYear";
import range from "lodash/range";
import { months } from "../utils/months";

const DatePickerWrap = ({ startDate, setStartDate }) => {
  const years = range(1990, getYear(new Date()) + 1, 1);

  return (
    <div className="col-span-6 sm:col-span-6">
      <label htmlFor="born" className="label-form-add">
        Date of birth
      </label>
      <>
        <DatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {"<"}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {">"}
              </button>
            </div>
          )}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </>
    </div>
  );
};

export default DatePickerWrap;
