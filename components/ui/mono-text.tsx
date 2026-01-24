import { TextProps } from "react-native";
import {Txt} from "./texts";

// TODO: move in Txt before using
export function MonoText(props: TextProps) {
  return <Txt {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}
