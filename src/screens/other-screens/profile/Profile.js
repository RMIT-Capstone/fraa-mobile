import React from 'react';
import { arrayOf, object, func, bool } from 'prop-types';
import { View, Text, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import styles from './ProfileStyle';
import SettingsPopUp from './components/settings-popup/SettingsPopup';

const ProfileMoreIcon = require('../../../assets/ProfileMoreIcon.png');
const Logo = require('../../../assets/logo/RN_LOGO.png');

const Profile = ({
  user,
  coursesInfo,
  refreshing,
  colors,
  onVerify,
  reset,
  refetchUser,
  showSettings,
  setShowSettings,
  registeredLocally,
}) => {
  const { email, displayName, school, subscribedCourses, missedSessions, totalSessions, totalAttendedSessions } = user;

  const EmptyCourses = () => (
    <View style={styles.centered}>
      <Text style={styles.emptyCoursesText}>You are not subscribed to any courses.</Text>
    </View>
  );

  const renderRefreshControl = () => (
    <RefreshControl refreshing={refreshing} onRefresh={refetchUser} style={styles.scrollView} />
  );

  return (
    <View style={[styles.container, styles.centered]}>
      <View style={[styles.header, styles.centered]}>
        <Text style={styles.headerText}>Account</Text>
        <TouchableOpacity onPress={() => setShowSettings(true)} style={styles.fixedIconWrapper}>
          <Image source={ProfileMoreIcon} style={styles.fixedIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView refreshControl={renderRefreshControl()}>
          <View>
            <View style={[styles.centered]}>
              <Image source={Logo} style={styles.mockProfile} />
            </View>
            <View style={styles.centered}>
              <Text style={styles.userFullName}>{displayName}</Text>
              <Text style={styles.userEmail}>
                {email} - {school}
              </Text>
              <View style={styles.centeredRow}>
                <Text onPress={onVerify} style={registeredLocally ? styles.verified : styles.notVerified}>
                  {registeredLocally ? 'Verified' : 'Press here to register identity to FRAA'}
                </Text>
              </View>
            </View>
            <View style={styles.centeredRow}>
              <View style={[styles.profileStatisticsColumn, styles.rightBorder]}>
                <Text style={styles.profileStatisticsNumber}>{totalAttendedSessions}</Text>
                <Text style={styles.profileStatisticsTitle}>Check In</Text>
              </View>
              <View style={styles.profileStatisticsColumn}>
                <Text style={styles.profileStatisticsNumber}>{missedSessions}</Text>
                <Text style={styles.profileStatisticsTitle}>Missed</Text>
              </View>
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.fixedText}>Courses</Text>
              {!subscribedCourses || subscribedCourses.length === 0 ? (
                <EmptyCourses />
              ) : (
                <>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.carouselContainer}>
                    {coursesInfo.map((course, key) => {
                      const { name, code, id } = course;
                      return (
                        <View key={id} style={[styles.carouselItemStyle, colors[key]]}>
                          <View style={styles.courseContainer}>
                            <Text style={styles.courseName}>{name.join(' ').toUpperCase()}</Text>
                            <Text style={styles.courseCode}>{code}</Text>
                            <Text style={styles.coursePercentage}>90%</Text>
                          </View>
                        </View>
                      );
                    })}
                  </ScrollView>
                </>
              )}
            </View>
            <View>
              <Text style={styles.fixedText}>Statistics</Text>
              <View style={[styles.profileStatisticsContainer, styles.centeredRow]}>
                <View style={[styles.circle, styles.centered]}>
                  <Text style={styles.greenText}>{`${totalAttendedSessions} / ${totalSessions}`}</Text>
                  <Text>attended</Text>
                </View>
                <Text style={styles.greenText}>Well Done!</Text>
              </View>
            </View>
          </View>
          <SettingsPopUp showSettings={showSettings} setShowSettings={setShowSettings} email={user.email} />
        </ScrollView>
        {registeredLocally && (
          <Text style={styles.reset} onPress={reset}>
            Reset
          </Text>
        )}
      </View>
    </View>
  );
};

Profile.propTypes = {
  user: object.isRequired,
  coursesInfo: arrayOf(object).isRequired,
  refreshing: bool.isRequired,
  colors: arrayOf(object).isRequired,
  onVerify: func.isRequired,
  reset: func.isRequired,
  refetchUser: func.isRequired,
  showSettings: bool.isRequired,
  setShowSettings: func.isRequired,
  registeredLocally: bool.isRequired,
};

export default Profile;
