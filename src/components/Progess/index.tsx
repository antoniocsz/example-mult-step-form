import { View } from "react-native";
import { styles } from "./styles";

type Props = {
  progess: number;
};

export function Progress({ progess }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progess}%` }]} />
    </View>
  );
}
