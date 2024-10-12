import Colors from '../Assets/Colors';
import Fonts from '../Assets/Fonts';
import {Responsive} from '../Assets/Responsive';

export const headerStyle = {
  fontFamily: Fonts.semiBold,
  fontSize: Responsive(14),
  color: Colors.primaryColor,
};

export const mediumTextStyle = {
  fontFamily: Fonts.medium,
  fontSize: Responsive(12),
  color: Colors.textGrayColor,
};
export const regularTextStyle = {
  fontFamily: Fonts.regular,
  fontSize: Responsive(11),
  color: Colors.textGrayColor,
};

export const infoTextStyle = {
  fontFamily: Fonts.regular,
  fontSize: Responsive(10),
  color: Colors.textGrayColor,
};
