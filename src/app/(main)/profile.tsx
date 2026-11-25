import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const showComingSoon = (name: string) => {
  Alert.alert(name, 'This feature will be activated soon!');
};

const featurePages = [
  [
    { icon: '👑', title: 'VIP' },
    { icon: '🎙️', title: 'Drafts' },
    { icon: '📅', title: 'Daily Task' },
    { icon: '🎮', title: 'Game' },
    { icon: '💎', title: 'Noble' },
    { icon: '💳', title: 'Recharge' },
    { icon: '🤝', title: 'Friendship' },
  ],
  [
    { icon: '💡', title: 'Creators' },
    { icon: '🏅', title: 'Verified' },
    { icon: '⭐', title: 'Badge' },
    { icon: '🏬', title: 'Store' },
    { icon: '✨', title: 'Tools' },
    { icon: '💬', title: 'Feedback' },
    { icon: '💰', title: 'Income' },
    { icon: '🏆', title: 'Celeb' },
    { icon: '🪙', title: 'Coins' },
  ],
  [
    { icon: '📹', title: 'My Live' },
    { icon: '👥', title: 'Agency' },
    { icon: '📊', title: 'Party Room Data' },
    { icon: '🌟', title: 'Taillight' },
    { icon: '🛡️', title: 'Security Center' },
  ],
];

const postTabs = ['Moment', 'Likes', 'Cover', 'Short Video'];

