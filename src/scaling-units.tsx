import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const shortDimension: number = Math.min(width, height);
const longDimension: number = Math.max(width, height);

export const createScalers = (
  baseWidth: number = 350,
  baseHeight: number = 680
) => {
  const guidelineBaseWidth: number = baseWidth;
  const guidelineBaseHeight: number = baseHeight;

  const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
  const verticalScale = (size: number) =>
    (longDimension / guidelineBaseHeight) * size;
  const moderateScale = (
    size: number,
    factor: number | string | undefined = 0.5
  ) => size + (scale(size) - size) * Number(factor);
  const moderateVerticalScale = (
    size: number,
    factor: number | string | undefined = 0.5
  ) => size + (verticalScale(size) - size) * Number(factor);

  return {
    sw: scale,
    sh: verticalScale,
    mw: moderateScale,
    mh: moderateVerticalScale,
    scaleWidth: scale,
    scaleHeight: verticalScale,
    moderateScaleWidth: moderateScale,
    moderateScaleHeight: moderateVerticalScale,
  };
};
