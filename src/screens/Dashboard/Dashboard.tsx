import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import DashboardHeader from '../../components/DashboardHeader';
import {navigate} from '../../utils/nagivationUtils';
import {useTheme} from '../../hooks/index';
import PressableContainer from './components/PressableContainer';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/Entypo';
import WeeklySalesInfoGraph from './components/WeeklySalesInfoGraph';
import TodayBestSellerInfoGraph from './components/TodayBestSellerInfoGraph';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {useTranslation} from 'react-i18next';
import SlideUpContainer from '../../components/SlideUpContainer';
import QueryContainer from './components/QueryContainer';
import NotVerifiedAlert from './components/animated/NotVerifiedAlert';
import OpenMenuButton from './components/animated/OpenMenuButton';
import {useSocket} from '../../hooks/index';
import DropDownMenu, {
  DropDownOptionsType,
} from './components/animated/DropDownMenu';

const Dashboard = () => {
  const {t} = useTranslation('dashboard');

  const {socket} = useSocket();

  const DashboardOptions = [
    {
      id: 0,
      title: t('d_options_inventory'),
      navigateTo: 'MyInventory',
      icon: (color: string) => (
        <Icon3 name="codepen-circle" size={24} color={color} />
      ),
    },

    {
      id: 1,
      title: t('d_options_analytics'),
      navigateTo: 'Analytics',
      icon: (color: string) => (
        <Icon2 name="analytics" size={24} color={color} />
      ),
    },
    {
      id: 3,
      title: t('d_options_employees'),
      navigateTo: 'Employees',
      icon: (color: string) => (
        <Icon name="people-sharp" size={24} color={color} />
      ),
    },
    {
      id: 4,
      title: t('d_options_customers'),
      navigateTo: 'Customers',
      icon: (color: string) => (
        <Icon name="people-sharp" size={24} color={color} />
      ),
    },
  ];

  const {currentTheme} = useTheme();
  const [openRequestPayment, setOpenRequestPayment] = useState<boolean>(false);
  const [openQuery, setOpenQuery] = useState<boolean>(false);
  const [overScrolled, setOverScrolled] = useState<boolean>(false);
  const user = useSelector((s: RootState) => s.appData.user)!;
  const [payableAmount, setPayableAmount] = useState<number>(0);
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const closeDropDown = () => setOpenDropDown(false);

  const closeQuery = () => {
    setOpenQuery(false);
  };

  useEffect(() => {
    socket?.on('getOnlineUsers', d => console.log(d));
  }, [socket]);

  const dropDownOptions: DropDownOptionsType[] = [
    {
      id: 0,
      name: 'Run A Query',
      navigateTo: undefined,
      icon: (color: string = '#000', size: number = 16) => (
        <Icon6 color={color} name="code" size={size} />
      ),
      onPress: (cb?: () => void) => cb && cb(),
      callback: () => setOpenQuery(true),
    },
    {
      id: 1,
      name: 'Help',
      navigateTo: 'Settings',
      icon: (color: string = '#000', size: number = 16) => (
        <Icon1 color={color} name="help-circle" size={size} />
      ),
      onPress: cb => {
        cb && cb();
      },
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: currentTheme.baseColor}}>
      <OpenMenuButton open={overScrolled} />
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          setOverScrolled(e.nativeEvent.contentOffset.y > 70);
          openDropDown && setOpenDropDown(false);
        }}>
        <Header
          name={t('header_title')}
          menuButton
          titleColor={currentTheme.header.textColor}
          customComponent={true}
          renderItem={
            <Icon5
              name="more-vert"
              size={26}
              color={currentTheme.contrastColor}
            />
          }
          customAction={() => setOpenDropDown(!openDropDown)}
        />
        {openDropDown && (
          <DropDownMenu
            visible={openDropDown}
            close={closeDropDown}
            dropDownOptions={dropDownOptions}
            top={60}
            right={10}
          />
        )}
        <Pressable
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            paddingHorizontal: 6,
            paddingVertical: 2,
            alignSelf: 'center',
            marginBottom: 6,
          }}
          onPress={() => navigate('Test')}>
          <Text
            style={{
              color: currentTheme.baseColor,
              fontSize: 16,
              fontWeight: '600',
            }}>
            Test UI
          </Text>
        </Pressable>
        {!user.email?.verified && <NotVerifiedAlert />}
        <View style={styles.contentContainer}>
          <DashboardHeader
            flex={false}
            searchBarPressAction={() => navigate('SearchFeatures')}
          />
          <View style={{paddingHorizontal: 10}}>
            <View
              style={{
                backgroundColor: currentTheme.contrastColor,
                paddingBottom: 10,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}>
              <View style={styles.navigationBtnsContainer}>
                {DashboardOptions.map(s => (
                  <PressableContainer
                    navigateTo={s.navigateTo}
                    title={s.title}
                    key={s.id}>
                    {s.icon(currentTheme.header.textColor)}
                  </PressableContainer>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.graphContainer}>
            <Text
              style={[styles.graphLabel, {color: currentTheme.contrastColor}]}>
              {t('d_todaybestseller_title')}
            </Text>
            <TodayBestSellerInfoGraph />
          </View>
          <View style={styles.graphContainer}>
            <Text
              style={[styles.graphLabel, {color: currentTheme.contrastColor}]}>
              {t('d_weeklysalesinfograph_title')}
            </Text>
            <WeeklySalesInfoGraph />
          </View>
          <SlideUpContainer open={openQuery} close={closeQuery}>
            <QueryContainer close={closeQuery} />
          </SlideUpContainer>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingBottom: 90,
  },
  navigationBtnsContainer: {
    alignItems: 'flex-start',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: 10,
  },
  inputText: {
    borderWidth: 2,
    borderRadius: 8,
    height: 50,
    fontSize: 18,
    paddingHorizontal: 12,
    marginTop: 30,
  },
  graphContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  graphLabel: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Dashboard;

{
  /* <SlideUpContainer
        open={openQRCode}
        close={handleCloseQRCode}
        opacity={0.6}
        height={deviceHeight * 0.5}>
        <ScanQRToPay
          cancel={handleCloseQRCode}
          callback={() => {}}
          currency={currency}
          pa="gomzydhingra0001@okhdfcbank"
          pn="Khata App"
          payableAmount={payableAmount}
        />
      </SlideUpContainer> */
}
