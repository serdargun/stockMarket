import {LiveStock} from '../../../Home/Home.types';

export interface StockItemProps {
  data: LiveStock;
  onItemPress: () => void;
}
