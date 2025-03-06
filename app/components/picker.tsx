"use client";
import React, { useState } from "react";
import { DateTimePicker } from "@/components/custom/date-picker";

const DatetimePickerDemo = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return <DateTimePicker granularity="day" value={date} onChange={setDate} />;
};

export default DatetimePickerDemo;
