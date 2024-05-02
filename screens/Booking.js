import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CalendarPicker from "react-native-calendar-picker";
import { ScrollView } from 'react-native-virtualized-view';
import Button from '../components/Button';
import { useTheme } from '../theme/ThemeProvider';

const Booking = ({ navigation }) => {
  const minDate = new Date(); //Today
  const maxDate = new Date(2026, 6, 3);
  const [selectedStartDate, setSelectedStartDate] = useState('DD/MM/YYYY');
  const [selectedEndDate, setSelectedEndDate] = useState('DD/MM/YYYY');
  const { colors, dark } = useTheme();

  const onDateChange = (date, type) => {
    console.log(JSON.stringify(date))
    const newDate = JSON.stringify(date);
    const newDate1 = newDate.substring(1, newDate.length - 1)
    const dates = newDate1.split("T")
    const date1 = dates[0].split("-")
    const day = date1[2]
    const month = date1[1]
    const year = date1[0]
    console.log(day + "-" + month + "-" + year)

    if (type == 'END_DATE') {
      if (day == undefined) {
        setSelectedEndDate('DD/MM/YYYY')
      } else {
        setSelectedEndDate(day + "/" + month + "/" + year)
      }
    } else {
      setSelectedStartDate(day + "/" + month + "/" + year)
    }

  }

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Booking" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, {
            color: dark ? COLORS.secondaryWhite : COLORS.black
          }]}>Select Date</Text>
          <View>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              allowBackwardRangeSelect={true}
              minDate={minDate}
              maxDate={maxDate}
              weekdays={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
              months={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
              todayBackgroundColor={COLORS.primary}
              selectedDayColor={COLORS.primary}
              selectedDayTextColor={COLORS.white}
              onDateChange={onDateChange}
              previousTitleStyle={{
                color: dark ? COLORS.secondaryWhite : COLORS.black
              }}
              nextTitleStyle={{
                color: dark ? COLORS.secondaryWhite : COLORS.black
              }}
              textStyle={{
                color: dark ? COLORS.secondaryWhite : COLORS.black
              }}

            />
          </View>
          <View style={styles.selectedDateContainer}>
            <View style={styles.selectedDateLeftContainer}>
              <Text style={[styles.selectedDateTitle, {
                color: dark ? COLORS.secondaryWhite : COLORS.black
              }]}>Check In</Text>
              <View style={[styles.dateContainer, {
                backgroundColor: dark ? COLORS.dark2 : COLORS.tertiaryWhite,
              }]}>
                <Text style={styles.dateText}>{selectedStartDate}</Text>
                <Image
                  source={icons.calendar4}
                  resizeMode='contain'
                  style={styles.calendarIcon}
                />
              </View>
            </View>
            <View style={styles.selectedDateLeftContainer}>
              <Text style={[styles.selectedDateTitle, {
                color: dark ? COLORS.secondaryWhite : COLORS.black
              }]}>Check out</Text>
              <View style={[styles.dateContainer, {
                backgroundColor: dark ? COLORS.dark2 : COLORS.tertiaryWhite,
              }]}>
                <Text style={styles.dateText}>{selectedEndDate}</Text>
                <Image
                  source={icons.calendar4}
                  resizeMode='contain'
                  style={styles.calendarIcon}
                />
              </View>
            </View>
          </View>

          <Text style={[styles.title, {
            color: dark ? COLORS.secondaryWhite : COLORS.black
          }]}>Note to Owner (optional)</Text>
          <TextInput
            placeholder='Notes'
            placeholderTextColor={COLORS.grayscale700}
            style={[styles.noteInput, {
              backgroundColor: dark ? COLORS.dark2 : COLORS.tertiaryWhite,
              color: dark ? COLORS.secondaryWhite : COLORS.black
            }]}
            multiline={true}
          />
        </ScrollView>
        <Button
          title="Continue"
          style={styles.button}
          filled
          onPress={() => { navigation.navigate("BookingDetails") }}
        />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white
  },
  title: {
    fontSize: 18,
    fontFamily: "Urbanist Bold",
    color: COLORS.black,
    marginVertical: 16
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  selectedDateLeftContainer: {
    width: (SIZES.width - 32) / 2 - 12,
    marginVertical: 12
  },
  selectedDateTitle: {
    fontSize: 18,
    fontFamily: "Urbanist Bold",
    color: COLORS.black,
    marginBottom: 12
  },
  dateContainer: {
    width: (SIZES.width - 32) / 2 - 12,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.tertiaryWhite,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12
  },
  dateText: {
    fontSize: 13,
    fontFamily: "Urbanist Regular",
    color: COLORS.grayscale700
  },
  calendarIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.black
  },
  noteInput: {
    width: SIZES.width - 32,
    height: 112,
    borderRadius: 16,
    backgroundColor: COLORS.tertiaryWhite,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.greyscale900,
    fontFamily: "Urbanist Regular"
  },
  button: {
    position: "absolute",
    bottom: 6,
    width: SIZES.width - 32,
    backgroundColor: COLORS.primary,
    right: 16,
    left: 16
  }
})

export default Booking