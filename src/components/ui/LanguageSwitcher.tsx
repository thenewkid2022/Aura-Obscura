import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { useLanguage } from '../../contexts/LanguageContext';
import { Language } from '../../constants/Translations';

interface LanguageSwitcherProps {
  style?: any;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ style }) => {
  const { language, setLanguage, t } = useLanguage();
  const [showModal, setShowModal] = React.useState(false);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'de', name: t.german, flag: '🇩🇪' },
    { code: 'en', name: t.english, flag: '🇺🇸' },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setShowModal(false);
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <>
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={() => setShowModal(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.flag}>{currentLanguage?.flag}</Text>
        <Text style={styles.languageCode}>{language.toUpperCase()}</Text>
        <Ionicons name="chevron-down" size={16} color={Colors.secondary} />
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.language}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>
            
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  language === lang.code && styles.selectedLanguage,
                ]}
                onPress={() => handleLanguageSelect(lang.code)}
              >
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <Text style={[
                  styles.languageName,
                  language === lang.code && styles.selectedLanguageText,
                ]}>
                  {lang.name}
                </Text>
                {language === lang.code && (
                  <Ionicons name="checkmark" size={20} color={Colors.secondary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  
  flag: {
    fontSize: 16,
    marginRight: 6,
  },
  
  languageCode: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    marginRight: 4,
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContent: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 0,
    width: '80%',
    maxWidth: 300,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  modalTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
  },
  
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  selectedLanguage: {
    backgroundColor: Colors.primary,
  },
  
  languageFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  
  languageName: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  
  selectedLanguageText: {
    color: Colors.secondary,
    fontWeight: '600',
  },
}); 