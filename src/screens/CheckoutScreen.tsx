import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Button } from '../components/ui/Button';
import { Address, PaymentMethod } from '../types';

interface CheckoutScreenProps {
  navigation: any;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation }) => {
  const [shippingAddress, setShippingAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Deutschland',
    phone: '',
  });
  
  const [billingAddress, setBillingAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Deutschland',
    phone: '',
  });
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('stripe');
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = 88; // Mock-Wert
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const paymentMethods = [
    { id: 'stripe', name: 'Kreditkarte', icon: 'card-outline' },
    { id: 'apple-pay', name: 'Apple Pay', icon: 'logo-apple' },
    { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
    { id: 'klarna', name: 'Klarna', icon: 'card-outline' },
  ] as const;

  const handleAddressChange = (field: keyof Address, value: string, isBilling = false) => {
    const address = isBilling ? billingAddress : shippingAddress;
    const setAddress = isBilling ? setBillingAddress : setShippingAddress;
    
    setAddress({
      ...address,
      [field]: value,
    });
  };

  const handleUseSameAddress = () => {
    if (useSameAddress) {
      setBillingAddress(shippingAddress);
    }
    setUseSameAddress(!useSameAddress);
  };

  const validateForm = () => {
    const requiredFields: (keyof Address)[] = ['firstName', 'lastName', 'street', 'city', 'postalCode'];
    
    for (const field of requiredFields) {
      if (!shippingAddress[field] || !billingAddress[field]) {
        Alert.alert('Fehlende Angaben', 'Bitte füllen Sie alle Pflichtfelder aus.');
        return false;
      }
    }
    
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simuliere Zahlungsverarbeitung
    setTimeout(() => {
      setIsProcessing(false);
      navigation.navigate('OrderConfirmation', { orderId: 'AO-' + Date.now() });
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} €`;
  };

  const renderAddressForm = (title: string, address: Address, isBilling = false) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Vorname *</Text>
          <TextInput
            style={styles.input}
            value={address.firstName}
            onChangeText={(value) => handleAddressChange('firstName', value, isBilling)}
            placeholder="Vorname"
            placeholderTextColor={Colors.textMuted}
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Nachname *</Text>
          <TextInput
            style={styles.input}
            value={address.lastName}
            onChangeText={(value) => handleAddressChange('lastName', value, isBilling)}
            placeholder="Nachname"
            placeholderTextColor={Colors.textMuted}
          />
        </View>
      </View>
      
      <Text style={styles.label}>Straße & Hausnummer *</Text>
      <TextInput
        style={styles.input}
        value={address.street}
        onChangeText={(value) => handleAddressChange('street', value, isBilling)}
        placeholder="Musterstraße 123"
        placeholderTextColor={Colors.textMuted}
      />
      
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Stadt *</Text>
          <TextInput
            style={styles.input}
            value={address.city}
            onChangeText={(value) => handleAddressChange('city', value, isBilling)}
            placeholder="Stadt"
            placeholderTextColor={Colors.textMuted}
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>PLZ *</Text>
          <TextInput
            style={styles.input}
            value={address.postalCode}
            onChangeText={(value) => handleAddressChange('postalCode', value, isBilling)}
            placeholder="12345"
            placeholderTextColor={Colors.textMuted}
            keyboardType="numeric"
          />
        </View>
      </View>
      
      <Text style={styles.label}>Land</Text>
      <TextInput
        style={styles.input}
        value={address.country}
        onChangeText={(value) => handleAddressChange('country', value, isBilling)}
        placeholder="Deutschland"
        placeholderTextColor={Colors.textMuted}
      />
      
      <Text style={styles.label}>Telefon</Text>
      <TextInput
        style={styles.input}
        value={address.phone}
        onChangeText={(value) => handleAddressChange('phone', value, isBilling)}
        placeholder="+49 123 456789"
        placeholderTextColor={Colors.textMuted}
        keyboardType="phone-pad"
      />
    </View>
  );

  const renderPaymentMethods = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Zahlungsmethode</Text>
      
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === method.id && styles.selectedPaymentMethod,
          ]}
          onPress={() => setSelectedPaymentMethod(method.id as PaymentMethod)}
        >
          <View style={styles.paymentMethodContent}>
            <Ionicons
              name={method.icon as any}
              size={24}
              color={selectedPaymentMethod === method.id ? Colors.secondary : Colors.textMuted}
            />
            <Text
              style={[
                styles.paymentMethodText,
                selectedPaymentMethod === method.id && styles.selectedPaymentMethodText,
              ]}
            >
              {method.name}
            </Text>
          </View>
          
          {selectedPaymentMethod === method.id && (
            <Ionicons name="checkmark-circle" size={24} color={Colors.secondary} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderOrderSummary = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Bestellübersicht</Text>
      
      <View style={styles.orderItem}>
        <Text style={styles.orderItemText}>Amouage Reflection Man (2x)</Text>
        <Text style={styles.orderItemPrice}>56,00 €</Text>
      </View>
      
      <View style={styles.orderItem}>
        <Text style={styles.orderItemText}>Tom Ford Tobacco Vanille (1x)</Text>
        <Text style={styles.orderItemPrice}>32,00 €</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.orderItem}>
        <Text style={styles.orderItemText}>Zwischensumme</Text>
        <Text style={styles.orderItemPrice}>{formatPrice(subtotal)}</Text>
      </View>
      
      <View style={styles.orderItem}>
        <Text style={styles.orderItemText}>Versand</Text>
        <Text style={styles.orderItemPrice}>
          {shipping === 0 ? 'Kostenlos' : formatPrice(shipping)}
        </Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.orderItem}>
        <Text style={styles.totalText}>Gesamt</Text>
        <Text style={styles.totalPrice}>{formatPrice(total)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderAddressForm('Lieferadresse', shippingAddress)}
        
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sameAddressToggle}
            onPress={handleUseSameAddress}
          >
            <Ionicons
              name={useSameAddress ? 'checkbox' : 'square-outline'}
              size={20}
              color={useSameAddress ? Colors.secondary : Colors.textMuted}
            />
            <Text style={styles.sameAddressText}>
              Rechnungsadresse ist identisch mit Lieferadresse
            </Text>
          </TouchableOpacity>
        </View>
        
        {!useSameAddress && renderAddressForm('Rechnungsadresse', billingAddress, true)}
        
        {renderPaymentMethods()}
        {renderOrderSummary()}
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title={isProcessing ? 'Wird verarbeitet...' : `Jetzt kaufen (${formatPrice(total)})`}
          onPress={handlePayment}
          variant="primary"
          size="large"
          loading={isProcessing}
          disabled={isProcessing}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  
  content: {
    flex: 1,
    padding: 16,
  },
  
  section: {
    marginBottom: 24,
  },
  
  sectionTitle: {
    ...Typography.h3,
    color: Colors.white,
    marginBottom: 16,
  },
  
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  
  halfWidth: {
    flex: 1,
  },
  
  label: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  
  input: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Typography.body,
    color: Colors.textPrimary,
  },
  
  sameAddressToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  
  sameAddressText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  
  selectedPaymentMethod: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.primary,
  },
  
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  
  paymentMethodText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  
  selectedPaymentMethodText: {
    color: Colors.secondary,
  },
  
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  orderItemText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  
  orderItemPrice: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  
  totalText: {
    ...Typography.h4,
    color: Colors.white,
  },
  
  totalPrice: {
    ...Typography.h4,
    color: Colors.secondary,
  },
  
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.backgroundPrimary,
  },
}); 