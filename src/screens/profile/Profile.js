import React from 'react';
import { arrayOf, object, bool, func } from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import styles from './ProfileStyle';

const Profile = ({ courses, colors, isRegistered, onVerify, reset }) => {
  return (
    <View style={[styles.container, styles.centered]}>
      <View style={[styles.headerContainer, styles.centered]}>
        <View style={[styles.profilePictureContainer, styles.centered]}>
          <View style={styles.mockProfile} />
        </View>
        <View style={[styles.profileInfoContainer, styles.centered]}>
          <Text style={styles.userFullName}>Nguyen Tuan Loc</Text>
          <Text style={styles.userEmail}>s3695769@rmit.edu.vn</Text>
          <Text onPress={onVerify} style={isRegistered ? styles.verified : styles.notVerified}>
            {isRegistered ? 'Verified' : 'Press here to register identity to FRAA'}
          </Text>
          {isRegistered && <Text onPress={reset}>Press here to reset</Text>}
        </View>
        <View style={[styles.profileStatisticsContainer, styles.centeredRow]}>
          <View style={[styles.profileStatisticsColumn, styles.rightBorder]}>
            <Text style={styles.profileStatisticsNumber}>100</Text>
            <Text style={styles.profileStatisticsTitle}>Check In</Text>
          </View>
          <View style={styles.profileStatisticsColumn}>
            <Text style={styles.profileStatisticsNumber}>5</Text>
            <Text style={styles.profileStatisticsTitle}>Missed</Text>
          </View>
        </View>
      </View>
      <View style={[styles.bodyContainer]}>
        <View style={styles.bodyChildContainer}>
          <Text style={styles.fixedText}>Courses</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}>
            {courses.map((item, key) => (
              <View key={key} style={[styles.carouselItemStyle, colors[key]]}>
                <View style={styles.courseContainer}>
                  <Text style={styles.courseName}>{item.name}</Text>
                  <Text style={styles.courseCode}>{item.title}</Text>
                  <Text style={styles.coursePercentage}>{item.percentage}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.bodyChildContainer}>
          <Text style={styles.fixedText}>Statistics</Text>
          <View style={[styles.profileStatisticsContainer, styles.centeredRow]}>
            <View style={[styles.circle, styles.centered]}>
              <Text style={styles.greenText}>95%</Text>
              <Text>attended</Text>
            </View>
            <Text style={styles.greenText}>Well Done!</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

Profile.propTypes = {
  courses: arrayOf(object).isRequired,
  colors: arrayOf(object).isRequired,
  isRegistered: bool.isRequired,
  onVerify: func.isRequired,
  reset: func.isRequired,
};

export default Profile;
