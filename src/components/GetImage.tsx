import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {
  launchImageLibrary,
  launchCamera,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import {showToast} from '../service/fn';
import {
  RequestCameraPermissions,
  RequestMediaPermissions,
} from '../service/permissions';
import {useTheme} from '../hooks';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome';

type GetImageProps = {
  value: string | undefined;
  setState: Dispatch<SetStateAction<string | undefined>>;
  callback?: () => void;
  enabled?: boolean;
};

const GetImage: React.FC<GetImageProps> = ({
  value,
  setState,
  callback,
  enabled = true,
}): React.JSX.Element => {
  const {currentTheme} = useTheme();
  const getImageFromImageLiberary = async () => {
    const ok = await RequestMediaPermissions();
    if (!ok) return;
    const options: {mediaType: MediaType; quality: PhotoQuality} = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        return;
      } else if (res.errorMessage) {
        showToast({
          type: 'error',
          text1: res.errorMessage,
        });
      } else if (res.assets) {
        setState(res.assets[0].uri);
      } else {
        showToast({
          type: 'error',
          text1: 'An unknown Error occured!',
        });
        return;
      }
    });
  };

  const takePhotoWithCamera = async () => {
    const ok = await RequestCameraPermissions();
    if (!ok) return;
    const options: {mediaType: MediaType; quality: PhotoQuality} = {
      mediaType: 'photo',
      quality: 1,
    };
    launchCamera(options, res => {
      if (res.didCancel) {
        return;
      } else if (res.errorMessage) {
        showToast({
          type: 'error',
          text1: res.errorMessage,
        });
      } else if (res.assets) {
        setState(res.assets[0].uri);
      } else {
        showToast({
          type: 'error',
          text1: 'An unknown Error occured!',
        });
        return;
      }
    });
  };
  const handleOkButtom = () => callback && callback();
  const handleCancelButtom = () => {
    setState(undefined);
    callback && callback();
  };

  return (
    <View
      style={[styles.container, {backgroundColor: currentTheme.contrastColor}]}>
      {value && value.length !== 0 && (
        <>
          <TouchableOpacity onPress={handleOkButtom} style={styles.okContainer}>
            <Icon1 name="check" size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCancelButtom}
            style={styles.cancelContainer}>
            <Icon2 name="cross" size={26} />
          </TouchableOpacity>
        </>
      )}

      <View style={{alignItems: 'center', marginBottom: 6}}>
        {value && value.trim().length !== 0 && (
          <View style={styles.imageContainer}>
            <Image source={{uri: value}} height={100} width={100} />
          </View>
        )}
      </View>
      <View style={styles.getimageBtnContainer}>
        <TouchableOpacity
          onPress={() => enabled && getImageFromImageLiberary()}
          style={[styles.getImageBtn, {backgroundColor: currentTheme.bgColor}]}
          activeOpacity={0.7}>
          <Icon3 name="photo" size={16} color={currentTheme.baseColor} />
          <Text
            style={[styles.getImageBtnText, {color: currentTheme.baseColor}]}>
            Choose from gallary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => enabled && takePhotoWithCamera}
          style={[styles.getImageBtn, {backgroundColor: currentTheme.bgColor}]}
          activeOpacity={0.7}>
          <Icon1 name="camera" size={16} color={currentTheme.baseColor} />
          <Text
            style={[styles.getImageBtnText, {color: currentTheme.baseColor}]}>
            Take Photo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  imageContainer: {
    height: 104,
    width: 104,
    padding: 4,
    borderRadius: 52,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  okContainer: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  cancelContainer: {
    position: 'absolute',
    top: 24,
    left: 24,
  },
  getimageBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  getImageBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  getImageBtnText: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
});

export default GetImage;
