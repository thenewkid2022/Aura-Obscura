import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Button } from '../components/ui/Button';

interface OrderConfirmationScreenProps {
  navigation: any;
  route: {
    params: {
      orderId: string;
    };
  };
}

export const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({
  navigation,
  route,
}) => {
  const { orderId } = route.params;

  const handleContinueShopping = () => {
    navigation.navigate('Home');
  };

  const handleViewOrders = () => {
    navigation.navigate('Konto');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={80} color={Colors.success} />
          </View>
          
          <Text style={styles.title}>Bestellung erfolgreich!</Text>
          <Text style={styles.subtitle}>
            Vielen Dank für Ihren Kauf. Ihre Bestellung wird sorgfältig verpackt und versendet.
          </Text>
          
          <View style={styles.orderInfo}>
            <Text style={styles.orderLabel}>Bestellnummer</Text>
            <Text style={styles.orderNumber}>{orderId}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Was passiert als Nächstes?</Text>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepIcon}>
              <Ionicons name="time-outline" size={24} color={Colors.secondary} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Bestellung bestätigt</Text>
              <Text style={styles.stepDescription}>
                Sie erhalten eine Bestätigungs-E-Mail mit allen Details.
              </Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepIcon}>
              <Ionicons name="construct-outline" size={24} color={Colors.secondary} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Handverlesene Abfüllung</Text>
              <Text style={styles.stepDescription}>
                Unsere Experten füllen Ihre Decants sorgfältig aus Originalflakons ab.
              </Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepIcon}>
              <Ionicons name="car-outline" size={24} color={Colors.secondary} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Versand</Text>
              <Text style={styles.stepDescription}>
                Ihr Paket wird sicher verpackt und innerhalb von 1-2 Werktagen versendet.
              </Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepIcon}>
              <Ionicons name="mail-outline" size={24} color={Colors.secondary} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Tracking</Text>
              <Text style={styles.stepDescription}>
                Sie erhalten eine E-Mail mit dem Tracking-Link, sobald das Paket versendet wurde.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ihre Bestellung</Text>
          
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
            <Text style={styles.orderItemText}>Versand</Text>
            <Text style={styles.orderItemPrice}>Kostenlos</Text>
          </View>
          
          <View style={styles.orderItem}>
            <Text style={styles.totalText}>Gesamt</Text>
            <Text style={styles.totalPrice}>88,00 €</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Haben Sie Fragen?</Text>
          <Text style={styles.contactText}>
            Unser Kundenservice ist für Sie da. Kontaktieren Sie uns gerne per E-Mail oder über das Kontaktformular.
          </Text>
          
          <View style={styles.contactInfo}>
            <Ionicons name="mail-outline" size={20} color={Colors.secondary} />
            <Text style={styles.contactEmail}>service@aura-obscura.com</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Weiter einkaufen"
          onPress={handleContinueShopping}
          variant="primary"
          size="large"
          style={styles.continueButton}
        />
        
        <Button
          title="Meine Bestellungen anzeigen"
          onPress={handleViewOrders}
          variant="outline"
          size="medium"
          style={styles.ordersButton}
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
  
  successContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  
  successIcon: {
    marginBottom: 16,
  },
  
  title: {
    ...Typography.h2,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  
  orderInfo: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  
  orderLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  
  orderNumber: {
    ...Typography.h4,
    color: Colors.secondary,
  },
  
  section: {
    marginBottom: 32,
  },
  
  sectionTitle: {
    ...Typography.h3,
    color: Colors.white,
    marginBottom: 16,
  },
  
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  
  stepContent: {
    flex: 1,
  },
  
  stepTitle: {
    ...Typography.body,
    color: Colors.white,
    marginBottom: 4,
  },
  
  stepDescription: {
    ...Typography.bodySmall,
    color: Colors.textMuted,
    lineHeight: 18,
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
  
  contactText: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: 16,
    lineHeight: 22,
  },
  
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  contactEmail: {
    ...Typography.body,
    color: Colors.secondary,
  },
  
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.backgroundPrimary,
    gap: 12,
  },
  
  continueButton: {
    marginBottom: 8,
  },
  
  ordersButton: {
    marginBottom: 8,
  },
}); 