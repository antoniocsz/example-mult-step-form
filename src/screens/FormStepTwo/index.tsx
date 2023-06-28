import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

import { styles } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AccountProps } from "../../contexts/AccountFormContext";
import { useAccountFormContext } from "../../hooks/useAccountForm";
import { Progress } from "../../components/Progess";

export function FormStepTwo() {
  const { updateFormData } = useAccountFormContext();
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>();

  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate("formStepThree");
  }

  const phoneRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Progress progess={60} />
      <Text style={styles.title}>Suas informações</Text>

      <Input
        icon="calendar"
        error={errors.birth?.message}
        formProps={{
          control,
          name: "birth",
          rules: {
            required: "Data de nascimento é obrigatório",
            pattern: {
              value: /^\d{2}-\d{2}-\d{4}$/,
              message: "Data de nascimento inválida.",
            },
          },
        }}
        inputProps={{
          placeholder: "Data de nasicmento",
          onSubmitEditing: () => phoneRef.current?.focus(),
          returnKeyType: "next",
        }}
      />

      <Input
        ref={phoneRef}
        icon="phone"
        error={errors.phone?.message}
        formProps={{
          control,
          name: "phone",
          rules: {
            required: "Telefone é obrigatório",
            pattern: {
              value:
                /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/,
              message: "Telefone inválido.",
            },
          },
        }}
        inputProps={{
          placeholder: "Telefone",
          onSubmitEditing: () => handleSubmit(handleNextStep),
        }}
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </View>
  );
}
