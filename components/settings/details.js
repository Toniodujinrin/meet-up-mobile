import React, { useEffect, useContext, useState } from "react";
import { verifyAccountSchema } from "../../validation";
import BigPhoto from "../utils/bigPhoto";
import { Formik } from "formik";
import InputField from "../inputFields";
import DeletePopUp from "../utils/deletePopUp";
import { View, ScrollView } from "react-native";
import ButtonGray from "../utils/buttonGray";
import DangerButton from "../utils/dangerButton";
import { UserContext } from "../../contexts/UserContext";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Details = ({ setWebcamShowing }) => {
  const {
    user,
    updateUser,
    updateProcessLoading,
    removeProfilePic,
    removeProfilePicLoading,
  } = useContext(UserContext);

  const [deletePopUpShowing, setDeletePopUpShowing] = useState(false);

  return (
    <View className="flex items-center justify-center">
      {deletePopUpShowing && (
        <View
          className="absolute flex items-center justify-center"
          style={{
            height: "100%",
            width: "100%",
            zIndex: 100,
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
        >
          <DeletePopUp
            deleteAction={"account"}
            setDeleteShowing={setDeletePopUpShowing}
          />
        </View>
      )}

      <ScrollView className={`w-full px-3 h-[90%] flex flex-col mt-4`}>
        <View className=" self-start mb-4">
          <BigPhoto
            profilePic={user.profilePic}
            defaultColor={user.defaultProfileColor}
            displayName={user.username}
          />
        </View>
        <Formik
          initialValues={{
            username: user.username,
            phone: user.phone,
            lastName: user.lastName,
            firstName: user.firstName,
            bio: user.bio,
          }}
          onSubmit={async (values, actions) => {
            if (
              values.username == user.username &&
              values.phone == user.phone &&
              values.lastName == user.lastName &&
              values.firstName == user.firstName &&
              values.bio == user.bio
            ) {
              Toast.show({
                type: "error",
                text1: "no changes made",
              });
            } else updateUser(values);
          }}
          validationSchema={verifyAccountSchema}
        >
          {(formikProps) => (
            <View className="flex flex-col w-full items-center ">
              <View className="flex  w-full space-x-4 ">
                <InputField
                  iconName={"account"}
                  text={formikProps.values.firstName}
                  placeholder={"First Name"}
                  setText={formikProps.handleChange("firstName")}
                  error={formikProps.errors.firstName}
                />
                <InputField
                  iconName={"account"}
                  text={formikProps.values.lastName}
                  placeholder={"Last Name"}
                  setText={formikProps.handleChange("lastName")}
                  error={formikProps.errors.lastName}
                />
                <InputField
                  iconName={"account"}
                  text={formikProps.values.username}
                  placeholder={"Username"}
                  setText={formikProps.handleChange("username")}
                  error={formikProps.errors.username}
                />
                <InputField
                  iconName={"phone"}
                  text={formikProps.values.phone}
                  placeholder={"Phone Number"}
                  setText={formikProps.handleChange("phone")}
                  error={formikProps.errors.phone}
                />

                <InputField
                  iconName={"book"}
                  text={formikProps.values.bio}
                  placeholder={"Bio"}
                  setText={formikProps.handleChange("bio")}
                  error={formikProps.errors.bio}
                />
              </View>
              <View className="w-full space-y-2 ">
                <View>
                  <ButtonGray
                    icon={"update"}
                    loading={updateProcessLoading}
                    text={"Update"}
                    onClick={() => {
                      formikProps.handleSubmit();
                    }}
                  />
                </View>
                <View>
                  <ButtonGray
                    icon={"camera"}
                    text={"Change Photo"}
                    onClick={() => {
                      setWebcamShowing(true);
                    }}
                  />
                </View>
                <View>
                  <ButtonGray
                    icon={"close"}
                    text={"Remove Photo"}
                    loading={removeProfilePicLoading}
                    onClick={() => {
                      removeProfilePic();
                    }}
                  />
                </View>
                <View>
                  <DangerButton
                    text={"Delete Account"}
                    onClick={() => {
                      setDeletePopUpShowing(true);
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default Details;
