import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { AccountProps } from "../../contexts/AccountFormContext";
import { useAccountFormContext } from "../../hooks/useAccountForm";
import { Progress } from "../../components/Progess";

export function FormStepOne() {
  const { updateFormData } = useAccountFormContext();
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>();

  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate("formStepTwo");
  }

  const emailRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Progress progess={30} />
      <Text style={styles.title}>Criar sua conta</Text>

      <Input
        icon="user"
        error={errors.name?.message}
        formProps={{
          control,
          name: "name",
          rules: {
            required: "Nome é obrigatório",
          },
        }}
        inputProps={{
          placeholder: "Nome",
          onSubmitEditing: () => emailRef.current?.focus(),
          returnKeyType: "next",
        }}
      />

      <Input
        ref={emailRef}
        icon="mail"
        error={errors.email?.message}
        formProps={{
          control,
          name: "email",
          rules: {
            required: "Email é obrigatório",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Email inválido",
            },
          },
        }}
        inputProps={{
          placeholder: "Email",
          onSubmitEditing: () => handleSubmit(handleNextStep),
        }}
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </View>
  );
}
