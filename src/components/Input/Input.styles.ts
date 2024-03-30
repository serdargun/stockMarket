import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.tertiary,
    borderRadius: 10,
    padding: 10,
    flexGrow: 1,
  },
  focusedContainer: {
    borderColor: colors.primary,
  },
  input: {
    fontSize: 16,
    color: colors.quaternary,
  },
});
