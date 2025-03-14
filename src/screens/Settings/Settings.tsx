import {View, StyleSheet, Text, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import ShopkeeperInfo from './components/ShopkeeperInfo';
import AccountCenter from './components/AccountCenter';
import LogoutButton from './components/LogoutButton';
import AppSettings from './components/AppSettings';

const Settings = () => {
  const shopkeeper = useSelector((s: RootState) => s.shopkeeper.shopkeeper);

  return (
    <View style={styles.parent}>
      <Header name='Settings' backButtom />
      <ScrollView style={styles.settingsContainer} nestedScrollEnabled={true}>
        <View style={styles.infoContainer}>
          <ShopkeeperInfo shopkeeper={shopkeeper} secure={true} />
        </View>
        <View style={styles.sectionsContainer}>
          <Text style={styles.label}>Account</Text>
         <AccountCenter />
        </View>
        <View style={styles.sectionsContainer}>
          <Text style={styles.label}>App</Text>
         <AppSettings />
        </View>
        <LogoutButton/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {flex: 1},
  infoContainer: {},
  settingsContainer: {
    paddingHorizontal: 10,
  },
  sectionsContainer: {
    marginTop: 20,
  },
  label: {fontSize: 30, fontWeight: 'bold', paddingHorizontal:20},
});

export default Settings;
