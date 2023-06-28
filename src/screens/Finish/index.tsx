import { View , Text } from "react-native";
import { useAccountFormContext } from "../../hooks/useAccountForm";

export function Finish() {
  const { accountFormData } = useAccountFormContext()


  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>
        Nome: {accountFormData.name}
      </Text>
      
      <Text>
        E-mail: {accountFormData.email}
      </Text>
      
      <Text>
        Data de nascimento: {accountFormData.birth}
      </Text>
      
      <Text>
        Telefone: {accountFormData.phone}
      </Text>
      
      <Text>
        Senha: {accountFormData.password} /  {accountFormData.confirmPassword} 
      </Text>
      
    </View>
  )
}