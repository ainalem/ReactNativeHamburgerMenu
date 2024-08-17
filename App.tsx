import React, {useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Path, Svg} from 'react-native-svg';

// Wrap path to make it animatable
const AnimatedPath = Animated.createAnimatedComponent(Path);

function App(): React.JSX.Element {
  const [anim] = useState(new Animated.Value(0));
  const [open, setOpen] = useState(false);

  const easing = Easing.bezier(0.4, 0, 0.2, 1);
  const toggleAnimation = () => {
    Animated.timing(anim, {
      toValue: open ? 0 : 1,
      duration: 400,
      easing,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  // Interpolations for the hamburger menu
  const partInterpolation1 = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['M 3,12.5 3.01,12.5', 'M 3,3 3.001,3', 'M 3,3 12.5,12.5'],
  });
  const partInterpolation2 = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      'M 12.5,12.5 12.5005,12.5 12.501,12.5',
      'M 12.5,12.5 12.5005,12.5 12.501,12.5',
      'M 3,22 12.5,12.5 22,3',
    ],
  });
  const partInterpolation3 = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      'M 22,12.5 22.01,12.5',
      'M 22,22 22.01,22',
      'M 12.5,12.5 22,22',
    ],
  });
  // Interpolations for the menu sheet
  const sheetInterpolation = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').width * -1, 0],
  });
  const sheetAnimationStyle = {
    transform: [
      {
        translateX: sheetInterpolation,
      },
    ],
  };

  return (
    <>
      {/* Main content */}
      <SafeAreaView style={styles.backgroundStyle}>
        <View style={styles.container}>
          <View style={styles.topBar}>
            {/* Back icon */}
            <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
              <Path
                d="M 17,3 L 8,12.5 L 17,22"
                fill="none"
                stroke="#282828"
                strokeWidth={3}
                strokeLinecap="round"
              />
            </Svg>
            <View>
              <Text style={styles.title}>Urban Suburban</Text>
            </View>
            {/* Hamburger (ellipsis) menu */}
            <Pressable onPress={toggleAnimation}>
              <View style={styles.hamburger}>
                <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <AnimatedPath
                    d={partInterpolation1}
                    fill="none"
                    stroke="#282828"
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                  <AnimatedPath
                    d={partInterpolation2}
                    fill="none"
                    stroke="#282828"
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                  <AnimatedPath
                    d={partInterpolation3}
                    fill="none"
                    stroke="#282828"
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
            </Pressable>
          </View>
          <Image
            source={require('./pexels-mika-borgia-562014-1317712.jpg')}
            style={styles.productImage}
          />
          <View style={styles.productTitleContainer}>
            <Text style={styles.productTitle}>Plain yellow leather jacket</Text>
          </View>
          <View style={styles.productReviewContainer}>
            <Text style={styles.productReview}>
              ⭐️ <Text style={styles.productReviewNumber}>4.7</Text>
              <Text style={styles.productReviewNumbers}>
                {' - 201 reviews'}
              </Text>
            </Text>
          </View>
          <View style={styles.productDescriptionContainer}>
            <Text style={styles.productDescription}>
              It's plain, it's yellow, it's a leather jacket. What more could
              you ask for?
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>R 3995</Text>
            </View>
            <View style={styles.addToCartContainer}>
              <Text style={styles.addToCart}>Add to Cart</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      {/* Menu sheet */}
      <SafeAreaView style={styles.menuSheetContainer} pointerEvents="none">
        <Animated.View style={[styles.menuSheet, sheetAnimationStyle]}>
          <View style={styles.menuContainer}>
            <Text style={styles.menuText}>Women</Text>
            <Text style={styles.menuText}>Men</Text>
            <Text style={styles.menuText}>Kids</Text>
            <Text style={styles.menuText}>Sport</Text>
            <Text style={styles.menuText}>Beauty</Text>
            <Text style={styles.menuText}>Home</Text>
          </View>
        </Animated.View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 20,
    paddingTop: 15,
    width: '100%',
  },
  back: {
    backgroundColor: '#000',
    height: 25,
    width: 25,
  },
  title: {
    color: '#282828',
    fontSize: 24,
    fontWeight: 'bold',
  },
  hamburger: {
    alignItems: 'center',

    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  productImage: {
    borderRadius: 20,
    height: 300,
    marginTop: 20,
    marginHorizontal: 20,
    width: 360,
  },
  productTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    width: '100%',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
  },
  productReviewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 15,
    width: '100%',
  },
  productReview: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  productReviewNumber: {
    color: '#282828',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productReviewNumbers: {
    color: '#445465',
    fontSize: 16,
  },
  productDescriptionContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    width: '100%',
  },
  productDescription: {
    color: '#445465',
    fontSize: 16,
    lineHeight: 30,
    marginTop: 20,
  },
  bottomContainer: {
    alignItems: 'flex-start',
    marginTop: 'auto',
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  priceContainer: {
    paddingBottom: 15,
  },
  price: {
    color: '#282828',
    fontSize: 30,
    fontWeight: 'bold',
  },
  addToCartContainer: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    marginTop: 'auto',
    width: 360,
  },
  addToCart: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuSheetContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  menuSheet: {
    flex: 1,
    marginTop: 70,
    backgroundColor: '#000',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    height: 60,
  },
});

export default App;
