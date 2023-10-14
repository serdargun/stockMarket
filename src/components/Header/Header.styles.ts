import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  leftButton: {flexDirection: 'row', alignItems: 'center'},
  leftButtonLabel: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: '600',
    color: colors.secondary,
  },
});
