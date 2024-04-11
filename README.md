# React-Native-Scaler

`react-native-scaler` is a library that provides a set of scaling functions to help you make your React Native app responsive. It exports an `initScalers` function that returns four scaling functions: `scaleWidth`, `scaleHeight`, `moderateScaleWidth`, and `moderateScaleHeight`.

## Installation

```bash
npm install react-native-scaler
```

OR

```bash
yarn add react-native-scaler
```

## Initialization

Import the `initScalers` function from the `react-native-scaler` library and initialize it with the base width and height of your design layout.

```javascript
import { initScalers } from 'react-native-scaler';

const { scaleWidth, scaleHeight, moderateScaleWidth, moderateScaleHeight } =
  initScalers(350, 680);
```

The numbers `350` and `680` represent the base width and height (in dp) of your design layout. You can adjust these values according to your needs.

You can also initialize without passing any arguments, in which case the default base width and height will be used.

```javascript
const { scaleWidth, scaleHeight, moderateScaleWidth, moderateScaleHeight } =
  initScalers();
```

Additionally, you can use the shorthand notation for the scaling functions:

```javascript
const { sw, sh, mw, mh } = initScalers();
```

## Usage

After initialization, you can use the scaling functions in your components to scale dimensions according to the device's screen size.

```javascript
const styles = StyleSheet.create({
  container: {
    width: sw(50), //same as scaleWidth(50)
    height: sh(100), //same as scaleHeight(50)
  },
});
```

You can also use the `moderateScaleWidth` and `moderateScaleHeight` functions with an optional factor. For example:

```javascript
const styles = StyleSheet.create({
  container: {
    width: mw(50, 0.3),
    height: mh(100, 0.7),
  },
});
```

## Functions

The `initScalers` function returns four scaling functions:

- `scaleWidth (sw)`: Scales a value based on the device's screen width.
- `scaleHeight (sh)`: Scales a value based on the device's screen height.
- `moderateScaleWidth (mw)`: Provides moderate scaling based on the device's screen width. It takes two parameters: `size` and an optional `factor`.
- `moderateScaleHeight (mh)`: Provides moderate scaling based on the device's screen height. It takes two parameters: `size` and an optional `factor`.

Each of these functions takes a number as an argument and returns a scaled number.

## ScaledSheet

The `ScaledSheet` is a special feature of `react-native-scaler` that allows you to automatically apply the scale functions in your stylesheets. It takes the same styles object as a regular `StyleSheet`, but with an optional annotation that applies the scale functions for you.

```javascript
const { ScaledSheet, scaleWidth } = initScalers();

const styles = ScaledSheet.create({
  container: {
    width: '50@sw', //same as scaleWidth(50)
    height: '100@sh', //same as scaleHeight(100)
  },
});
```

In the above example, `50@sw` applies the `scaleWidth` function to the size `50`, and `100@sh` applies the `scaleHeight` function to the size `100`.

You can also use `@mw` and `@mh` to apply `moderateScaleWidth` and `moderateScaleHeight` respectively, with a resize factor of `0.5`. If you want to specify a different resize factor, you can do so by appending it after `@mw` or `@mh`, like `50@mw0.3`.

Here is an example of using `ScaledSheet` with `moderateScaleWidth` and `moderateScaleHeight` with a resize factor:

```javascript
const styles = ScaledSheet.create({
  container: {
    padding: '10@mw0.3', // = moderateScaleWidth(10, 0.3)
    width: '50@mw', // = moderateScaleWidth(50)
    padding: '2@mw', // moderateScaleWidth(2)
  },
});
```

## Best Practices

It's recommended to initialize the scaler in a specific file or hook, so it can be reused across different components, instead of initializing it in every page. Here's an example of how you can do this:

```javascript
// scaler.js
import { initScalers } from 'react-native-scaler';

export const { sw, sh, mw, mh, ScaledSheet } = initScalers();
```

Then, in your component file, you can import the scaling functions and `ScaledSheet` from `scaler.js`:

```javascript
// MyComponent.js
import { sw, sh, mw, mh, ScaledSheet } from './scaler';

const styles = ScaledSheet.create({
  container: {
    width: '50@sw',
    height: '100@sh',
  },
});
```

This way, you can ensure that the scaling functions are consistently applied across your app.

## Conclusion

The `react-native-scaler` library provides a simple and effective way to make your React Native app responsive. By using the scaling functions and the `ScaledSheet` feature it provides, you can ensure that your app looks great on devices with different screen sizes.
