/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {AudioDetectionWindowConfig, BruxismAttackDetector, BruxismAttackSingleReport, MuscleDetectionWindowConfig} from './BruxtestReactNativeLib/src/BruxtestAnalysis/components';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onAttackOccurance = (data: BruxismAttackSingleReport): void => {
    console.log(data);
  };

  const onDetectionStarted = () => {
    console.log('onDetectionStarted');
  };

  const onDetectionStopped = () => {
    console.log('onDetectionStopped');
  };

  // Detection window means that we have any audio on this frequency range in this db intensity for given time in ms
  const audioDetectionWindowConfig: AudioDetectionWindowConfig = {
    attack: [
      {
        xValStart: 900, //frequency in Hz - start of the detection including that frequency
        xValEnd: 1000, //frequency in Hz - end of the detection window including that frequency
        yValStart: 80, //db - how loud the signal should be on the lowest loudness
        yValEnd: 100, //db - how loud the signal should be on the top loudness
        time: 3000, // ms - how long should we have signal of such strength
      },
    ], // how long a window on what frequencies and how loud in db has to be triggered to detect start of attack, any of the provided in array
    sustain: [
      {
        xValStart: 850, //frequency in Hz - start of the detection including that frequency
        xValEnd: 1050, //frequency in Hz - end of the detection window including that frequency
        yValStart: 50, //db - how loud the signal should be on the lowest loudness
        yValEnd: 100, //db - how loud the signal should be on the top loudness
        time: 1000, // ms - how long should we have signal of such strength
      },
    ], //how long a window on what frequencies and how loud in db has to be triggered to detect continuation of attack (values should be more relaxed)
    release: 2000, //ms - how long after exiting a sustain window we should still capture
  };

  const muscleDetectionWindowConfig: MuscleDetectionWindowConfig = {
    attack: [
      {
        yValStart: 3000, //0 - 4095
        yValEnd: 4095, //0 - 4095
        time: 1000, //ms
      },
    ], // How do we find the start of the attack
    systain: [
      {
        yValStart: 2500, //0 - 4095
        yValEnd: 4095, //0 - 4095
        time: 1000, //ms
      },
    ], // How do we find middle of the attack
    release: 2000, // ms - how long after exiting a sustain window we should capture
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <BruxismAttackDetector
            showPlot={true}
            showRecording={true}
            showConnectionDialog={true}
            host={'192.168.0.182'}
            port={8080}
            onAttackOccurance={onAttackOccurance}
            onDetectionStarted={onDetectionStarted}
            onDetectionStopped={onDetectionStopped}
            audioDetectionWindowConfig={audioDetectionWindowConfig}
            muscleDetectionWindowConfig={muscleDetectionWindowConfig}
            // callbacks={
            // } You can add them if needed access to raw data from the device live
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
