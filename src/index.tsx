import scaledSheetCreator from './scaled-sheet';
import { createScalers } from './scaling-units';
export { scaledSheetCreator, createScalers };

export const initScalers = (
  baseWidth: number = 350,
  baseHeight: number = 680
) => {
  const ScaledSheet = scaledSheetCreator(baseWidth, baseHeight);
  const scalerData = createScalers(baseWidth, baseHeight);
  return {
    ScaledSheet,
    ...scalerData,
  };
};
