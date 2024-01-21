export interface AddStockModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  selectedStock: SelectedStockType;
}

export interface StockType {
  code: string;
  lot: number;
  cost: number;
  color: string;
}
