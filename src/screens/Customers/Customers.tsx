import {View, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import EmptyListMessage from './components/EmptyListMessage';
import SlideUpContainer from '../../components/SlideUpContainer';
import CreateCustomer from '../../components/CreateCustomer';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import Tab from './components/Tab';
import CreateButton from '../../components/CreateButton';
import SearchBar from './components/SearchBar';
import Header from '../../components/Header';
import {useAnalytics, useTheme} from '../../hooks';
import Icon from 'react-native-vector-icons/AntDesign';
import {useHaptics} from '../../hooks';
import { deviceHeight } from '../../utils/Constants';
import CreateUnknownPayment from '../../components/CreateUnknownPayment';
import { useTranslation } from 'react-i18next';

const Customers = () => {
  const {t} = useTranslation('customers')
  const {lightTap} = useHaptics();
  const {currentTheme} = useTheme();
  const [openCreateCustomer, setopenCreateCustomer] = useState<boolean>(false);
  const {customers} = useAnalytics();
  const handleCloseCreateCustomer = () => setopenCreateCustomer(false);
  const handleOpenCreateCustomer = () => {
    setopenCreateCustomer(true);
    lightTap();
  };
  return (
    <View style={{flex: 1, backgroundColor: currentTheme.baseColor}}>
      <Header
        name={t('header_title')}
        backButton={true}
        titleColor={currentTheme.header.textColor}
        customComponent={true}
        renderItem={
          <Icon name="plus" size={24} color={currentTheme.header.textColor} />
        }
        customAction={() => {
          setopenCreateCustomer(true);
          lightTap();
        }}
      />
      <View style={styles.contentContainer}>
        {!openCreateCustomer && (
          <CreateButton open={handleOpenCreateCustomer} />
        )}
        <View style={{flex: 1}}>
          <View style={styles.searchBarContainer}>
            <SearchBar
              textColor={currentTheme.header.textColor}
              enable={customers.length !== 0}
            />
          </View>
          {customers.length !== 0 ? (
            <FlatList
              data={[...customers].reverse()}
              keyExtractor={s => s._id}
              nestedScrollEnabled
              renderItem={({item}) => <Tab i={item} />}
              style={{flex: 1,paddingBottom:90}}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={{flex: 1}}>
              <EmptyListMessage textColor={currentTheme.header.textColor} />
            </View>
          )}
        </View>
      </View>
      {openCreateCustomer && (
        <SlideUpContainer
          open={openCreateCustomer}
          close={handleCloseCreateCustomer}
          height={deviceHeight * 0.58}
          // height= {deviceHeight * 0.82}
          >
            {/* <CreateUnknownPayment callback={handleCloseCreateCustomer} /> */}
          <CreateCustomer callback={handleCloseCreateCustomer} />
        </SlideUpContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {paddingVertical: 20},
  contentContainer: {flex: 1, paddingHorizontal: 10},
});

export default Customers;