export default function ProfileScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [activeFeaturePage, setActiveFeaturePage] = useState(0);
  const [activePostTab, setActivePostTab] = useState('Moment');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Pressable onPress={() => showComingSoon('Settings')}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </Pressable>
        </View>

        <View style={styles.cover}>
          <View style={styles.coverGlow} />
          <Text style={styles.coverText}>CHATVIBEZ</Text>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>CV</Text>
          </View>

          <View style={styles.userDetails}>
            <Text style={styles.name}>Your Name</Text>
            <Text style={styles.userId}>ChatVibez ID: Not Set</Text>
            <View style={styles.badges}>
              <Text style={styles.vipBadge}>👑 VIP</Text>
              <Text style={styles.nobleBadge}>💎 NOBLE</Text>
            </View>
          </View>

          <Pressable
            style={styles.editButton}
            onPress={() => showComingSoon('Edit Profile')}
          >
            <Text style={styles.editIcon}>✏️</Text>
          </Pressable>
        </View>

        <View style={styles.stats}>
          {[
            ['0', 'Followers'],
            ['0', 'Following'],
            ['0', 'Rank'],
            ['0', 'Gifts'],
          ].map(([value, label]) => (
            <Pressable
              key={label}
              style={styles.statItem}
              onPress={() => showComingSoon(label)}
            >
              <Text style={styles.statValue}>{value}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionTitle}>My Family</Text>

        <Pressable
          style={styles.familyBanner}
          onPress={() => router.push('/family')}
        >
          <View style={styles.familyIconBox}>
            <Text style={styles.familyIcon}>👨‍👩‍👧</Text>
          </View>
          <View style={styles.familyInfo}>
            <Text style={styles.familyTitle}>Join a Family</Text>
            <Text style={styles.familySub}>
              Find your people and grow together
            </Text>
            <Text style={styles.familyAction}>Explore Families →</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>👑 Premium Membership</Text>

        <View style={styles.membershipRow}>
          <Pressable
            style={[styles.memberCard, styles.vipCard]}
            onPress={() => showComingSoon('VIP Club')}
          >
            <Text style={styles.memberIcon}>👑</Text>
            <Text style={styles.memberTitle}>VIP Club</Text>
            <Text style={styles.memberSub}>Premium Benefits</Text>
            <Text style={styles.memberAction}>Explore →</Text>
          </Pressable>

          <Pressable
            style={[styles.memberCard, styles.nobleCard]}
            onPress={() => showComingSoon('Noble Status')}
          >
            <Text style={styles.memberIcon}>💎</Text>
            <Text style={styles.memberTitle}>Noble Status</Text>
            <Text style={styles.memberSub}>Exclusive Identity</Text>
            <Text style={styles.memberAction}>Explore →</Text>
          </Pressable>
        </View>

        <View style={styles.featureHeader}>
          <Text style={styles.sectionTitle}>✨ My Features</Text>
          <Text style={styles.pageNumber}>
            {activeFeaturePage + 1}/3
          </Text>
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          onMomentumScrollEnd={(event) => {
            const page = Math.round(
              event.nativeEvent.contentOffset.x / width
            );
            setActiveFeaturePage(page);
          }}
        >
          {featurePages.map((page, pageIndex) => (
            <View
              key={pageIndex}
              style={[styles.featurePage, { width: width - 32 }]}
            >
              {page.map((item) => (
                <Pressable
                  key={item.title}
                  style={styles.featureItem}
                  onPress={() => showComingSoon(item.title)}
                >
                  <View style={styles.featureIconBox}>
                    <Text style={styles.featureIcon}>{item.icon}</Text>
                  </View>
                  <Text style={styles.featureTitle}>{item.title}</Text>
                </Pressable>
              ))}
            </View>
          ))}
        </ScrollView>

        <View style={styles.pageDots}>
          {featurePages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.pageDot,
                activeFeaturePage === index && styles.activePageDot,
              ]}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>My Posts</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.postTabs}
        >
          {postTabs.map((tab) => (
            <Pressable
              key={tab}
              style={styles.postTab}
              onPress={() => setActivePostTab(tab)}
            >
              <Text
                style={[
                  styles.postTabText,
                  activePostTab === tab && styles.activePostTabText,
                ]}
              >
                {tab}
              </Text>
              {activePostTab === tab && (
                <View style={styles.postTabUnderline} />
              )}
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.postToolbar}>
          <Text style={styles.playAll}>▶️ Play all</Text>
          <Text style={styles.postCount}>0</Text>
          <View style={styles.toolbarSpacer} />
          <Text style={styles.toolbarIcon}>⌕</Text>
          <Text style={styles.toolbarIcon}>☷</Text>
          <Text style={styles.toolbarIcon}>▦</Text>
        </View>

        <View style={styles.postsGrid}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Pressable
              key={item}
              style={styles.postPlaceholder}
              onPress={() => showComingSoon(activePostTab)}
            >
              <Text style={styles.postPlaceholderIcon}>＋</Text>
              <Text style={styles.postPlaceholderText}>
                Your {activePostTab}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.footer}>
          ChatVibez • Discover • Connect • Enjoy
        </Text>
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
    paddingHorizontal: 16,
    paddingBottom: 35,
  },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsIcon: {
    fontSize: 24,
  },
  cover: {
    height: 105,
    backgroundColor: '#251344',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#6037A8',
  },
  coverGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#7138E8',
    opacity: 0.25,
    right: -30,
    top: -75,
  },
  coverText: {
    color: '#C9A7FF',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 4,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -8,
    paddingHorizontal: 5,
    paddingVertical: 14,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#7138E8',
    borderWidth: 3,
    borderColor: '#25C9F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
    marginLeft: 13,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  userId: {
    color: '#AAA1BF',
    fontSize: 11,
    marginTop: 4,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 7,
  },
  vipBadge: {
    color: '#FFD76A',
    backgroundColor: '#44351D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    fontSize: 11,
    fontWeight: 'bold',
  },
  nobleBadge: {
    color: '#D8A7FF',
    backgroundColor: '#39234F',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    fontSize: 11,
    fontWeight: 'bold',
  },
  editButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#7138E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    fontSize: 17,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#211638',
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 5,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#AAA1BF',
    fontSize: 10,
    marginTop: 4,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 23,
    marginBottom: 11,
  },
  familyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#281B43',
    borderRadius: 15,
    padding: 14,
    borderWidth: 1,
    borderColor: '#7044B8',
  },
  familyIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#39245C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  familyIcon: {
    fontSize: 27,
  },
  familyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  familyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  familySub: {
    color: '#B9ADC9',
    fontSize: 10,
    marginTop: 4,
  },
  familyAction: {
    color: '#D6A7FF',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 6,
  },
  arrow: {
    color: '#27D5F4',
    fontSize: 25,
  },
  membershipRow: {
    flexDirection: 'row',
    gap: 10,
  },
  memberCard: {
    flex: 1,
    padding: 11,
    borderRadius: 13,
    borderWidth: 1,
    minHeight: 125,
  },
  vipCard: {
    backgroundColor: '#29203A',
    borderColor: '#D4AE54',
  },
  nobleCard: {
    backgroundColor: '#29203A',
    borderColor: '#B987F5',
  },
  memberIcon: {
    fontSize: 26,
  },
  memberTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
  },
  memberSub: {
    color: '#B9ADC9',
    fontSize: 10,
    marginTop: 4,
  },
  memberAction: {
    color: '#27D5F4',
    fontWeight: 'bold',
    fontSize: 10,
    marginTop: 7,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageNumber: {
    color: '#92929B',
    fontSize: 11,
  },
  featurePage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 17,
    paddingHorizontal: 5,
    minHeight: 190,
  },
  featureItem: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  featureIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FFF1F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: {
    fontSize: 23,
    color: '#F12D91',
  },
  featureTitle: {
    color: '#92929B',
    fontSize: 10,
    marginTop: 7,
    textAlign: 'center',
  },
  pageDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    marginTop: 10,
  },
  pageDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#F5C6D9',
  },
  activePageDot: {
    backgroundColor: '#F12D91',
    width: 9,
    height: 9,
  },
  postTabs: {
    gap: 23,
    paddingVertical: 8,
  },
  postTab: {
    alignItems: 'center',
  },
  postTabText: {
    color: '#AAA1BF',
    fontSize: 15,
  },
  activePostTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  postTabUnderline: {
    width: 30,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#F12D91',
    marginTop: 5,
  },
  postToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  playAll: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  postCount: {
    color: '#AAA1BF',
    marginLeft: 7,
    fontSize: 12,
  },
  toolbarSpacer: {
    flex: 1,
  },
  toolbarIcon: {
    color: '#FFFFFF',
    fontSize: 25,
    marginLeft: 15,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 7,
  },
  postPlaceholder: {
    width: '31.8%',
    aspectRatio: 0.82,
    backgroundColor: '#211638',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postPlaceholderIcon: {
    color: '#F12D91',
    fontSize: 30,
  },
  postPlaceholderText: {
    color: '#AAA1BF',
    fontSize: 9,
    marginTop: 5,
  },
  footer: {
    color: '#817791',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 10,
  },
});