import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => (
  <View>
    (
    <View style={styles.errorContainer}>
      <Text>Error fetching data</Text>
      <Pressable
        onPress={() => quranQuery.refetch()}
        style={styles.retryButton}
      >
        <Text style={styles.retryButtonText}>Retry</Text>
      </Pressable>
    </View>
    );
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7ede2", // Customize the error container style
  },
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#A37C27",
    borderRadius: 8,
    elevation: 3,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ErrorState;
