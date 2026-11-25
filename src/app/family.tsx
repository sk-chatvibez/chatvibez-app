import { router } from 'expo-router';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const titles = [
  {
    name: 'Main Vocalist',
    category: 'Talent',
    description: 'Outstanding family performer.',
  },
  {
    name: 'Vocalist',
    category: 'Talent',
    description: 'Recognized family performer.',
  },
  {
    name: 'Rising Star',
    category: 'Talent',
    description: 'Promising and active family member.',
  },
  {
    name: 'Prince',
    category: 'Royal',
    description: 'Special royal family title.',
  },
  {
    name: 'Princess',
    category: 'Royal',
    description: 'Special royal family title.',
  },
  {
    name: 'Boss',
    category: 'Support',
    description: 'Recognized for supporting family members.',
  },
  {
    name: 'Top Supporter',
    category: 'Support',
    description: 'Recognized family supporter.',
  },
  {
    name: 'Family Hero',
    category: 'Special',
    description: 'Outstanding contribution to the family.',
  },
];

export default function FamilyScreen() {
  const [activeTab, setActiveTab] = useState('Titles');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>My Family</Text>
        <Text style={styles.headerIcon}>⚙️</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.familyCard}>
          <Text style={styles.familyIcon}>👑</Text>
          <Text style={styles.familyName}>Family Name</Text>
          <Text style={styles.familyInfo}>Family ID: Generated after creation</Text>
          <Text style={styles.familyInfo}>Family Level: 1</Text>

          <View style={styles.stats}>
            <Text style={styles.stat}>Members{"\n"}—</Text>
            <Text style={styles.stat}>Captain{"\n"}—</Text>
            <Text style={styles.stat}>Co-Captain{"\n"}—</Text>
          </View>
        </View>

        <View style={styles.roles}>
          <Text style={styles.sectionTitle}>Family Management</Text>
          {['Members', 'Family Titles', 'Family Rules', 'Family Level'].map(item => (
            <Pressable
              key={item}
              style={styles.menuItem}
              onPress={() => {
                if (item === 'Family Titles') {
                  setActiveTab('Titles');
                } else if (item === 'Family Rules') {
                  setActiveTab('Rules');
                }
              }}
            >
              <Text style={styles.menuText}>{item}</Text>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Family Titles</Text>

        <View style={styles.tabs}>
          {['Titles', 'Rules'].map(tab => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {activeTab === 'Titles' ? (
          titles.map((item) => (
            <View key={item.name} style={styles.titleCard}>
              <View style={styles.titleTop}>
                <Text style={styles.titleName}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
              <Text style={styles.description}>
                {item.description}
              </Text>
              <Text style={styles.pending}>
                Eligibility and member limit configurable
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.titleCard}>
            <Text style={styles.titleName}>Family Title Rules</Text>
            <Text style={styles.description}>
              Each title will have its own eligibility conditions,
              maximum member limit and assignment permissions.
            </Text>
            <Text style={styles.description}>
              Automatic titles will be awarded after the required
              achievements. Other titles will require authorized
              family management approval.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#100A24',
  },
  container: {
    padding: 16,
    paddingBottom: 35,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  back: {
    color: '#FFFFFF',
    fontSize: 34,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
  },
  headerIcon: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  familyCard: {
    backgroundColor: '#29194A',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  familyIcon: {
    fontSize: 42,
  },
  familyName: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 8,
  },
  familyInfo: {
    color: '#C8B8E8',
    marginTop: 7,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 22,
  },
  stat: {
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 23,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  roles: {
    marginBottom: 25,
  },
  menuItem: {
    backgroundColor: '#211638',
    padding: 17,
    borderRadius: 12,
    marginBottom: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  arrow: {
    color: '#C9A8FF',
    fontSize: 22,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#44335D',
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    marginRight: 12,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: '#F23883',
  },
  tabText: {
    color: '#A99ABF',
    fontSize: 16,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  titleCard: {
    backgroundColor: '#211638',
    borderRadius: 13,
    padding: 16,
    marginBottom: 11,
  },
  titleTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  category: {
    color: '#D6B8FF',
    fontSize: 12,
  },
  description: {
    color: '#C9BEDB',
    marginTop: 12,
    lineHeight: 21,
  },
  pending: {
    color: '#A88AE0',
    fontSize: 11,
    marginTop: 12,
  },
});