import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {deviceHeight} from '../../../utils/Constants';
import {TextInput} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {QuantityType} from '../../../../enums';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../store/store';
import {addProductToInventory} from '../../../../store/slices/business';
import {Confirm, showToast} from '../../../service/fn';
import {useTheme} from '../../../hooks/index';
import {isFloat, isNumber} from '../../../service/test';
import Slider from '@react-native-community/slider';

type EditProductProps = {
  close: () => void;
};

const AddProduct: React.FC<EditProductProps> = ({close}): React.JSX.Element => {
  const {currentTheme} = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('0');
  const [discountedPrice, setDiscountedPrice] = useState<string>('0');
  const [quantity, setQuantity] = useState<string>('0');
  const [stock, setStock] = useState<string>('0');
  const [productCost, setProductCost] = useState<string>('0');
  const [measurementType, setMeasurementType] = useState<QuantityType>(
    QuantityType.GRAMS,
  );

  const handleOnSubmit = async () => {
    const res = {
      res1: isNumber(price),
      res2: isNumber(discountedPrice),
      res3: isNumber(quantity),
    };
    const float = {
      res1: isFloat(stock),
      res2: isFloat(productCost),
    };
    if (!float.res1 || !float.res2) {
      Alert.alert(
        'Invalid input!',
        "Numeric entities can't include alphabets and only include '.'",
      );
      return;
    }
    if (!res.res1 || !res.res2 || !res.res3) {
      Alert.alert(
        'Invalid input!',
        "Numeric entities can't include alphabets and symbols",
      );
      return;
    }
    if (Number(quantity) === 0 || name.trim().length === 0) {
      Alert.alert('Some required fields are missing!');
      return;
    }
    if (Number(price) === 0) {
      const res = await Confirm(
        'Are you sure?',
        'You are trying to put the item price 0, please double check before creating.',
      );
      if (!res) return;
    }
    if (Number(stock) === 0) {
      const res = await Confirm(
        "Stock value can't be zero!",
        'stock is required to keep a record and analytical calculations.',
      );
      if (!res) return;
    }
    if (Number(productCost) === 0) {
      const res = await Confirm(
        'Making cost value is required!',
        'making cost is required to keep a record and analytical calculations.',
      );
      if (!res) return;
    }
    dispatch(
      addProductToInventory({
        product: {
          id: Date.now().toString(),
          name,
          basePrice: Number(price),
          discountedPrice: Number(discountedPrice),
          quantity: Number(quantity),
          totalSold: 0,
          stock: Number(stock),
          productCost: Number(productCost),
          measurementType,
          createdAt: new Date(Date.now()).toDateString(),
          updatedAt: new Date(Date.now()).toDateString(),
        },
      }),
    );
    close();
    showToast({
      type: 'success',
      text1: `Product Created successfully`,
    });
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.createCustomerContainer,
        {backgroundColor: currentTheme.contrastColor},
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={[styles.formTitle, {color: currentTheme.modal.title}]}>
        Add new Product
      </Text>
      <ScrollView style={{flex: 1}} nestedScrollEnabled>
        <View style={styles.formContainer}>
          <View style={styles.inputTitleContainer}>
            <Text style={styles.inputLabel}>Product name*</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={[
                styles.inputText,
                {borderColor: currentTheme.modal.inputBorder},
              ]}
              placeholder="Enter name"
              placeholderTextColor={currentTheme.baseColor}
            />
          </View>
          <View style={styles.inputTitleContainer}>
            <Text
              style={[
                styles.inputLabel,
                {color: currentTheme.modal.inputText},
              ]}>
              Product price*
            </Text>
            <TextInput
              value={price}
              onChangeText={value => setPrice(value)}
              style={[
                styles.inputText,
                {borderColor: currentTheme.modal.inputBorder},
              ]}
              placeholder="Enter price"
              placeholderTextColor={currentTheme.baseColor}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputTitleContainer}>
            <Text
              style={[
                styles.inputLabel,
                {color: currentTheme.modal.inputText},
              ]}>
              Product discounted price
            </Text>
            <TextInput
              value={discountedPrice}
              onChangeText={value => setDiscountedPrice(value)}
              style={[
                styles.inputText,
                {borderColor: currentTheme.modal.inputBorder},
              ]}
              placeholder="Enter discounted price"
              placeholderTextColor={currentTheme.baseColor}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputTitleContainer}>
            <Text
              style={[
                styles.inputLabel,
                {color: currentTheme.modal.inputText},
              ]}>
              Product quantity*
            </Text>
            <TextInput
              value={quantity}
              onChangeText={value => setQuantity(value)}
              style={[
                styles.inputText,
                {borderColor: currentTheme.modal.inputBorder},
              ]}
              placeholder="Enter quantity"
              placeholderTextColor={currentTheme.baseColor}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputTitleContainer}>
            <Text
              style={[
                styles.inputLabel,
                {color: currentTheme.modal.inputText},
              ]}>
              Product Stock*
            </Text>
            <TextInput
              value={stock}
              onChangeText={value => setStock(value)}
              style={[
                styles.inputText,
                {borderColor: currentTheme.modal.inputBorder},
              ]}
              placeholder="Enter Stock"
              placeholderTextColor={currentTheme.baseColor}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.inputTitleContainer, {gap: 5}]}>
            <Text
              style={[
                styles.inputLabel,
                {color: currentTheme.modal.inputText},
              ]}>
              Estimated Making cost:{' '}
              {`${productCost.trim().length !== 0 ? productCost : '0'}`}
            </Text>
            <TextInput
              value={productCost}
              onChangeText={value => setProductCost(value)}
              style={[
                styles.inputText,
                {borderColor: currentTheme.modal.inputBorder},
              ]}
              placeholder="Enter Estimated Making cost"
              placeholderTextColor={currentTheme.baseColor}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputTitleContainer}>
            <Text
              style={[
                styles.inputLabel,
                {color: currentTheme.modal.inputText},
              ]}>
              Product measurement type
            </Text>
            <Picker
              selectedValue={measurementType}
              onValueChange={value => setMeasurementType(value)}
              dropdownIconColor={currentTheme.textAlt}
              style={[
                styles.dropdown,
                {
                  color: currentTheme.modal.pickerText,
                  backgroundColor: currentTheme.modal.pickerbg,
                },
              ]}>
              <Picker.Item label="Ml" value={'ml'} />
              <Picker.Item label="Litre" value={'litre'} />
              <Picker.Item label="Kilograms" value={'kilograms'} />
              <Picker.Item label="Grams" value={'grams'} />
              <Picker.Item label="Pcs" value={'pcs'} />
              <Picker.Item label="Pack" value={'pack'} />
              <Picker.Item label="Dozen" value={'dozen'} />
            </Picker>
          </View>
          <TouchableOpacity
            style={[
              styles.saveButton,
              {backgroundColor: currentTheme.baseColor},
            ]}
            activeOpacity={0.8}
            onPress={handleOnSubmit}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  createCustomerContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: deviceHeight * 0.6,
    borderRadius: 20,
    marginBottom: 10,
    elevation: 30,
  },
  formTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 20,
    gap: 16,
  },
  inputTitleContainer: {
    gap: 4,
  },
  inputLabel: {
    paddingLeft: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  inputText: {
    borderWidth: 2,
    borderRadius: 8,
    height: 50,
    fontSize: 18,
    paddingHorizontal: 12,
  },
  dropdown: {},
  saveButton: {
    paddingVertical: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});

export default AddProduct;
