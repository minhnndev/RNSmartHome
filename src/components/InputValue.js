import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import {COLORS} from '../utils/theme';

export default function InputValue({
  title,
  icon,
  isPassword,
  onChangeText,
  keyboardType,
  value,
}) {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {title} </Text>
      <View style={styles.inputContainer}>
        <Icons name={icon} size={22} color="#d3d4d5" />
        <TextInput
          style={styles.input}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={isPassword ? visible : !visible}
          value={value}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => {
              setShow(!show);
              setVisible(!visible);
            }}>
            <Icons
              name={show === false ? 'eye' : 'eye-off'}
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d3d4d5',
    borderRadius: 3,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputContent: {
    backgroundColor: '#f8f9fa',
    borderColor: '#d3d4d5',
    borderWidth: 1,
    borderRadius: 3,
  },
  title: {
    color: '#8a8b8c',
    fontWeight: '400',
    marginVertical: 8,
    fontSize: 14,
  },
  input: {
    flex: 1,
  },
});
