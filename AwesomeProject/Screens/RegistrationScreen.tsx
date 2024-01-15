
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, ImageBackground, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Dimensions, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
const imageBg = require("../assets/images/pexels-pixabay-36729.jpg");
import IconAdd from "../Components/IconAdd";
import IconDel from "../Components/IconDel";
import * as ImagePicker from "expo-image-picker";



export default function RegistrationScreen() {
  //  const dispatch = useDispatch();
   const [isShowkeyboard, setIsShowkeyboard] = useState(false);
   const [login, setLogin] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordShown, setPasswordShown] = useState(true);

   
   const [avatar, setAvatar] = useState(null);

   const [isFocused, setIsFocused] = useState(false);
   const handleFocus = useCallback(() => {
     setIsShowkeyboard(true);
     setIsFocused(!isFocused);
   }, [isFocused]);

   const loginHandler = (text:string) => setLogin(text);
   const emailHandler = (text: string) => setEmail(text);
   const passwordHandler = (text: string) => setPassword(text);
  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;

      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = async () => {
    if (login === "" || email === "" || password === "") {
      return Alert.alert("Заповните поля!!!");
    } else {
      // dispatch(register({ email, password, login, avatar }));
      console.log({ email, password, login, avatar });
    }
    setLogin("");
    setEmail("");
    setPassword("");
  };

const showPassword = () => {
  if (passwordShown === true) {
    setPasswordShown(false);
  }
  if (passwordShown === false) {
    setPasswordShown(true);
  }
};

const onSubmit = () => {
  setAvatar(null);
};


const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  // if (!result.canceled) {
  //   setAvatar(await uploadPhotoToStorage(result.assets[0].uri));
  // }
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={imageBg} resizeMode="cover" style={styles.image}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={{ ...styles.form, width: dimensions }}>
              <View style={styles.containerIMG}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: avatar || undefined,
                  }}
                />
                {avatar === null ? (
                  <TouchableOpacity style={styles.svg} onPress={pickImage}>
                    <Text>Додати</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.svgDel} onPress={onSubmit}>
                    <Text>Видалити</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.text}>Реєстрація</Text>
              <View>
                <TextInput
                  value={login}
                  onChangeText={loginHandler}
                  style={{
                    ...styles.input,
                    borderColor: isFocused ? "#4f0c69" : "#ebcdee",
                  }}
                  placeholder="Логін"
                  onFocus={handleFocus}
                  selectionColor="#4f0c69"
                />
              </View>
              <View>
                <TextInput
                  value={email}
                  onChangeText={emailHandler}
                  style={{
                    ...styles.input,
                    borderColor: isFocused ? "#4f0c69" : "#ebcdee",
                  }}
                  placeholder="Адреса електронної пошти"
                  onFocus={handleFocus}
                  selectionColor="#4f0c69"
                />
              </View>
              <View style={styles.inputWraper}>
                <TextInput
                  value={password}
                  onChangeText={passwordHandler}
                  secureTextEntry={passwordShown}
                  style={{
                    ...styles.input,
                    borderColor: isFocused ? "#4f0c69" : "#ebcdee",
                  }}
                  placeholder="Пароль"
                  onFocus={handleFocus}
                  selectionColor="#4f0c69"
                />

                <TouchableOpacity
                  style={styles.buttonShow}
                  onPress={showPassword}
                >
                  <Text style={styles.viewForText}>Показати</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={keyboardHide}>
                  <Text style={styles.textTitel}> Зарегистрироваться </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.viewForText}>
                    Уже есть аккаунт? Войти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 1,
    position: "relative",
    padding: 16,
    backgroundColor: "#e7adf590",
    height: 549,
    flexShrink: 0,
    paddingBottom: 25,
    marginTop: 250,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: "Roboto-Bold",

    fontSize: 30,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 32,

    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    paddingLeft: 16,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 8,

    color: "#212121",
    backgroundColor: "#ecd9ecb2",
    marginBottom: 16,
    // width: 343,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  inputWraper: {
    position: "relative",
  },
  viewForText: {
    color: "#4f0c69",
    fontSize: 16,
    lineHeight: 19,
    paddingBottom: 45,
    fontFamily: "Roboto-Regular",
    flexDirection: "row",
    alignSelf: "center",
  },
  buttonShow: {
    position: "absolute",
    top: 14,
    right: 25,
  },
  contentContainer: {
    paddingTop: 105,
  },
  button: {
    marginTop: 27,
    marginBottom: 16,
    backgroundColor: "#4f0c69",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 100,
    width: 343,
    flexDirection: "row",
    alignSelf: "center",
  },
  textTitel: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  containerIMG: {
    position: "absolute",
    width: 120,
    height: 120,
    paddingTop: 30,
    borderRadius: 16,
    top: -60,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
  },
  avatar: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  svg: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  svgDel: {
    position: "absolute",
    bottom: 10,
    right: -20,
  },
});
