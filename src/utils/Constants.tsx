import {Dimensions} from 'react-native';
import {AppTheme} from '../../types';
import {AppThemeName} from '../../enums';

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;
export const defaultProfileImage = `https://res.cloudinary.com/dgki5gnzf/image/upload/v1739970302/no-profile_jfwlyo.jpgno-profile_jfwlyo`;

export const dashboardHeaderTabs = [
  {name: 'This Month', data: {amount: '18273'}},
  {name: 'Today', data: {amount: '1297'}},
];
export const customerHeaderTabs = [
  {name: 'This Month', data: {amount: '18273'}},
  {name: 'Today', data: {amount: '1297'}},
];

export const Theme: AppTheme[] = [
  {
    name: AppThemeName.PURPLE,
    baseColor: '#7f017f',
    fadeColor: 'rgba(127, 1, 127,0.6)',
    tabColor: '#b200b2',
    borderColor: '#fff',
    textColor: '#fff',
    contrastColor: '#fff',
    bgColor: '#ffeaff',
    textAlt: '#000',
    bottomTabBg:'rgba(127, 1, 127,0.4)',
    modal: {
      title: '#000',
      inputbg: '#fff',
      inputBorder: '#7f017f',
      inputText: '#000',
      pickerbg: '#ffeaff',
      pickerText: '#000',
      saveBtnbg: '#7f017f',
      saveBtnText: '#fff',
    },
    toggleBtn: {
      bgActive: '#b200b2',
      bgInactive: '#fff',
      textActive: '#fff',
      textInactive: '#000',
    },
    tab: {
      label: '#7f017f',
      bg: '#fff',
      value: '#7f017f',
      btnBg: '#7f017f',
      btnText: '#fff',
      icon: '#7f017f',
      text: '#fff',
    },
    header: {textColor: '#fff'},
  },
  {
    name: AppThemeName.RED,
    baseColor: '#d60000',
    fadeColor: '#ff8080',
    tabColor: '#ff6666',
    borderColor: '#fff',
    textColor: '#000',
    contrastColor: '#fff',
    bgColor: '#ffe6e6',
    textAlt: '#000',
    bottomTabBg:'rgba(214, 0, 0,0.4)',
    modal: {
      title: '#000',
      inputbg: '#fff',
      inputBorder: '#d60000',
      inputText: '#000',
      pickerbg: '#ffe6e6',
      pickerText: '#000',
      saveBtnbg: '#d60000',
      saveBtnText: '#fff',
    },
    toggleBtn: {
      bgActive: '#ff6666',
      bgInactive: '#fff',
      textActive: '#fff',
      textInactive: '#000',
    },
    tab: {
      label: '#d60000',
      bg: '#fff',
      value: '#d60000',
      btnBg: '#d60000',
      btnText: '#fff',
      icon: '#d60000',
      text: '#fff',
    },
    header: {textColor: '#fff'},
  },
  {
    name: AppThemeName.YELLOW,
    baseColor: '#ffc107',
    fadeColor: '#ffecb3',
    tabColor: '#ffeb99',
    borderColor: '#000',
    textColor: '#000',
    contrastColor: '#fff',
    bgColor: '#fff8e1',
    textAlt: '#000',
    bottomTabBg:'rgba(255, 193, 7,0.4)',
    modal: {
      title: '#000',
      inputbg: '#fff',
      inputBorder: '#ffc107',
      inputText: '#000',
      pickerbg: '#fff8e1',
      pickerText: '#000',
      saveBtnbg: '#ffc107',
      saveBtnText: '#fff',
    },
    toggleBtn: {
      bgActive: '#ffeb99',
      bgInactive: '#fff',
      textActive: '#000',
      textInactive: '#000',
    },
    tab: {
      label: '#ffc107',
      bg: '#fff',
      value: '#ffc107',
      btnBg: '#ffc107',
      btnText: '#fff',
      icon: '#ffc107',
      text: '#fff',
    },
    header: {textColor: '#fff'},
  },
  {
    name: AppThemeName.GREEN,
    baseColor: '#9ec378',
    fadeColor: 'rgba(158,195,120,0.6)',
    tabColor: 'rgba(158,195,120,0.6)',
    borderColor: '#000000',
    textColor: '#000',
    contrastColor: '#fff',
    bgColor: '#e6ffe6',
    textAlt: '#000',
    bottomTabBg:'rgba(158, 195, 120,0.4)',
    modal: {
      title: '#000',
      inputbg: '#fff',
      inputBorder: '#9ec378',
      inputText: '#000',
      pickerbg: '#e6ffe6',
      pickerText: '#000',
      saveBtnbg: '#9ec378',
      saveBtnText: '#fff',
    },
    toggleBtn: {
      bgActive: 'rgba(158,195,120,0.6)',
      bgInactive: '#fff',
      textActive: '#000',
      textInactive: '#000',
    },
    tab: {
      label: '#9ec378',
      bg: '#fff',
      value: '#9ec378',
      btnBg: '#9ec378',
      btnText: '#fff',
      icon: '#9ec378',
      text: '#fff',
    },
    header: {textColor: '#fff'},
  },
  {
    name: AppThemeName.BLUE,
    baseColor: '#007bff',
    fadeColor: '#80bfff',
    tabColor: '#66b2ff',
    borderColor: '#fff',
    textColor: '#000',
    contrastColor: '#fff',
    bgColor: '#e6f2ff',
    textAlt: '#000',
    bottomTabBg:'rgba(0, 123, 255,0.4)',
    modal: {
      title: '#000',
      inputbg: '#fff',
      inputBorder: '#007bff',
      inputText: '#000',
      pickerbg: '#e6f2ff',
      pickerText: '#000',
      saveBtnbg: '#007bff',
      saveBtnText: '#fff',
    },
    toggleBtn: {
      bgActive: '#66b2ff',
      bgInactive: '#fff',
      textActive: '#fff',
      textInactive: '#000',
    },
    tab: {
      label: '#007bff',
      bg: '#fff',
      value: '#007bff',
      btnBg: '#007bff',
      btnText: '#000',
      icon: '#007bff',
      text: '#fff',
    },
    header: {textColor: '#fff'},
  },
  {
    name: AppThemeName.CORAL,
    baseColor: '#ff6f61',
    fadeColor: '#ffb3a7',
    tabColor: '#ff9478',
    borderColor: '#fff',
    textColor: '#fff',
    contrastColor: '#fff',
    bgColor: '#fff3f0',
    textAlt: '#000',
    bottomTabBg:'rgba(255, 111, 97,0.4)',
    modal: {
      title: '#000',
      inputbg: '#fff',
      inputBorder: '#ff6f61',
      inputText: '#000',
      pickerbg: '#fff3f0',
      pickerText: '#000',
      saveBtnbg: '#ff6f61',
      saveBtnText: '#fff',
    },
    toggleBtn: {
      bgActive: '#ff6f61',
      bgInactive: '#fff',
      textActive: '#fff',
      textInactive: '#000',
    },
    tab: {
      label: '#ff6f61',
      bg: '#fff',
      value: '#ff6f61',
      btnBg: '#ff6f61',
      btnText: '#fff',
      icon: '#ff6f61',
      text: '#fff',
    },
    header: {textColor: '#fff'},
  },
];
export const colors = {
  danger: 'rgb(255,0,0)',
  dangerFade: 'rgba(255,0,0,0.2)',
  oliveGreen:'rgb(158, 195, 120)',
  oliveGreenFade:'rgba(158, 195, 120,0.2)',
  iconBlack: 'rgb(0,0,0)',
  link: '#007bff',
};
