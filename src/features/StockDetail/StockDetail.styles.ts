import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../constants';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  infoBox: {
    width: width / 2 - 20,
  },
  infoBoxTitle: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 4,
  },
  infoBoxValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  positiveValue: {
    color: colors.secondary,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
