import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import axios from 'axios';
import { isEmail, stringIsEmpty } from '../../../../../helpers/utils';
import { openToast } from '../../../../../redux/reducers/ToastReducer';


