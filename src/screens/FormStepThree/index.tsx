import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

import { styles } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { AccountProps } from "../../contexts/AccountFormContext";
import { useAccountFormContext } from "../../hooks/useAccountForm";
import { useNavigation } from "@react-navigation/native";
import { Progress } from "../../components/Progess";

export function FormStepThree() {
  const { updateFormData } = useAccountFormContext();
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<AccountProps>();

  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate("finish");
  }

  function validationPasswordConfirmation(confirmPassword: string) {
    const { password } = getValues();

    return password === confirmPassword || "As senhas devem ser iguais.";
  }

  const confirmPasswordRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Progress progess={90} />
      <Text style={styles.title}>Escolha sua senha</Text>

      <Input
        icon="lock"
        error={errors.password?.message}
        formProps={{
          control,
          name: "password",
          rules: {
            required: "Senha é obrigatório",
            minLength: {
              value: 6,
              message: "A senha deve ter no mínimo 6 dígitos.",
            },
          },
        }}
        inputProps={{
          placeholder: "Senha",
          onSubmitEditing: () => confirmPasswordRef.current?.focus(),
          returnKeyType: "next",
          secureTextEntry: true,
        }}
      />

      <Input
        ref={confirmPasswordRef}
        icon="mail"
        error={errors.confirmPassword?.message}
        formProps={{
          control,
          name: "confirmPassword",
          rules: {
            required: "Confirme a senha.",
            validate: validationPasswordConfirmation,
          },
        }}
        inputProps={{
          placeholder: "Confirme a senha",
          onSubmitEditing: () => handleSubmit(handleNextStep),
          secureTextEntry: true,
        }}
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </View>
  );
}
