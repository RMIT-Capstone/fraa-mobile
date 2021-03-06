import React from 'react';
import { connect } from 'react-redux';
import { func, bool, string } from 'prop-types';
import axios from 'axios';
import { Modal, Dimensions, FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../../../theme';
import { resetUser } from '../../../../../redux/reducers/UserReducer';
import { navigateTo } from '../../../../../helpers/navigation';
import ROUTES from '../../../../../navigation/routes';
import { GENERATE_OTP_API } from '../../../../../constants/ApiEndpoints';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../../../../redux/reducers/ToastReducer';
import { removeRegisteredImage } from '../../../../../helpers/model';
import { removeAsyncStorageData } from '../../../../../helpers/async-storage';

const windowWidth = Dimensions.get('window').width;

const SettingsPopUp = ({
  showSettings,
  setShowSettings,
  email,
  registeredLocally,
  handleResetUser,
  handleOpenToast,
}) => {
  const navigation = useNavigation();

  const OPTIONS = [
    {
      id: '0',
      title: 'About',
    },
    {
      id: '1',
      title: 'Change Password',
    },
    {
      id: '2',
      title: 'Remove & Update Identity',
    },
    {
      id: '3',
      title: 'Logout',
    },
  ];

  const generateOTP = async () => {
    try {
      const {
        data: { error },
      } = await axios.post(GENERATE_OTP_API, { email });
      if (error) {
        handleOpenToast(TOAST_TYPES.ERROR, 'Error generate OTP!', TOAST_POSITIONS.BOTTOM, 2000);
      } else {
        handleOpenToast(TOAST_TYPES.SUCCESS, 'OTP code sent!', TOAST_POSITIONS.BOTTOM, 2000);
      }
    } catch (errorGenerateOTP) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error generate OTP!', TOAST_POSITIONS.BOTTOM, 2000);
    }
  };

  const onPress = async (option) => {
    if (option === 'About') {
      setShowSettings(false);
      handleOpenToast(TOAST_TYPES.INFO, 'Work in progress...', TOAST_POSITIONS.TOP, 1000);
    } else if (option === 'Change Password') {
      setShowSettings(false);
      navigateTo(navigation, ROUTES.FORGOT_PASSWORD, { fromProfile: true, email });
      await generateOTP();
    } else if (option === 'Remove & Update Identity') {
      setShowSettings(false);
      if (registeredLocally) {
        await removeRegisteredImage();
        navigateTo(navigation, ROUTES.CAMERA, { fromHome: true });
      } else {
        handleOpenToast(TOAST_TYPES.INFO, 'No identity registered!', TOAST_POSITIONS.BOTTOM, 1000);
      }
    } else {
      await removeAsyncStorageData('fbToken');
      handleResetUser();
    }
  };

  /* eslint-disable react/prop-types */
  const Item = ({ item }) => {
    const { title } = item;
    return (
      <TouchableOpacity onPress={() => onPress(title)} style={[styles.item, styles.centered]}>
        <Text style={item.title === 'Logout' ? styles.logoutText : styles.optionsText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const renderOptions = ({ item }) => <Item item={item} />;

  return (
    <Modal animation="fade" transparent visible={showSettings} onRequestClose={() => setShowSettings(false)}>
      <TouchableOpacity onPress={() => setShowSettings(false)} style={styles.topTouchable} />
      <View style={styles.bottomTouchable}>
        <FlatList data={OPTIONS} renderItem={renderOptions} keyExtractor={(item) => item.id} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTouchable: {
    flex: 3,
    marginTop: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  bottomTouchable: {
    width: windowWidth,
    backgroundColor: '#fff',
  },
  item: {
    height: 50,
    width: windowWidth,
    borderTopWidth: 0.2,
    borderTopColor: '#444444',
  },
  optionsText: {
    fontWeight: '500',
  },
  logoutText: {
    color: theme.palette.primary.red,
    fontWeight: '500',
  },
});

SettingsPopUp.propTypes = {
  showSettings: bool.isRequired,
  email: string.isRequired,
  registeredLocally: bool.isRequired,
  setShowSettings: func.isRequired,
  handleResetUser: func.isRequired,
  handleOpenToast: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleResetUser: () => dispatch(resetUser()),
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(null, mapDispatchToProps)(SettingsPopUp);
