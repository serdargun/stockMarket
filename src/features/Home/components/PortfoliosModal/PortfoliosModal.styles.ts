import {StyleSheet} from 'react-native';
import {colors} from '../../../../constants';

export const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between'},
  portfolioName: {
    color: colors.quaternary,
    fontSize: 18,
    fontWeight: '500',
  },
  portfolioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
  },
  select: {
    color: colors.secondary,
  },
  remove: {
    color: colors.error,
  },
  add: {
    color: colors.primary,
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  addPortfolioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
});
