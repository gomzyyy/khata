import {View, StyleSheet, Pressable, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {useRoute} from '@react-navigation/native';
import {Customer as CustomerType} from '../../../types';
import Icon from 'react-native-vector-icons/AntDesign';
import {ToogleButton} from './components/Tab';
import {ProductsByDate} from '../../components/shared/ProductByDate';
import CustomerInfo from './components/CustomerInfo';
import EmptyListMessage from '../../components/EmptyListMessage';
import SlideUpContainer from '../../components/SlideUpContainer';
import AddUdhar from './components/AddUdhar';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {toogleState} from '../../service/fn';
import {useTheme} from '../../hooks/index';
import {useHaptics} from '../../hooks/index';

type RouteParams = {
  customer: CustomerType;
};
const Customer = () => {
  const {lightTap} = useHaptics();
  const {currentTheme} = useTheme();
  const params = useRoute().params;
  const {customer} = params as RouteParams;
  const customers = useSelector(
    (s: RootState) => s.shopkeeper.shopkeeper.customers,
  );
  const findCustomer = (): CustomerType | undefined => {
    const c: CustomerType | undefined =
      customer && customers.find(s => s.id === customer.id);
    return c;
  };
  const [content, setContent] = useState<'PAID' | 'UNPAID'>('UNPAID');
  const [addUdhar, setAddUdhar] = useState<boolean>(false);
  const [currCustomer, setCurrCustomer] = useState<CustomerType>(customer);

  useEffect(() => {
    const currentCustomer = findCustomer();
    if (currentCustomer) {
      setCurrCustomer(currentCustomer);
    }
  }, [customers]);

  const toogleToPaid = () => {
    setContent('UNPAID');
    lightTap();
  };
  const toogleToUnPaid = () => {
    setContent('PAID');
    lightTap();
  };

  const AddUdharIcon = (): React.JSX.Element => {
    return (
      <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
        <Icon name="plus" color={currentTheme.header.textColor} size={20} />
        <Text style={{fontSize: 16, color: currentTheme.header.textColor}}>
          Add
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.parent}>
      <Header
        name={`${currCustomer.name}`}
        backButtom
        customComponent={content === 'UNPAID'}
        renderItem={<AddUdharIcon />}
        customAction={toogleState(setAddUdhar).true}
        headerBgColor={currentTheme.baseColor}
        titleColor={currentTheme.header.textColor}
      />
      <View
        style={[
          styles.contentContainer,
          {backgroundColor: currentTheme.baseColor},
        ]}>
        <CustomerInfo customer={currCustomer} />
        <View style={styles.contentToggleContainer}>
          <Pressable onPress={toogleToPaid} style={{flex: 1}}>
            <ToogleButton
              title="Pending Payments"
              textColor={currentTheme.contrastColor}
              border={content === 'UNPAID'}
              borderColor={currentTheme.contrastColor}
            />
          </Pressable>
          <Pressable onPress={toogleToUnPaid} style={{flex: 1}}>
            <ToogleButton
              title="Paid Payments"
              textColor={currentTheme.contrastColor}
              border={content === 'PAID'}
              borderColor={currentTheme.contrastColor}
            />
          </Pressable>
        </View>
        <View style={styles.dataContainer}>
          {content === 'UNPAID' ? (
            currCustomer.unpaidPayments &&
            currCustomer.unpaidPayments.length !== 0 ? (
              <ProductsByDate
                customer={currCustomer}
                ArrWithDate={currCustomer.unpaidPayments}
                onTabPressNavigate="UnpaidUdhars"
              />
            ) : (
              <EmptyListMessage
                title="HURRAY! No Pending Payments."
                textColor={currentTheme.contrastColor}
              />
            )
          ) : currCustomer.paidPayments &&
            currCustomer.paidPayments.length !== 0 ? (
            <ProductsByDate
              customer={currCustomer}
              ArrWithDate={currCustomer.paidPayments}
              onTabPressNavigate="PaidUdhars"
            />
          ) : (
            <EmptyListMessage
              title="Oops! No Paid Payments."
              textColor={currentTheme.contrastColor}
            />
          )}
        </View>
      </View>
      <SlideUpContainer open={addUdhar} close={toogleState(setAddUdhar).false}>
        <AddUdhar
          close={toogleState(setAddUdhar).false}
          customer={currCustomer}
        />
      </SlideUpContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {flex: 1},
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  customerInfoContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    height: 90,
    width: 90,
    overflow: 'hidden',
    borderRadius: '50%',
    backgroundColor: 'red',
  },
  profileImage: {
    height: '100%',
    width: 'auto',
    resizeMode: 'contain',
  },
  contentToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    marginTop: 20,
    gap: 10,
  },
  toogleBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentToggleBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  dataContainer: {
    marginTop: 20,
  },
});

export default Customer;
