import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import {Product} from '../../types';

type ShowToastFunction = {
  type: 'success' | 'error' | 'info';
  text1: string;
  text2?: string;
};

export const showToast = ({type, text1, text2}: ShowToastFunction) => {
  Toast.show({
    type,
    text1,
    text2,
    text1Style: {fontSize: 16},
    text2Style: {fontSize: 12},
  });
};

export const Confirm = async (
  title: string,
  context?: string,
): Promise<boolean> => {
  return new Promise(resolve => {
    Alert.alert(title, context && context, [
      {text: 'OK', onPress: () => resolve(true), style: 'default'},
      {text: 'CANCEL', onPress: () => resolve(false), style: 'cancel'},
    ]);
  });
};
// export const Alert = async (
//   title: string,
//   context?: string,
// ): Promise<boolean> => {
//   return new Promise(resolve => {
//     Alert.alert(title, context && context, [
//       {text: 'OK', onPress: () => resolve(true), style: 'default'},
//       {text: 'CANCEL', onPress: () => resolve(false), style: 'cancel'},
//     ]);
//   });
// };

export const toogleState = (
  fn: (value: boolean) => void,
): {true: () => void; false: () => void} => {
  return {
    true: () => fn(true),
    false: () => fn(false),
  };
};
