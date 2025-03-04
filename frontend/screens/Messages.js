import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const messages = [
  {
    id: "1",
    name: "Jessica Lee",
    image: require("../assets/profile2.png"),
    lastMessage: "Hey, how are you doing?",
    time: "5 min ago",
    unread: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    image: require("../assets/profile3.png"),
    lastMessage: "Would you like to meet for coffee tomorrow?",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: "3",
    name: "Sarah Johnson",
    image: require("../assets/profile4.png"),
    lastMessage: "That sounds great! Looking forward to it.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "4",
    name: "David Wilson",
    image: require("../assets/profile5.png"),
    lastMessage: "Thanks for the recommendation!",
    time: "2 days ago",
    unread: false,
  },
]

const Messages = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem} onPress={() => navigation.navigate("Chat", { user: item })}>
      <View style={styles.avatarContainer}>
        <Image source={item.image} style={styles.avatar} />
        {item.unread && <View style={styles.unreadBadge} />}
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.messageName}>{item.name}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        <Text style={[styles.messageText, item.unread && styles.unreadMessageText]} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      {messages.length > 0 ? (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="chatbubble-ellipses-outline" size={60} color="#e8e6ea" />
          <Text style={styles.emptyText}>No messages yet</Text>
          <Text style={styles.emptySubtext}>Start matching with people to begin messaging</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
  },
  messagesList: {
    padding: 15,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  unreadBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#e94057",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  messageName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  messageTime: {
    fontSize: 12,
    color: "#adafbb",
  },
  messageText: {
    fontSize: 14,
    color: "#adafbb",
  },
  unreadMessageText: {
    color: "#323755",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#323755",
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#adafbb",
    textAlign: "center",
    marginTop: 10,
  },
})

export default Messages

