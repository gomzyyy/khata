import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {BusinessOwner} from '../../../../types';
const NoProfile = require('../../../assets/images/no-profile.jpg');
import {useTheme} from '../../../hooks/index';
import Icon from 'react-native-vector-icons/AntDesign';
import GetImage from '../../../components/GetImage';
import SlideUpContainer from '../../../components/SlideUpContainer';

type OwnerInfoProps = {
  owner: BusinessOwner;
  secure?: boolean;
  profileImageValue?: string | undefined;
  setProfileImageValue?: Dispatch<SetStateAction<string | undefined>>;
};

const OwnerInfo: React.FC<OwnerInfoProps> = ({
  owner,
  secure = false,
  profileImageValue,
  setProfileImageValue = () => {},
}): React.JSX.Element => {
  const {currentTheme} = useTheme();
  const [openImagePicker, setOpenImagePicker] = useState<boolean>(false);
  const handleCloseImagePicker = () => setOpenImagePicker(false);
  const handleOpenImagePicker = () => {
    if (secure) return;
    setOpenImagePicker(true);
  };

  return (
    <View
      style={[
        styles.ownerInfoParentContainer,
        {backgroundColor: currentTheme.contrastColor},
      ]}>
      <Pressable
        style={styles.profileImageContainer}
        onPress={handleOpenImagePicker}>
        {!secure && (
          <View style={styles.editIcon}>
            <Icon name="edit" size={16} color={currentTheme.baseColor} />
          </View>
        )}
        <Image
          source={
            profileImageValue && profileImageValue.trim().length !== 0
              ? {uri: profileImageValue}
              : NoProfile
          }
          style={styles.profileImage}
        />
      </Pressable>
      <View style={styles.ownerInfoContainer}>
        <Text style={[styles.name, {color: currentTheme.baseColor}]}>
          {owner.name}
        </Text>
        <View style={styles.phoneNumberContainer}>
          <Icon name="mobile1" color={currentTheme.baseColor} size={12} />
          <Text style={[styles.phoneNumber, {color: currentTheme.baseColor}]}>
            :{' '}
            {owner.phoneNumber
              ? secure
                ? `+91-${owner.phoneNumber?.slice(0, 5)}*****`
                : `+91-${owner.phoneNumber}`
              : 'N/A'}
          </Text>
        </View>
      </View>
      <SlideUpContainer
        open={openImagePicker}
        close={handleCloseImagePicker}
        opacity={0.2}>
        <GetImage
          value={profileImageValue}
          setState={setProfileImageValue}
          callback={handleCloseImagePicker}
        />
      </SlideUpContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  ownerInfoParentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
  },
  profileImageContainer: {
    height: 90,
    width: 90,
    borderRadius: 45,
    elevation: 10,
  },
  editIcon: {position: 'absolute', zIndex: 20, right: 0, bottom: 0},
  profileImage: {
    height: '100%',
    width: 'auto',
    resizeMode: 'cover',
    borderRadius: 45,
  },
  ownerInfoContainer: {
    justifyContent: 'center',
    gap: 6,
  },
  name: {
    fontSize: 30,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneNumber: {fontSize: 16, textAlignVertical: 'center'},
});

export default OwnerInfo;
