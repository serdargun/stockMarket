import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {backgroundColor: colors.white, flex: 1},
  content: {paddingHorizontal: 20, justifyContent: 'space-between', flex: 1},
  headingImage: {width: '100%', height: '70%', alignSelf: 'center'},
});
