import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingState: React.FC = () => (
  <View>
    <ActivityIndicator size="large" color="#00ff00" />
    {/* Add other components and styles if needed */}
  </View>
);

export default LoadingState;
