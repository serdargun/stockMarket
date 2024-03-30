import {StyleSheet} from 'react-native';
import {colors} from '../../../../../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.tertiary,
  },
  leftColumn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coloredBullet: {
    width: 15,
    height: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  stockCode: {fontWeight: '600'},
  currentPrice: {fontWeight: '500'},
  rightColumnInfoText: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.secondary,
  },
  negativeTextStyle: {
    color: colors.error,
  },
  equalTextStyle: {
    color: colors.quaternary,
  },
});
