import React from 'react';
import { arrayOf, object, func } from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import styles from './ProfileStyle';

const Profile = ({ user, colors, onVerify, reset }) => {
  const { email, displayName, school, registeredIdentity, subscribedCourses } = user;

  const EmptyCourses = () => {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyCoursesText}>You are not subscribed to any courses.</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, styles.centered]}>
      <View style={[styles.headerContainer, styles.centered]}>
        <View style={[styles.profilePictureContainer, styles.centered]}>
          <View style={styles.mockProfile} />
        </View>
        <View style={[styles.profileInfoContainer, styles.centered]}>
          <Text style={styles.userFullName}>{displayName}</Text>
          <Text style={styles.userEmail}>
            {email} - {school}
          </Text>
          <Text onPress={onVerify} style={registeredIdentity ? styles.verified : styles.notVerified}>
            {registeredIdentity ? 'Verified' : 'Press here to register identity to FRAA'}
          </Text>
          {registeredIdentity && <Text onPress={reset}>Press here to reset</Text>}
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
          {!subscribedCourses || subscribedCourses.length === 0 ? (
            <EmptyCourses />
          ) : (
            <>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContainer}>
                {subscribedCourses.map((item, key) => (
                  <View key={key} style={[styles.carouselItemStyle, colors[key]]}>
                    <View style={styles.courseContainer}>
                      <Text style={styles.courseName}>{item}</Text>
                      <Text style={styles.courseCode}>{item}</Text>
                      <Text style={styles.coursePercentage}>{item}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </>
          )}
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
  user: object.isRequired,
  colors: arrayOf(object).isRequired,
  onVerify: func.isRequired,
  reset: func.isRequired,
};

export default Profile;
