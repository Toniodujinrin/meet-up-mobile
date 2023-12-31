import React, { useEffect, useState } from "react";
import InputBox from "./inputBox";
import Header from "./header";
import { View, Text, ScrollView } from "react-native";
import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Add from "./add";
import { SocketContext } from "../../contexts/SocketContext";
import { useRef } from "react";
import Typing from "./typing";
import Message from "./message";
import { ConversationContext } from "../../contexts/ConversationContext";
import ConversationMessage from "./conversationMessage";
import Info from "./info";
// import CallComp from "./call";
// import CallNotification from "./callNotification";
// import Typing from "./typing";
// import SimplePeer from "simple-peer";

const ConversationComp = ({ id }) => {
  let scrollRef = useRef();
  const [currentDisplay, setCurrentDisplay] = useState("chat");

  const {
    messages,
    sendMessage,
    sendTyping,
    typing,
    // call,
    // turnServers,
    // socket,
    // setNewCall,
    // leaveConversation,
  } = useContext(SocketContext);

  const { conversationDetails } = useContext(ConversationContext);
  const [value, setValue] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState();
  const [_stream, setStream] = useState(null);
  // const remoteVideo = useRef();
  // const selfVideo = useRef();
  // const [videoEnabled, setVideoEnabled] = useState(true);
  // const [audioEnabled, setAudioEnabled] = useState(true);
  // const [peer, setPeer] = useState("");
  // const [callAccepted, setCallAccepted] = useState(false);
  //   const [incomingCall, setIncomingCall] = useState(false);
  //   useEffect(() => {
  //     if (call && call.offer && !callAccepted) {
  //       setIncomingCall(true);
  //     }
  //   }, [call]);

  useEffect(() => {
    sendTyping(isTyping);
  }, [isTyping]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  });

  const handleTypingStart = () => {
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
    setTypingTimeout(timeout);
    setIsTyping(true);
  };

  const handleSendMessage = () => {
    const paylaod = {
      body: value,
      conversationId: id,
    };

    sendMessage(paylaod);
    setValue("");
  };

  //   const initiateMedia = async () => {
  //     const selfStream = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //     });
  //     if (selfVideo.current) {
  //       selfVideo.current.srcObject = selfStream;
  //     }
  //     setStream(selfStream);
  //     return selfStream;
  //   };

  //   const handleCleanUp = (stream, peer, type = "error") => {
  //     if (type !== "error") {
  //       toast(`Call Ended`, { icon: "☎️" });
  //     }
  //     peer.destroy();
  //     setIncomingCall(false);
  //     setNewCall(null);
  //     setCallAccepted(false);
  //     stream.getTracks().forEach(function (track) {
  //       track.stop();
  //     });
  //     socket.off("call_response");
  //     leaveConversation();
  //     navigate("/main");
  //   };

  //   const makeCall = async () => {
  //     try {
  //       const stream = await initiateMedia();
  //       const peer = new SimplePeer({
  //         initiator: true,
  //         trickle: false,
  //         stream,
  //         config: {
  //           iceServers: turnServers,
  //         },
  //       });
  //       setPeer(peer);

  //       peer.on("signal", (data) => {
  //         const offer = { conversationId: id, offer: data };
  //         socket.emit("call", offer);
  //         socket.on("call_rejected", () => {
  //           socket.off("call_rejected");
  //           handleCleanUp(stream, peer);
  //         });
  //       });

  //       peer.on("stream", (remoteStream) => {
  //         if (remoteVideo.current) {
  //           remoteVideo.current.srcObject = remoteStream;
  //         }
  //       });

  //       socket.on("offerSignalError", () => {
  //         toast.error("receiver unavailable");
  //         stream.getTracks().forEach(function (track) {
  //           track.stop();
  //         });
  //         navigate("/main", { replace: true });
  //         socket.off("offerSignalError");
  //       });

  //       socket.on("signaling_error", () => {
  //         toast.error("something went wrong");
  //         navigate("/main", { replace: true });
  //       });

  //       socket.on("call_response", (args) => {
  //         peer.signal(args);
  //       });
  //       peer.on("connect", () => {
  //         console.log("peer connected");
  //       });

  //       peer.on("error", () => {
  //         handleCleanUp(stream, peer);
  //       });

  //       peer.on("close", () => {
  //         handleCleanUp(stream, peer, "close");
  //       });
  //     } catch (error) {
  //       toast.error("could not initiate call");
  //       console.log(error);
  //     }
  //   };

  //   const answerCall = async ({ offer, conversationId }) => {
  //     try {
  //       const stream = await initiateMedia();

  //       const peer = new SimplePeer({
  //         initiator: false,
  //         trickle: false,
  //         stream,
  //         config: {
  //           iceServers: turnServers,
  //         },
  //       });
  //       setPeer(peer);

  //       peer.on("signal", (answer) => {
  //         socket.emit("call_response", { answer, conversationId });
  //       });

  //       peer.on("stream", (remoteStream) => {
  //         if (remoteVideo.current) {
  //           remoteVideo.current.srcObject = remoteStream;
  //         }
  //       });
  //       peer.signal(offer);

  //       peer.on("connect", () => {
  //         console.log("peer connected");
  //       });
  //       peer.on("error", (e) => {
  //         handleCleanUp(stream, peer);
  //       });

  //       socket.on("signaling_error", () => {
  //         toast.error("something went wrong");
  //         navigate("/main", { replace: true });
  //       });

  //       peer.on("close", () => {
  //         handleCleanUp(stream, peer, "close");
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const rejectCall = () => {
  //     if (call) {
  //       socket.emit("call_rejected", { conversationId: call.conversationId });
  //       setNewCall(null);
  //       setIncomingCall(false);
  //       setCallAccepted(false);
  //       leaveConversation();
  //       navigate("/main");
  //     }
  //   };

  //   const toggleVideo = () => {
  //     if (_stream) {
  //       const videoTrack = _stream
  //         .getTracks()
  //         .find((track) => track.kind === "video");

  //       if (videoTrack) {
  //         if (videoTrack.enabled) {
  //           videoTrack.enabled = false;
  //           setVideoEnabled(false);
  //         } else {
  //           videoTrack.enabled = true;
  //           setVideoEnabled(true);
  //         }
  //       }
  //     }
  //   };

  //   const toggleAudio = () => {
  //     if (_stream) {
  //       const audioTrack = _stream
  //         .getTracks()
  //         .find((track) => track.kind === "audio");
  //       if (audioTrack) {
  //         if (audioTrack.enabled) {
  //           audioTrack.enabled = false;
  //           setAudioEnabled(false);
  //         } else {
  //           audioTrack.enabled = true;
  //           setAudioEnabled(true);
  //         }
  //       }
  //     }
  //   };

  //   const endCall = () => {
  //     if (peer) {
  //       peer.emit("close");
  //       peer.destroy();
  //       setIncomingCall(false);
  //       setNewCall(null);
  //       setCallAccepted(false);
  //       _stream.getTracks().forEach(function (track) {
  //         track.stop();
  //       });
  //       leaveConversation();
  //       navigate("/main");
  //     } else {
  //       setIncomingCall(false);
  //       setNewCall(null);
  //       setCallAccepted(false);
  //       if (_stream) {
  //         _stream.getTracks().forEach(function (track) {
  //           track.stop();
  //         });
  //       }
  //       leaveConversation();
  //       navigate("/main");
  //     }
  //   };

  return (
    <View>
      {/* className={`${incomingCall && `flex items-center justify-center`}`} */}
      {/* {incomingCall && (
        <CallNotification
          answerCall={answerCall}
          setCallAccepted={setCallAccepted}
          setIncomingCall={setIncomingCall}
          setCurrentDisplay={setCurrentDisplay}
          rejectCall={rejectCall}
          call={call}
        />
      )} */}
      {currentDisplay == "chat" && (
        <View className=" h-full bg-black  w-full flex flex-col">
          <Header setCurrentDisplay={setCurrentDisplay} />
          <View className="bg-black flex justify-between  flex-col w-full flex-1">
            <View className=" bg-midGray  mt-4  rounded-lg flex flex-row justify-evenly items-center space-x-3 w-[180px] self-center  p-2 ">
              <MaterialCommunityIcons size={20} color={"#ffffff"} name="lock" />
              <Text className="text-white font-normal ">
                End to End Encrypted
              </Text>
            </View>
            <ScrollView
              ref={scrollRef}
              className=" flex space-y-4 mt-2 w-full px-3 "
            >
              {messages.map((message, index) =>
                conversationDetails.type == "single" ? (
                  <View key={index}>
                    <Message
                      key={index}
                      body={message.body}
                      senderId={message.senderId}
                      timeStamp={message.timeStamp}
                      status={message.status}
                    />
                  </View>
                ) : (
                  <View key={index}>
                    <ConversationMessage
                      key={index}
                      body={message.body}
                      senderId={message.senderId}
                      timeStamp={message.timeStamp}
                      status={message.status}
                    />
                  </View>
                )
              )}
            </ScrollView>
            {typing.length > 0 && <Typing user={typing[0]} />}
          </View>
          <InputBox
            handleTypingStart={handleTypingStart}
            value={value}
            setValue={setValue}
            handleSendMessage={handleSendMessage}
          />
        </View>
      )}

      {currentDisplay == "info" && (
        <Info setCurrentDisplay={setCurrentDisplay} />
      )}
      {currentDisplay == "add" && <Add setCurrentDisplay={setCurrentDisplay} />}
      {/* {currentDisplay == "call" && (
        <CallComp
          conversationDetails={conversationDetails}
          selfVideo={selfVideo}
          remoteVideo={remoteVideo}
          endCall={endCall}
          videoEnabled={videoEnabled}
          toggleVideo={toggleVideo}
          toggleAudio={toggleAudio}
          audioEnabled={audioEnabled}
        />
      )} */}
    </View>
  );
};

export default ConversationComp;
