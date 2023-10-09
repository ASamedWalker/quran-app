import React from "react";
import { View, Text, Modal } from "react-native";

interface FontPickerProps {
  isVisible: boolean;
  onSelectFont: (fontName: string) => void;
  // Add other props if needed
}

const FontPicker: React.FC<FontPickerProps> = ({ isVisible, onSelectFont }) => (
  <Modal visible={isVisible} animationType="slide">
    <View>
      <Text onPress={() => onSelectFont("System")}>System</Text>
      {/* Render other fonts similarly and style accordingly */}
    </View>
  </Modal>
);

export default FontPicker;
