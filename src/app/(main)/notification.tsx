import { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const onlineUsers = [
  { id: '1', name: 'User 1', status: 'Virtual Friend', avatar: '👩' },
  { id: '2', name: 'User 2', status: 'Online', avatar: '👨' },
  { id: '3', name: 'User 3', status: 'Online', avatar: '👩🏻' },
  { id: '4', name: 'User 4', status: 'Virtual Friend', avatar: '🧑' },
  { id: '5', name: 'User 5', status: 'Online', avatar: '👩‍🦰' },
  { id: '6', name: 'User 6', status: 'Online', avatar: '👨🏻' },
];

const creators = [
  { id: '1', name: 'Singer One', category: 'Famous Singer', followers: '245.6K', avatar: '🎤' },
  { id: '2', name: 'Singer Two', category: 'Bhojpuri Singer', followers: '189.4K', avatar: '🎵' },
  { id: '3', name: 'Creator One', category: 'Verified Creator', followers: '302.1K', avatar: '🎬' },
  { id: '4', name: 'Rising Star', category: 'Rising Star', followers: '25.4K', avatar: '⭐' },
  { id: '5', name: 'VIP Creator', category: 'VIP', followers: '120K', avatar: '👑' },
];

const categories = [
  'All',
  'Singer',
  'Creator',
  'Verified',
  'Rising',
  'VIP',
];

export default function NotificationScreen() {
  const [activeTab, setActiveTab] = useState('Chat');
  const [activeCategory, setActiveCategory] = useState('All');
  const [following, setFollowing] = useState<string[]>([]);

  const filteredCreators = creators.filter(item => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Singer') return item.category.includes('Singer');
    if (activeCategory === 'Creator') return item.category.includes('Creator');
    if (activeCategory === 'Verified') return item.category === 'Verified Creator';
    if (activeCategory === 'Rising') return item.category === 'Rising Star';
    if (activeCategory === 'VIP') return item.category === 'VIP';
    return true;
  });

  const toggleFollow = (id: string) => {
    setFollowing(previous =>
      previous.includes(id)
        ? previous.filter(item => item !== id)
        : [...previous, id]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content"/>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Text style={styles.logoIcon}>◉</Text>
            <Text style={styles.logo}>ChatVibez</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerIcon}>
              <Text style={styles.headerIconText}>⌕</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Text style={styles.headerIconText}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CHAT / NOTICE TABS */}
        <View style={styles.topTabs}>
          {['Chat', 'Notice'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={styles.topTab}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.topTabText,
                activeTab === tab && styles.activeTopTab
              ]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.tabUnderline} />}
              {tab === 'Notice' && <View style={styles.redDot} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* ONLINE USERS */}
        <View style={styles.onlineSection}>
          <View style={styles.sectionHeading}>
            <View style={styles.headingLeft}>
              <View style={styles.greenDot} />
              <Text style={styles.sectionTitle}>Online</Text>
              <Text style={styles.onlineCount}>(128)</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All ›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {onlineUsers.map(user => (
              <TouchableOpacity key={user.id} style={styles.onlineUser}>
                <View style={styles.onlineAvatar}>
                  <Text style={styles.onlineEmoji}>{user.avatar}</Text>
                  <View style={styles.userOnlineDot} />
                </View>
                <Text style={styles.onlineName}>{user.name}</Text>
                <Text style={styles.onlineStatus}>
                  {user.status === 'Virtual Friend' ? '♡ Virtual Friend' : '● Online'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {activeTab === 'Chat' ? (
          <>
            {/* OFFICIAL WELCOME GROUP */}
            <TouchableOpacity style={styles.officialCard}>
              <View style={styles.officialAvatar}>
                <Text style={styles.officialEmoji}>👑</Text>
                <Text style={styles.cvText}>CV</Text>
              </View>

              <View style={styles.officialDetails}>
                <View style={styles.titleLine}>
                  <Text style={styles.officialTitle}>ChatVibez Official</Text>
                  <Text style={styles.officialBadge}>✓ Official</Text>
                </View>
                <Text numberOfLines={1} style={styles.officialMessage}>
                  Welcome to ChatVibez! Get updates, events and new features.
                </Text>
              </View>

              <View style={styles.cardRight}>
                <Text style={styles.cardTime}>11:42 AM</Text>
                <Text style={styles.unreadBadge}>1</Text>
              </View>
            </TouchableOpacity>

            {/* SECURITY GROUP */}
            <TouchableOpacity style={styles.officialCard}>
              <View style={styles.securityAvatar}>
                <Text style={styles.securityEmoji}>🛡️</Text>
              </View>

              <View style={styles.officialDetails}>
                <View style={styles.titleLine}>
                  <Text style={styles.officialTitle}>ChatVibez Security</Text>
                  <Text style={styles.officialBadge}>✓ Official</Text>
                </View>
                <Text numberOfLines={2} style={styles.officialMessage}>
                  Account safety, guidelines and important security alerts.
                </Text>
              </View>

              <View style={styles.cardRight}>
                <Text style={styles.cardTime}>10:15 AM</Text>
                <Text style={styles.unreadBadge}>2</Text>
              </View>
            </TouchableOpacity>

            {/* POPULAR TO FOLLOW */}
            <View style={styles.popularSection}>
              <View style={styles.popularHeading}>
                <Text style={styles.popularTitle}>🔥 Popular to Follow</Text>
                <TouchableOpacity>
                  <Text style={styles.discoverButton}>⭐ Discover</Text>
                </TouchableOpacity>
              </View>

              {/* CATEGORY FILTERS */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
              >
                {categories.map(category => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setActiveCategory(category)}
                    style={[
                      styles.categoryButton,
                      activeCategory === category && styles.activeCategory
                    ]}
                  >
                    <Text style={[
                      styles.categoryText,
                      activeCategory === category && styles.activeCategoryText
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* CREATOR CARDS */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.creatorScroll}
              >
                {filteredCreators.map(creator => (
                  <View key={creator.id} style={styles.creatorCard}>
                    <View style={styles.creatorGlow}>
                      <Text style={styles.creatorEmoji}>{creator.avatar}</Text>
                    </View>

                    <Text style={styles.creatorName}>
                      {creator.name} ✓
                    </Text>

                    <Text style={styles.creatorCategory}>
                      {creator.category}
                    </Text>

                    <Text style={styles.followers}>
                      👥 {creator.followers} Followers
                    </Text>

                    <TouchableOpacity
                      style={[
                        styles.followButton,
                        following.includes(creator.id) && styles.followingButton
                      ]}
                      onPress={() => toggleFollow(creator.id)}
                    >
                      <Text style={styles.followButtonText}>
                        {following.includes(creator.id) ? '✓ Following' : '+ Follow'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </>
        ) : (
          <>
            {/* NOTICE PAGE */}
            <Text style={styles.noticeHeading}>Activity Center</Text>

            <View style={styles.activityGrid}>
              {[
                { name: 'Comments & @', icon: '💬', color: '#183A55' },
                { name: 'Activity Center', icon: '🚩', color: '#4A2C39' },
                { name: 'New Friends', icon: '👥', color: '#24385B' },
                { name: "Visitors' Trace", icon: '👁️', color: '#3A285B' },
                { name: 'Gifts', icon: '🎁', color: '#512744' },
              ].map(item => (
                <TouchableOpacity
                  key={item.name}
                  style={[styles.activityCard, { backgroundColor: item.color }]}
                >
                  <Text style={styles.activityEmoji}>{item.icon}</Text>
                  <Text style={styles.activityText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.noticeHeading}>Official Notifications</Text>

            {[
              { icon: '📢', name: 'System', message: 'ChatVibez official updates.' },
              { icon: '🛡️', name: 'Safety Notification', message: 'Important account safety information.' },
              { icon: '⭐', name: 'Activity Notifications', message: 'Your account activity updates.' },
              { icon: '🎁', name: 'Gift Notifications', message: 'Your gift notifications appear here.' },
            ].map(item => (
              <TouchableOpacity key={item.name} style={styles.noticeItem}>
                <Text style={styles.noticeEmoji}>{item.icon}</Text>
                <View style={styles.noticeDetails}>
                  <Text style={styles.noticeName}>{item.name}</Text>
                  <Text style={styles.noticeMessage}>{item.message}</Text>
                </View>
                <View style={styles.unreadSmall} />
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10051F',
  },
  scrollContent: {
    paddingBottom: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    color: '#E64BFF',
    fontSize: 35,
    marginRight: 8,
  },
  logo: {
    fontSize: 27,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: '#C72CFF',
    textShadowRadius: 12,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 18,
  },
  headerIcon: {
    padding: 5,
  },
  headerIconText: {
    fontSize: 29,
    color: '#FFFFFF',
  },
  topTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#61218A',
  },
  topTab: {
    flex: 1,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTabText: {
    fontSize: 21,
    color: '#B79CCF',
    fontWeight: '600',
  },
  activeTopTab: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    width: '65%',
    height: 4,
    backgroundColor: '#E32BFF',
    borderRadius: 5,
  },
  redDot: {
    position: 'absolute',
    top: 9,
    right: '28%',
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#FF3158',
  },
  onlineSection: {
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 17,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 17,
    marginBottom: 18,
  },
  headingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greenDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#00E68A',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  onlineCount: {
    color: '#D8B9FF',
    fontSize: 16,
  },
  viewAll: {
    color: '#DAB7FF',
    fontSize: 15,
  },
  onlineUser: {
    width: 86,
    alignItems: 'center',
    marginRight: 10,
  },
  onlineAvatar: {
    width: 72,
    height: 72,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#D849FF',
    backgroundColor: '#32204F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineEmoji: {
    fontSize: 37,
  },
  userOnlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 1,
    width: 14,
    height: 14,
    borderRadius: 8,
    backgroundColor: '#00ED72',
    borderWidth: 2,
    borderColor: '#10051F',
  },
  onlineName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
    marginTop: 7,
  },
  onlineStatus: {
    color: '#D9B5F4',
    fontSize: 10,
    marginTop: 3,
  },
  officialCard: {
    marginHorizontal: 13,
    marginBottom: 12,
    minHeight: 100,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#A72CEB',
    backgroundColor: '#211034',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  officialAvatar: {
    width: 76,
    height: 76,
    borderRadius: 40,
    backgroundColor: '#32134D',
    borderWidth: 2,
    borderColor: '#9B38FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  officialEmoji: {
    fontSize: 25,
  },
  cvText: {
    color: '#FFD76B',
    fontWeight: '900',
    fontSize: 19,
  },
  securityAvatar: {
    width: 76,
    height: 76,
    borderRadius: 40,
    backgroundColor: '#21164D',
    borderWidth: 2,
    borderColor: '#8E3DFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityEmoji: {
    fontSize: 38,
  },
  officialDetails: {
    flex: 1,
  },
  titleLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  officialTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  officialBadge: {
    backgroundColor: '#7C19CF',
    color: '#FFFFFF',
    fontSize: 10,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '800',
  },
  officialMessage: {
    color: '#D9C8EB',
    fontSize: 12,
    marginTop: 9,
  },
  cardRight: {
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 58,
  },
  cardTime: {
    color: '#D7C2E9',
    fontSize: 11,
  },
  unreadBadge: {
    backgroundColor: '#FF3158',
    color: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 4,
    fontWeight: '900',
  },
  popularSection: {
    marginTop: 8,
    marginHorizontal: 12,
    paddingTop: 15,
    paddingBottom: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#8727BD',
    backgroundColor: '#1D0D32',
  },
  popularHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
  },
  popularTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
  },
  discoverButton: {
    color: '#FFE1A1',
    borderColor: '#CA44FF',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    fontSize: 11,
  },
  categoryScroll: {
    marginTop: 17,
    marginBottom: 17,
    paddingLeft: 10,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#7931A6',
    backgroundColor: '#2C1744',
    borderRadius: 25,
    paddingHorizontal: 17,
    paddingVertical: 9,
    marginRight: 9,
  },
  activeCategory: {
    backgroundColor: '#9E20D9',
    borderColor: '#F15AFF',
  },
  categoryText: {
    color: '#DCC7EF',
    fontSize: 12,
    fontWeight: '700',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  creatorScroll: {
    paddingHorizontal: 10,
    gap: 12,
  },
  creatorCard: {
    width: 185,
    minHeight: 265,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: '#D39BFF',
    backgroundColor: '#301344',
    alignItems: 'center',
    padding: 12,
  },
  creatorGlow: {
    width: 83,
    height: 83,
    borderRadius: 45,
    backgroundColor: '#5A248D',
    borderWidth: 3,
    borderColor: '#F4C65D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  creatorEmoji: {
    fontSize: 43,
  },
  creatorName: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
    marginTop: 10,
  },
  creatorCategory: {
    color: '#E4C4FF',
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
  },
  followers: {
    color: '#D9C4EF',
    fontSize: 12,
    marginTop: 13,
  },
  followButton: {
    width: '95%',
    alignItems: 'center',
    backgroundColor: '#A528E6',
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 13,
  },
  followingButton: {
    backgroundColor: '#4C3864',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
  },
  noticeHeading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginHorizontal: 18,
    marginTop: 22,
    marginBottom: 15,
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    gap: 10,
  },
  activityCard: {
    width: '31%',
    height: 110,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityEmoji: {
    fontSize: 32,
    marginBottom: 9,
  },
  activityText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  noticeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#39214F',
  },
  noticeEmoji: {
    fontSize: 32,
    marginRight: 15,
  },
  noticeDetails: {
    flex: 1,
  },
  noticeName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  noticeMessage: {
    color: '#BFA9D2',
    fontSize: 12,
    marginTop: 7,
  },
  unreadSmall: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#FF3E77',
  },
});