import { format } from "date-fns";
import { useState } from "react";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import moment from "moment";

import React, { useRef, useEffect } from "react";

export const InputComponent = ({
  daySelected,
  customOnChange,
  fromYear,
  toYear,
  minDate,
  maxDate,
  invalidText
}) => {
  const [activePopup, setActivePopup] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);

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
    
    let date = moment(e, "DD/MM/YYYY").isAfter(moment().subtract(8, "year"))
    console.log(e)
    setInvalidDate(date)
    customOnChange(e);
    setActivePopup(false);
  }

  return (
    <div className="form-control-date" ref={wrapperRef}>
      <input
        max={maxDate}
        min={minDate}
        className="form-control"
        type={"text"}
        onChange={(e)=> handleOnChange(e.target.value) }
        value={moment(daySelected).format("DD/MM/YYYY").toString()}
        onClick={() => {
          setActivePopup(!activePopup);
        }}
      />
      {invalidDate && <p className="text-[0.8rem] mt-1 text-red-700">{invalidText}</p>}
      {activePopup && (
        <div className="form-control-date-popup">
          <DayPicker
            showOutsideDays
            locale={es}
            fromYear={fromYear}
            toYear={toYear}
            captionLayout="dropdown"
            mode="single"
            selected={daySelected}
            onSelect={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
      )}
    </div>
  );
};
