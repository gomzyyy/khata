import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Customer, SoldProduct} from '../../../../types';
import {deviceHeight} from '../../../utils/Constants';
import {useAnalytics, useTheme} from '../../../hooks';
import {RootState} from '../../../../store/store';
import {useSelector} from 'react-redux';
import PayButton from '../../../components/PayButton';
import SlideUpContainer from '../../../components/SlideUpContainer';
import ConfirmPayment from '../../../components/ConfirmPayment';
import {TouchableOpacity} from 'react-native';
import EmptyListMessage from '../../../components/EmptyListMessage';
import {back} from '../../../utils/nagivationUtils';
import CustomerInfo from './CustomerInfo';
import Tab from './Tab';
import Icon from 'react-native-vector-icons/AntDesign';
import ScanQRToPay from '../../../components/ScanQRToPay';
import {useTranslation} from 'react-i18next';
import {updateSoldProductStateAPI} from '../../../api/api.soldproduct';
import {PaymentState} from '../../../../enums';

type UnpaidPaymentsProps = {
  customer: Customer;
  date: string;
  products: SoldProduct[];
  close: () => void;
};

const UnPaidPayments: React.FC<UnpaidPaymentsProps> = ({
  customer,
  products,
  date,
  close,
}): React.JSX.Element => {
  const {currentTheme} = useTheme();
  const {t} = useTranslation('customer');
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const amt = products.reduce(
      (acc, f) =>
        acc +
        (f.product.discountedPrice
          ? f.product.discountedPrice
          : f.product.basePrice) *
          f.count,
      0,
    );
    setAmount(amt);
  }, [products, amount]);

  return (
    <View style={[styles.parent, {backgroundColor: currentTheme.baseColor}]}>
      <Text style={[styles.label, {color: currentTheme.contrastColor}]}>
        {t('c_pendingpayments')}
      </Text>
      <View
        style={[styles.container, {backgroundColor: currentTheme.baseColor}]}>
        <CustomerInfo customer={customer} />
        <View style={styles.itemListContainer}>
          {products.length !== 0 ? (
            <FlatList
              data={products}
              keyExtractor={i => i.createdAt}
              renderItem={({item}) => (
                <Tab
                  actionType="UNPAID"
                  i={item}
                  customer={customer}
                  date={date}
                  closeParent={close}
                />
              )}
              nestedScrollEnabled
            />
          ) : (
            <View style={styles.emptyListContainer}>
              <EmptyListMessage
                title={t('c_empty_unpaid_alert')}
                textColor={currentTheme.contrastColor}
              />
              <TouchableOpacity
                style={[
                  styles.backBtnContainer,
                  {backgroundColor: currentTheme.contrastColor},
                ]}
                onPress={() => back()}>
                <Icon
                  name="arrowleft"
                  size={20}
                  color={currentTheme.baseColor}
                />
                <Text
                  style={[styles.backBtnText, {color: currentTheme.baseColor}]}>
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {/* {products.length !== 0 && (
        <PayButton
          label={`${t('c_pay_btn')} ${currency} ${amount}`}
          pressAction={() => openConfirmPay('WHOLE')}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    height: deviceHeight * 0.9,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 20,
    paddingVertical: 20,
  },
  label: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  customerHeader: {
    marginTop: 20,
  },
  itemListContainer: {
    marginTop: 20,
  },
  emptyListContainer: {alignItems: 'center'},
  backBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 60,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backBtnText: {fontSize: 20, fontWeight: 'bold'},
});

export default UnPaidPayments;
