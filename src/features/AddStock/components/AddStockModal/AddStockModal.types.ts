import {LiveStock} from '../../../Home/Home.types';

export interface AddStockModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  selectedStock: LiveStock;
}
