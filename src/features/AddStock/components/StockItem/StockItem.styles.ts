import {StyleSheet} from 'react-native';
import {colors} from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiary,
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  stockCodeText: {fontWeight: '500'},
  divider: {height: 1, backgroundColor: colors.white},
});
