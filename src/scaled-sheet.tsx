import { StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import deepMap from './deep-map';
import { createScalers } from './scaling-units';
import type { StyleProp } from 'react-native';

const validScaleSheetRegex =
  /^(\-?\d+(?:\.\d{1,3})?)@(mv?s(\d+(?:\.\d{1,2})?)?|s|vs)r?$/;

type BaseStyle = StyleProp<ViewStyle | TextStyle | ImageStyle | any>;

const scaledSheetCreator = (baseWidth = 350, baseHeight = 680) => {
  const { s, vs, ms, mvs } = createScalers(baseWidth, baseHeight);

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
    console.log('scaleFacto1r', scaleFunc);
    if (scaleFactor) scaleFunc = scaleFunc.slice(0, -scaleFactor.length); // Remove the factor from it

    console.log(
      'scaleFactor',
      scaleFunc,
      typeof scaleFactor,
      Number(scaleFactor)
    );
    const shouldRound = value.endsWith('r');

    let result: number = 0;

    switch (scaleFunc) {
      case 's':
        result = s(size);
        break;
      case 'vs':
        result = vs(size);
        break;
      case 'ms':
        result = ms(size, scaleFactor);
        break;
      case 'mvs':
        result = mvs(size, scaleFactor);
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
