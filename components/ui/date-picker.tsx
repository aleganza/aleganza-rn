import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CrossPlatformDatePickerProps {
  value: Date;
  mode?: "date" | "time" | "datetime";
  display?: "default" | "spinner" | "calendar" | "clock";
  onChange: (date: Date) => void;
  label?: string;
}

// TODO: do better
const CrossPlatformDatePicker: React.FC<CrossPlatformDatePickerProps> = ({
  value,
  mode = "date",
  display = "default",
  onChange,
  label,
}) => {
  const [show, setShow] = useState(Platform.OS === "ios");

  const handleChange = (_: any, selectedDate?: Date) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
    if (Platform.OS === "android") {
      setShow(false);
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "android" && (
        <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
          <Text>{value.toLocaleDateString()}</Text>
        </TouchableOpacity>
      )}
      {(show || Platform.OS === "ios") && (
        <DateTimePicker
          value={value}
          mode={mode}
          display={display}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
  },
});

export default CrossPlatformDatePicker;
