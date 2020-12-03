import React, { useState } from 'react';
import { object } from 'prop-types';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import theme from '../../../theme';
import { resetRoute } from '../../../helpers/navigation';
import ROUTES from '../../../navigation/routes';

const LogoTutorial = require('../../../assets/tutorials-assets/LogoTutorial.png');
const CheckInTutorial = require('../../../assets/tutorials-assets/CheckInTutorialLogo.png');
const CalendarTutorial = require('../../../assets/tutorials-assets/CalendarLogoTutorial.png');
const StatisticsTutorial = require('../../../assets/tutorials-assets/StatisticsLogoTutorial.png');
const BackwardArrow = require('../../../assets/tutorials-assets/BackwardArrow.png');
const ForwardArrow = require('../../../assets/tutorials-assets/ForwardArrow.png');

const Tutorials = ({ navigation }) => {
  const [step, setStep] = useState(0);

  const imageSource = () => {
    switch (step) {
      case 0:
        return CheckInTutorial;
      case 1:
        return CalendarTutorial;
      case 2:
        return StatisticsTutorial;
      case 3:
        return LogoTutorial;
      default:
        return LogoTutorial;
    }
  };

  const renderText = () => {
    switch (step) {
      case 0:
        // eslint-disable-next-line max-len
        return 'Shows you the information of the closest\nupcoming/ongoing event \n&\nAllow checking attendance in just 2 steps';
      case 1:
        return 'Shows all of your events in your\nschool/company account and their details';
      case 2:
        return 'Keeps track of your attendance\nperformance with informative statistics';
      case 3:
        return 'And last but not least\nThank you for choosing us!';
      default:
        return 'Welcome!';
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return 'Check In';
      case 1:
        return 'Calendar';
      case 2:
        return 'Statistics';
      default:
        return '';
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const goNext = () => {
    if (step < 3 && step >= 0) {
      setStep(step + 1);
    } else {
      resetRoute(navigation, ROUTES.MAIN);
    }
  };

  return (
    <View style={[styles.container, styles.centered]}>
      {step !== 3 && <Text style={styles.skip}>Skip</Text>}
      <View style={[styles.tutorialBodyContainer, styles.centered]}>
        <Image source={imageSource()} style={styles.image} />
        <Text style={styles.tutorialStep}>{renderStep()}</Text>
        <Text style={styles.tutorialText}>{renderText()}</Text>
      </View>
      <View style={styles.btnRow}>
        {step > 0 && step < 3 && (
          <TouchableOpacity onPress={() => goBack()} style={[styles.btn, styles.centered]}>
            <Image source={BackwardArrow} style={styles.arrow} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
        {step >= 0 && step < 3 ? (
          <TouchableOpacity
            onPress={() => goNext()}
            style={[styles.btn, styles.raisedBtn, styles.redBtn, styles.centered]}>
            <Text style={styles.nextText}>Next</Text>
            <Image source={ForwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => goNext()}
            style={[styles.btn, styles.getStartedBtn, styles.raisedBtn, styles.redBtn, styles.centered]}>
            <Text style={styles.getStartedText}>GET STARTED</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

Tutorials.propTypes = {
  navigation: object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  skip: {
    position: 'absolute',
    top: 50,
    right: 25,
    fontWeight: '500',
    color: '#88888888',
    fontSize: 17,
  },
  tutorialBodyContainer: {
    position: 'absolute',
    top: 100,
  },
  image: {
    marginBottom: 50,
    height: 250,
    width: 200,
    resizeMode: 'contain',
  },
  tutorialStep: {
    fontWeight: '600',
    fontSize: 35,
    marginBottom: 20,
  },
  tutorialText: {
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 23,
  },
  btnRow: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  btn: {
    borderRadius: 67,
    height: 50,
    width: 140,
    flexDirection: 'row',
  },
  raisedBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  redBtn: {
    backgroundColor: theme.palette.primary.red,
  },
  backText: {
    marginLeft: 10,
  },
  nextText: {
    color: '#ffffff',
    marginRight: 10,
  },
  arrow: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  getStartedBtn: {
    width: 250,
  },
  getStartedText: {
    color: '#ffffff',
    fontWeight: '500',
  },
});

export default Tutorials;
