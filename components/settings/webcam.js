import React, { useEffect, useState, useContext } from "react";
import { Camera, CameraType, ImageType } from "expo-camera";
import { View, TouchableHighlight, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../../contexts/UserContext";

const WebCam = ({ setWebcamShowing }) => {
  const [type, setType] = useState(CameraType.front);
  const [permision, requestPermission] = Camera.useCameraPermissions();
  const [base64Picture, setBase64Picture] = useState("");
  const { uploadProfilePic, profilePicLoading } = useContext(UserContext);
  const [imageUri, setImageUri] = useState("");
  let camera;
  const toggleCameraPostion = () => {
    if (type == CameraType.back) {
      setType(CameraType.front);
    } else {
      setType(CameraType.back);
    }
  };

  const uploadImage = () => {
    const payload = {
      image: base64Picture,
    };
    uploadProfilePic(payload);
  };
  const takePicture = async () => {
    if (camera) {
      const { uri, base64 } = await camera.takePictureAsync({
        imageType: ImageType.png,
        base64: true,
        quality: 0,
        scale: 0.5,

        skipProcessing: true,
      });
      if (uri && base64) {
        console.log(base64);
        setBase64Picture(base64);
        setImageUri(uri);
      }
    }
  };

  useEffect(() => {
    if (!permision) {
      requestPermission();
    }
  }, [permision]);

  return (
    <View className="w-screen h-full flex justify-between">
      {!imageUri.length > 0 ? (
        <Camera
          ref={(r) => {
            camera = r;
          }}
          className="h-5/6 w-full"
          type={type}
        ></Camera>
      ) : (
        <ImageBackground className="w-full h-5/6" source={{ uri: imageUri }} />
      )}
      <View className="w-full h-1/6  flex-row pt-4 justify-center">
        {imageUri ? (
          <>
            <TouchableHighlight
              onPress={() => {
                setBase64Picture("");
                setImageUri("");
              }}
            >
              <View className="w-[50px] mr-4  aspect-square border-2 bg-transparent border-white rounded-full flex items-center justify-center">
                <MaterialCommunityIcons
                  name="redo"
                  color={"#ffffff"}
                  size={30}
                />
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                uploadImage();
              }}
            >
              <View className="w-[50px] mr-4  aspect-square border-2 bg-transparent border-white rounded-full flex items-center justify-center">
                <MaterialCommunityIcons
                  name="cloud-upload"
                  color={"#ffffff"}
                  size={30}
                />
              </View>
            </TouchableHighlight>
          </>
        ) : (
          <>
            <TouchableHighlight onPress={() => takePicture()}>
              <View className="w-[50px] mr-4  aspect-square border-2 bg-transparent border-white rounded-full flex items-center justify-center">
                <View className="w-[40px] aspect-square rounded-full bg-white"></View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => toggleCameraPostion()}>
              <View className="w-[50px] mr-4  aspect-square border-2 bg-transparent border-white rounded-full flex items-center justify-center">
                <MaterialCommunityIcons
                  name="camera-flip-outline"
                  color={"#ffffff"}
                  size={30}
                />
              </View>
            </TouchableHighlight>
          </>
        )}
        <TouchableHighlight
          onPress={() => {
            setWebcamShowing(false);
            setBase64Picture("");
            setImageUri("");
          }}
        >
          <View className="w-[50px]  aspect-square border-2 bg-transparent border-white rounded-full flex items-center justify-center">
            <MaterialCommunityIcons name="close" color={"#ffffff"} size={30} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default WebCam;
