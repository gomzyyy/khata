import AsyncStorage from '@react-native-async-storage/async-storage';
import {SetStateAction} from 'react';
import {Platform} from 'react-native';
import {PLATFORM_SPECIFIED_CALLS} from '../../../enums';

export interface FetchReqPropType {
  route: string;
  method: string;
  reqType: 'r' | 'cud' | 'media';
  body?: any;
  secure?: boolean;
}

const header = {
  r: {},
  cud: {'Content-Type': 'application/json'},
  media: {},
};

const platformObj = {
  ios: PLATFORM_SPECIFIED_CALLS.MOBILE,
  android: PLATFORM_SPECIFIED_CALLS.MOBILE,
  macos: PLATFORM_SPECIFIED_CALLS.WEB_APP,
  windows: PLATFORM_SPECIFIED_CALLS.WEB_APP,
  web: PLATFORM_SPECIFIED_CALLS.WEB_APP,
};

export const APIheaders = async (
  secure: boolean,
  optType: 'r' | 'cud' | 'media',
) => {
  let token = null;
  if (secure) {
    token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Secure calls requires Access-Token!');
    }
    const headers = {...header[optType], Authorization: `Bearer ${token}`};
    return headers;
  } else {
    const headers = header[optType];
    return headers;
  }
};

const FetchAPI = async ({
  reqType,
  route,
  body,
  secure = true,
  method,
}: FetchReqPropType) => {
  try {
    const headers = await APIheaders(secure, reqType);
    const baseUrl = 'http://192.168.1.71:6900/api/app';
    const res = fetch(
      baseUrl + `${route}&platform=${platformObj[Platform.OS]}`,
      {
        method,
        headers,
        body,
      },
    );
    return res;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Internal server error',
    );
  }
};
function handleBooleanState(
  fn?: React.Dispatch<SetStateAction<boolean>>,
  state?: boolean,
) {
  if (fn && state !== undefined) {
    fn(state);
  }
  return;
}
export {FetchAPI, handleBooleanState};
