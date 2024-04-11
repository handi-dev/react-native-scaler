import { StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import deepMap from './deep-map';
import { createScalers } from './scaling-units';
import type { StyleProp } from 'react-native';

const validScaleSheetRegex =
  /^(\-?\d+(?:\.\d{1,3})?)@(mv?s(\d+(?:\.\d{1,2})?)?|s|vs)r?$/;

type BaseStyle = StyleProp<ViewStyle | TextStyle | ImageStyle | any>;

const scaledSheetCreator = (baseWidth = 350, baseHeight = 680) => {
  const { sw, sh, mw, mh } = createScalers(baseWidth, baseHeight);

  const scaleByAnnotation = (value: string) => {
    if (!validScaleSheetRegex.test(value)) {
      return value;
    }

    const regexExecResult: RegExpExecArray | null =
      validScaleSheetRegex.exec(value);

    if (!regexExecResult || !regexExecResult[1] || !regexExecResult[2]) {
      return value;
    }

    const size = parseFloat(regexExecResult[1]);
    let scaleFunc = regexExecResult[2];
    const scaleFactor = regexExecResult?.[3]; // string or undefined

    if (scaleFactor) scaleFunc = scaleFunc.slice(0, -scaleFactor.length); // Remove the factor from it

    const shouldRound = value.endsWith('r');

    let result: number = 0;

    switch (scaleFunc) {
      case 'sw':
        result = sw(size);
        break;
      case 'sh':
        result = sh(size);
        break;
      case 'mw':
        result = mw(size, scaleFactor);
        break;
      case 'mh':
        result = mh(size, scaleFactor);
        break;
    }

    return shouldRound ? Math.round(result) : result;
  };

  return {
    create: (styleSheet: { [key: string]: BaseStyle }) =>
      StyleSheet.create(deepMap(styleSheet, scaleByAnnotation)),
  };
};

export default scaledSheetCreator;
