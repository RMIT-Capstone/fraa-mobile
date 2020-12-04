import React from 'react';
import { arrayOf, object, func, bool } from 'prop-types';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import styles from './ProfileStyle';
import SettingsPopUp from './components/settings-popup/SettingsPopup';

const ProfileMoreIcon = require('../../../assets/ProfileMoreIcon.png');

const Profile = ({ user, colors, onVerify, reset, showSettings, setShowSettings }) => {
  const { email, displayName, school, registeredIdentity, subscribedCourses } = user;

  const EmptyCourses = () => (
    <View style={styles.centered}>
      <Text style={styles.emptyCoursesText}>You are not subscribed to any courses.</Text>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => setShowSettings(false)} style={[styles.container, styles.centered]}>
      <View>
        <View style={[styles.header, styles.centered]}>
          <Text style={styles.headerText}>Account</Text>
          <TouchableOpacity onPress={() => setShowSettings(true)} style={styles.fixedIconWrapper}>
            <Image source={ProfileMoreIcon} style={styles.fixedIcon} />
          </TouchableOpacity>
        </View>
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
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.carouselContainer}>
                  {subscribedCourses.map((item, key) => (
                    <View key={item} style={[styles.carouselItemStyle, colors[key]]}>
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
        <SettingsPopUp showSettings={showSettings} setShowSettings={setShowSettings} email={user.email} />
      </View>
    </TouchableWithoutFeedback>
  );
};

Profile.propTypes = {
  user: object.isRequired,
  colors: arrayOf(object).isRequired,
  onVerify: func.isRequired,
  reset: func.isRequired,
  showSettings: bool.isRequired,
  setShowSettings: func.isRequired,
};

export default Profile;
