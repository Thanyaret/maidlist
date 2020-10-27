import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    props.onDateChange(date)
    
    hideDatePicker();
  };

  return (
    <View>
      <Button title="โปรดเลือกวันที่" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;