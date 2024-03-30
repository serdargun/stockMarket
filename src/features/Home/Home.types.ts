export interface LiveStock {
  code: string;
  name: string;
  percent: string;
  price: string;
  time: string;
  volumeP: string;
}

export interface PortfolioStock {
  lot: number;
  color: string;
  cost: number;
  code: string;
}

export interface PortfolioStockWithPrice extends PortfolioStock {
  price: number;
}

export interface PortfolioStockWithPriceAndPercent
  extends PortfolioStockWithPrice {
  id: number;
  percent: number;
}
