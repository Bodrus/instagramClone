import {StyleSheet} from 'react-native';
import fonts from '../../theme/fonts.ts';
import colors from '../../theme/colors.ts';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    marginRight: 'auto',
    fontWeight: fonts.weight.full,
  },
  threeDots: {},

  image: {
    width: '100%',
    aspectRatio: 1,
  },
  footer: {
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: colors.black,
    lineHeight: 18,
  },
  textGrey: {
    color: colors.grey
  },
  boldText: {
    fontWeight: fonts.weight.bold,
  },
});
