import {StyleSheet} from 'react-native';
import fonts from '../../theme/fonts.ts';
import colors from '../../theme/colors.ts';

export default StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight: 40,
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  userInfoBlock: {
    alignItems: 'center',
  },
  infoValue: {
    fontWeight: fonts.weight.bold,
  },
  infoKey: {
    color: colors.grey,
  },
  bio: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    marginRight: 1,
    marginBottom: 1,
    maxWidth: '33%',
  },
});
