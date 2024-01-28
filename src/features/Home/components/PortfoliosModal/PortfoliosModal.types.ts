import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface PortfoliosModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PortfolioItemProps {
  portfolio: FirebaseFirestoreTypes.DocumentData;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  getUserPortfolios: () => void;
}

export interface AddPortfolioProps {
  getUserPortfolios: () => void;
}
