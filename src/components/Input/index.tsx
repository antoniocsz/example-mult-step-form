import { TextInput, TextInputProps, View, Text } from "react-native";
import { Feather } from '@expo/vector-icons'
import { styles } from "./styles";
import { Controller, UseControllerProps } from "react-hook-form";
import { forwardRef } from "react";
import  clsx from 'clsx'


type Props = {
  error?: string,
  icon: keyof typeof Feather.glyphMap
  formProps: UseControllerProps
  inputProps: TextInputProps
}

const Input = forwardRef<TextInput, Props>(({ icon, formProps, inputProps, error = '' }, ref) => {
  return (
    <Controller
      render={({ field: {
        onChange,
        onBlur,
        value
      } }) => (
        <View style={styles.container}>
          <View style={styles.group}>
            <View style={styles.icon}>
              <Feather name={icon} size={24} color={clsx({
                ["#DC1637"]: error.length > 0,
                ["#8257e5"]: value && error.length === 0,
                ["#999999"]: !value && error.length === 0,
              })} />
            </View>

            <TextInput
              ref={ref}
              style={styles.control}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              {...inputProps}
            />
          </View>

          {error.length > 0 && (<Text style={styles.error}>{error}</Text>)}
        </View>
      )}
      {...formProps}
    />
  )
})

export { Input }