import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {back} from '../utils/nagivationUtils';
import {useTheme} from '../hooks/index';

type HeaderProps = {
  name?: string;
  showTitle?: boolean;
  titleColor?: string;
  headerBgColor?: string;
  backButtom?: boolean;
  menuButton?: boolean;
  customComponent?: boolean;
  renderItem?: React.ReactNode;
  customAction?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  name = '',
  showTitle = true,
  titleColor = '#000',
  headerBgColor,
  backButtom = false,
  menuButton = false,
  customComponent = false,
  renderItem = <></>,
  customAction = () => {},
}): React.JSX.Element => {
  const {currentTheme} = useTheme();
  const navigation = useNavigation();
  const openMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <View
      style={{
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        backgroundColor: headerBgColor ?? ''
      }}>
      {!backButtom && menuButton && (
        <Pressable style={styles.leftActionBtn} onPress={openMenu}>
          <Icon2 name="menu" size={24} color={titleColor} />
        </Pressable>
      )}
      {backButtom && !menuButton && (
        <Pressable style={styles.leftActionBtn} onPress={() => back()}>
          <Icon1 name="left" size={24} color={titleColor} />
        </Pressable>
      )}
      {showTitle && (
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: titleColor,
          }}>
          {name}
        </Text>
      )}
      {customComponent && (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={customAction}
          style={styles.rightCustomBtn}>
          {renderItem}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leftActionBtn: {
    position: 'absolute',
    left: 20,
  },
  rightCustomBtn: {
    position: 'absolute',
    right: 20,
  },
});

export default Header;
