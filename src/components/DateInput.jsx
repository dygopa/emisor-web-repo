import { format } from "date-fns";
import { useState } from "react";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import moment from "moment";

import React, { useRef, useEffect } from "react";
import { IMaskInput } from "react-imask";

export const InputComponent = ({
  daySelected,
  customOnChange,
  fromYear,
  toYear,
  invalidText
}) => {
  const [activePopup, setActivePopup] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);

  const [date, setDate] = useState("");

  const minDate = moment().subtract(90, "y").toDate();
  const maxDate = moment().subtract(16, "y").toDate();

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActivePopup(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  function handleOnChange(e) {
    setDate(moment(e).format("YYYY-MM-DD"))
    customOnChange(moment(e).format("YYYY-MM-DD"));
    setActivePopup(false);
  }

  return (
    <div className="form-control-date" ref={wrapperRef}>
      <input
        className="form-control"
        placeholder="00/00/0000"
        //mask={"00/00/0000"}
        onClick={() => {
          setActivePopup(!activePopup);
        }}
        onChange={(e)=> handleOnChange(e.target.value) }
        value={daySelected}
        type={"date"}
      />
      {(moment(daySelected).isBefore(minDate) || moment(daySelected).isAfter(maxDate) ) && <p className="text-[0.8rem] mt-1 text-red-700">{invalidText}</p>}
      {activePopup && (
        <div className="form-control-date-popup">
          <DayPicker
            showOutsideDays
            locale={es}
            fromYear={fromYear}
            toYear={toYear}
            captionLayout="dropdown"
            mode="single"
            selected={moment(daySelected, "YYYY-MM-DD").toDate()}
            onSelect={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
      )}
    </div>
  );
};
