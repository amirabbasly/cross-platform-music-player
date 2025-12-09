import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';

const stories = [
  { id: '1', username: 'your_story', profilePic: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', username: 'coderqueen', profilePic: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', username: 'techguy', profilePic: 'https://randomuser.me/api/portraits/men/3.jpg' },
];

const posts = [
  {
    id: '1',
    username: 'amirabbas_dev',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
    postImage: 'https://picsum.photos/600/400?random=1',
    caption: 'Never stop building 💻🔥',
    likes: 120,
    comments: [
      { id: 'c1', username: 'user1', text: 'Amazing work!' },
      { id: 'c2', username: 'user2', text: 'Love this 🔥' },
    ],
  },
  {
    id: '2',
    username: 'coderqueen',
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
    postImage: 'https://picsum.photos/600/400?random=2',
    caption: 'New UI drop 🚀🎨',
    likes: 85,
    comments: [
      { id: 'c3', username: 'user3', text: 'Super cool design!' },
    ],
  },
];

const App = () => {
  const [postData, setPostData] = useState(posts);
  const [commentText, setCommentText] = useState({});

  const handleLike = (postId) => {
    setPostData((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked } : post
      )
    );
  };

  const handleAddComment = (postId) => {
    if (!commentText[postId]) return;
    setPostData((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: `c${post.comments.length + 1}`, username: 'current_user', text: commentText[postId] },
              ],
            }
          : post
      )
    );
    setCommentText((prev) => ({ ...prev, [postId]: '' }));
  };

  const renderStory = ({ item }) => (
    <View style={styles.storyContainer}>
      <Image source={{ uri: item.profilePic }} style={styles.storyPic} />
      <Text style={styles.storyUsername}>{item.username}</Text>
    </View>
  );

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
        <Text style={styles.username}>{item.username}</Text>
      </View>

      <Image source={{ uri: item.postImage }} style={styles.postImage} />

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          <AntDesign name={item.liked ? 'heart' : 'hearto'} size={24} color={item.liked ? 'red' : 'white'} />
        </TouchableOpacity>
        <Feather name="message-circle" size={24} color="white" style={styles.actionIcon} />
        <Feather name="send" size={24} color="white" style={styles.actionIcon} />
      </View>

      <Text style={styles.likes}>{item.likes} likes</Text>
      <Text style={styles.caption}>
        <Text style={styles.username}>{item.username}</Text> {item.caption}
      </Text>

      <View style={styles.commentSection}>
        {item.comments.map((comment) => (
          <View key={comment.id} style={styles.comment}>
            <Text style={styles.commentUsername}>{comment.username}</Text>
            <Text style={styles.commentText}>{comment.text}</Text>
          </View>
        ))}
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            placeholderTextColor="#888"
            value={commentText[item.id] || ''}
            onChangeText={(text) => setCommentText((prev) => ({ ...prev, [item.id]: text }))}
          />
          <TouchableOpacity onPress={() => handleAddComment(item.id)}>
            <Text style={styles.postCommentButton}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>Instagram</Text>
        <TouchableOpacity>
          <Feather name="inbox" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        ListHeaderComponent={
          <View style={styles.storiesContainer}>
            <FlatList
              data={stories}
              renderItem={renderStory}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.stories}
            />
          </View>
        }
        data={postData}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        style={styles.feed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  logo: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  storiesContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  stories: {
    paddingHorizontal: 10,
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  storyPic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ff8501',
  },
  storyUsername: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  feed: {
    flex: 1,
  },
  postContainer: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profilePic: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  actionIcon: {
    marginLeft: 15,
  },
  likes: {
    color: 'white',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  caption: {
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  commentSection: {
    paddingHorizontal: 10,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  commentUsername: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentText: {
    color: 'white',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 10,
  },
  commentInput: {
    flex: 1,
    color: 'white',
    backgroundColor: '#222',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  postCommentButton: {
    color: '#0095f6',
    fontWeight: 'bold',
  },
});

export default App;