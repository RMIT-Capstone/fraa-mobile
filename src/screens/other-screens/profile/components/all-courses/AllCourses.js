import React from 'react';
import { object, number } from 'prop-types';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';

const AllCourses = ({
  route: {
    params: { courses },
  },
}) => {
  const Course = ({ course, index }) => {
    const colors = [{ backgroundColor: '#7ae1aa' }, { backgroundColor: '#fc9147' }, { backgroundColor: '#fac800' }];

    const { name, lecturer, code, school } = course;
    const courseName = name.map((item) => item.toUpperCase()).join('\n');
    return (
      <View style={[styles.courseContainer, colors[index]]}>
        <Text style={[styles.courseText, styles.courseName]}>{courseName}</Text>
        <Text style={[styles.courseText, styles.courseLecturer]}>{lecturer}</Text>
        <Text style={[styles.courseText, styles.courseCode]}>
          {code} - {school}
        </Text>
      </View>
    );
  };

  Course.propTypes = {
    course: object.isRequired,
    index: number.isRequired,
  };

  return (
    <View style={styles.container}>
      {courses.map((course, index) => (
        <Course course={course} index={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  courseContainer: {
    width: '47%',
    position: 'relative',
    height: 200,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
  },
  courseText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  courseName: {
    top: 10,
    left: 15,
    marginBottom: 15,
  },
  courseLecturer: {
    left: 15,
  },
  courseCode: {
    position: 'absolute',
    right: 15,
    bottom: 10,
  },
});

AllCourses.propTypes = {
  route: object.isRequired,
};

export default AllCourses;
