import {StyleSheet} from 'react-native';
import {colors} from '../../../../constants';

export const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: colors.tertiary,
    paddingBottom: 20,
  },
  container: {flex: 1, justifyContent: 'space-between'},
  stockCodeText: {textAlign: 'center', fontSize: 36, fontWeight: '500'},
  stockPriceText: {textAlign: 'center', fontSize: 28, fontWeight: '400'},
  stockInput: {
    fontSize: 50,
    color: colors.quaternary,
    textAlign: 'center',
    fontWeight: '700',
  },
  stockUnitText: {
    textAlign: 'center',
    color: colors.quaternary,
    fontSize: 22,
    fontWeight: '500',
  },
});
