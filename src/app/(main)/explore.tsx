import { useState } from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
const rooms = [
  { name: 'Friendship Zone', id: '10001', users: 128, color: '#7138E8', icon: '💜' },
  { name: 'Royal Lounge', id: '10002', users: 86, color: '#164D85', icon: '👑' },
  { name: 'Fun & Games', id: '10003', users: 64, color: '#8C3BC9', icon: '🎮' },
  { name: 'Music Lovers', id: '10004', users: 42, color: '#155B83', icon: '🎵' },
];
  export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>✦ ChatVibez</Text>
            <Text style={styles.subtitle}>Discover • Connect • Enjoy</Text>
          </View>
          <TouchableOpacity style={styles.profile}>
            <Text style={styles.profileText}>👤</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Explore Rooms ✨</Text>
          <Text style={styles.welcomeSub}>
            Find your people and enjoy together
          </Text>
        </View>

        <View style={styles.search}>
  <Text style={{ fontSize: 20, marginRight: 10 }}>
    🔍
  </Text>

  <TextInput
    style={styles.searchText}
    placeholder="Search anything..."
    placeholderTextColor="#999999"
    value={searchQuery}
    onChangeText={setSearchQuery}
  />
</View>

        <Text style={styles.sectionTitle}>Categories</Text>

        <View style={styles.categories}>
          {[
            ['💬', 'Chat'],
            ['🎮', 'Games'],
            ['🎬', "Let's Watch"],
            ['🎁', 'Gifts'],
          ].map(([icon, name]) => (
            <TouchableOpacity key={name} style={styles.category}>
              <Text style={styles.categoryIcon}>{icon}</Text>
              <Text style={styles.categoryText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.featured}>
          <Text style={styles.featuredTag}>✦ FEATURED ROOM</Text>
          <Text style={styles.featuredTitle}>Welcome to ChatVibez</Text>
          <Text style={styles.featuredSub}>
            Meet new friends and make memories!
          </Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinText}>Explore Now →</Text>
          </TouchableOpacity>
        </View>
{/* VIP, NOBLE & GIFT STORE */}

<Text style={styles.sectionTitle}>Premium Zone 👑</Text>

<View style={styles.premiumRow}>
  <TouchableOpacity style={[styles.premiumCard, { borderColor: '#E5B64A' }]}>
    <Text style={styles.premiumIcon}>👑</Text>
    <Text style={styles.premiumTitle}>VIP Club</Text>
    <Text style={styles.premiumSub}>Premium Benefits</Text>
    <Text style={styles.premiumAction}>Explore →</Text>
  </TouchableOpacity>

  <TouchableOpacity style={[styles.premiumCard, { borderColor: '#B78AFF' }]}>
    <Text style={styles.premiumIcon}>💎</Text>
    <Text style={styles.premiumTitle}>Noble Status</Text>
    <Text style={styles.premiumSub}>Exclusive Identity</Text>
    <Text style={styles.premiumAction}>Explore →</Text>
  </TouchableOpacity>
</View>

<TouchableOpacity style={styles.giftStore}>
  <View style={{ flex: 1 }}>
    <Text style={styles.giftTitle}>🎁 Gift Store</Text>
    <Text style={styles.giftSub}>
      Discover amazing gifts and special gift sets
    </Text>
    <Text style={styles.giftAction}>Explore Gift Collection →</Text>
  </View>
  <Text style={{ fontSize: 48 }}>💝</Text>
</TouchableOpacity>
        <View style={styles.roomHeading}>
          <Text style={styles.sectionTitle}>Popular Rooms 🔥</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>

        {rooms.map((room) => (
          <TouchableOpacity
            key={room.id}
            style={styles.roomCard}
          >
            <View style={[styles.roomIcon, { backgroundColor: room.color }]}>
              <Text style={styles.roomEmoji}>{room.icon}</Text>
            </View>
            <View style={styles.roomInfo}>
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.roomId}>Room ID: {room.id}</Text>
              <Text style={styles.roomUsers}>🟢 {room.users} people online</Text>
            </View>
            <TouchableOpacity style={styles.enterButton}>
              <Text style={styles.enterText}>Join</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100A25',
  },
  header: {
    padding: 22,
    paddingTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    color: '#A99CBD',
    fontSize: 12,
    marginTop: 5,
  },
  profile: {
    backgroundColor: '#292044',
    padding: 13,
    borderRadius: 30,
  },
  profileText: {
    fontSize: 22,
  },
  welcome: {
    paddingHorizontal: 22,
    marginTop: 12,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  welcomeSub: {
    color: '#B6A9C9',
    marginTop: 8,
    fontSize: 14,
  },
  search: {
    margin: 22,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#211936',
    borderWidth: 1,
    borderColor: '#49376B',
  },
  searchText: {
    color: '#A99CBD',
    fontSize: 15,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 22,
    marginBottom: 16,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 28,
  },
  category: {
    alignItems: 'center',
    backgroundColor: '#211936',
    borderRadius: 15,
    padding: 13,
    width: '21%',
  },
  categoryIcon: {
    fontSize: 25,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 11,
    marginTop: 8,
  },
  featured: {
    marginHorizontal: 20,
    padding: 22,
    borderRadius: 20,
    backgroundColor: '#4820A0',
    borderWidth: 1,
    borderColor: '#27CFFF',
    marginBottom: 28,
  },
  featuredTag: {
    color: '#55E5FF',
    fontWeight: 'bold',
    fontSize: 11,
  },
  featuredTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
  },
  featuredSub: {
    color: '#E1D8F5',
    marginTop: 8,
  },
  joinButton: {
    backgroundColor: '#21C8ED',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 10,
    marginTop: 20,
  },
  joinText: {
    color: '#130D29',
    fontWeight: 'bold',
  },
  roomHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 22,
  },
  seeAll: {
    color: '#24D5F4',
    marginBottom: 16,
  },
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#211936',
    marginHorizontal: 18,
    marginBottom: 13,
    padding: 13,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#382951',
  },
  roomIcon: {
    width: 53,
    height: 53,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomEmoji: {
    fontSize: 25,
  },
  roomInfo: {
    flex: 1,
    marginLeft: 12,
  },
  roomName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  roomId: {
    color: '#A99CBD',
    fontSize: 11,
    marginTop: 4,
  },
  roomUsers: {
    color: '#49DDA5',
    fontSize: 11,
    marginTop: 5,
  },
  enterButton: {
    backgroundColor: '#7138E8',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 9,
  },
  enterText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  premiumRow: {
  flexDirection: 'row',
  marginHorizontal: 18,
  gap: 12,
  marginBottom: 15,
},
premiumCard: {
  flex: 1,
  backgroundColor: '#211936',
  borderWidth: 1.5,
  borderRadius: 16,
  padding: 15,
},
premiumIcon: {
  fontSize: 32,
  marginBottom: 12,
},
premiumTitle: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 'bold',
},
premiumSub: {
  color: '#B6A9C9',
  fontSize: 11,
  marginTop: 7,
},
premiumAction: {
  color: '#27D5F4',
  fontWeight: 'bold',
  marginTop: 14,
},
giftStore: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#30205C',
  borderWidth: 1,
  borderColor: '#27D5F4',
  borderRadius: 18,
  padding: 18,
  marginHorizontal: 18,
  marginBottom: 28,
},
giftTitle: {
  color: '#FFFFFF',
  fontSize: 20,
  fontWeight: 'bold',
},
giftSub: {
  color: '#D0C4E4',
  fontSize: 12,
  marginTop: 7,
},
giftAction: {
  color: '#35DFFF',
  fontWeight: 'bold',
  marginTop: 13,
},
  bottomSpace: {
    height: 35,
  },
});