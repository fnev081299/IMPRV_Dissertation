import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { Button, RadioButton } from "react-native-paper";

export default function CreateOption(props) {
  const [correct, setcorrect] = useState(props.correct);
  const [value, setvalue] = useState(props.value.value);
  useEffect(() => {
    setcorrect(props.correct);
  }, [props.correct]);
  console.log(correct);
  return (
    <View key={props.keys} style={{ flexDirection: "row" }}>
      <RadioButton
        onPress={() => {
          setcorrect(!correct);
          props.onChange({ value, correct: !correct });
        }}
        status={correct ? "checked" : "unchecked"}
      />
      <TextInput
        style={{ flex: 1, backgroundColor: "white" }}
        value={value}
        onChangeText={(value) => {
          setvalue(value);
          props.onChange({ value, correct });
        }}
      />
      <Button
        style={{ borderColor: "black", borderRadius: 5, borderStyle: "solid" }}
        onPress={() => {
          props.onDelete();
        }}
      >
        X
      </Button>
    </View>
  );
}
