import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './ProfileStyle';

const Profile = () => {
  let items = [
    {
      name: 'Course 1',
      title: 'This is course 1.',
    },
    {
      name: 'Course 2',
      title: 'This is course 2.',
    },
    {
      name: 'Course 2',
      title: 'This is course 2.',
    },
  ];

  const randomColors = [
    {backgroundColor: '#7ae1aa'},
    {backgroundColor: '#fc9147'},
    {backgroundColor: '#fac800'},
  ];

  return (
    <View style={[styles.container, styles.centered]}>
      <View style={[styles.headerContainer, styles.centered]}>
        <View style={[styles.profilePictureContainer, styles.centered]}>
          <View style={styles.mockProfile} />
        </View>
        <View style={[styles.profileInfoContainer, styles.centered]}>
          <Text style={styles.userFullName}>Nguyen Tuan Loc</Text>
          <Text style={styles.userEmail}>s3695769@rmit.edu.vn</Text>
          <Text style={styles.error}>
            You must register your identity to use FRAA
          </Text>
        </View>
        <View style={[styles.profileStatisticsContainer, styles.centeredRow]}>
          <View style={[styles.statisticsColumn, styles.rightBorder]}>
            <Text style={styles.statisticsNumber}>100</Text>
            <Text style={styles.statisticsTitle}>Check In</Text>
          </View>
          <View style={styles.statisticsColumn}>
            <Text style={styles.statisticsNumber}>5</Text>
            <Text style={styles.statisticsTitle}>Missed</Text>
          </View>
        </View>
      </View>
      <View style={[styles.bodyContainer, styles.centered]}>
        <View style={styles.bodyChildContainer}>
          <Text style={styles.fixedText}>Courses</Text>
          <ScrollView
            horizontal={true}
            showHorizontalScrollIndicator={false}
            contentContainerStyle={styles.centered}
            style={[styles.carousel]}>
            {items.map((item, key) => (
              <View
                key={key}
                style={[styles.carouselItemStyle, randomColors[key]]}>
                <View style={{position: 'absolute', top: 7, left: 10}}>
                  <Text style={styles.courseName}>{item.name}</Text>
                  <Text style={styles.courseCode}>{item.title}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.bodyChildContainer} />
      </View>
    </View>
  );
};

export default Profile;
