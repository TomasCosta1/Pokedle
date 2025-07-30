import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COMPARISON_COLORS } from '../constants/gameConstants';

const AttributeCell = ({ value, comparison, isNumeric = false }) => {
  let backgroundColor = COMPARISON_COLORS.WHITE;
  let arrow = '';

  switch (comparison) {
    case 'green':
      backgroundColor = COMPARISON_COLORS.GREEN;
      break;
    case 'orange':
      backgroundColor = COMPARISON_COLORS.ORANGE;
      break;
    case 'red':
      backgroundColor = COMPARISON_COLORS.RED;
      break;
    case 'red-up':
      backgroundColor = COMPARISON_COLORS.RED;
      arrow = ' ↑';
      break;
    case 'red-down':
      backgroundColor = COMPARISON_COLORS.RED;
      arrow = ' ↓';
      break;
  }

  return (
    <View style={[styles.cell, { backgroundColor }]}>
      <Text style={styles.cellText}>
        {value || 'Ninguno'}{arrow}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    minHeight: 20,
  },
  cellText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default AttributeCell; 