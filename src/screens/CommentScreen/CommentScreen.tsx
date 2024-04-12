import { FlatList, Text, View } from "react-native";
import data from '../../assets/data/comments.json'
import { Comment } from "../../components";

const CommentScreen = () => {
  return (
    <View style={{paddingHorizontal: 10}}>
      <FlatList data={data} renderItem={({item}) => {
        return (
          <Comment comment={item} fullDetails={true}/>
        )
      }} />
    </View>
  )
}

export default CommentScreen;
