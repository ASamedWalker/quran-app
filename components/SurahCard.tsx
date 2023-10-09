import React from 'react';
import { View, Text, Animated } from 'react-native';

interface SurahCardProps {
  scale: Animated.Value;
  name: string;
  translation: string;
  onPressIn: () => void;
  onPressOut: () => void;
}

const SurahCard: React.FC<SurahCardProps> = ({ scale, name, translation, onPressIn, onPressOut }) => (
  <Animated.View style={{ transform: [{ scale: scale }] }}>
    <Text>{name}</Text>
    <Text>{translation}</Text>
    {/* Add other relevant components and styles here */}
  </Animated.View>
);

export default SurahCard;
