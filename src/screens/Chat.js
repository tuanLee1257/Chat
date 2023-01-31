import { useNavigation } from "@react-navigation/native";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import React, {
  useCallback,
  useContext,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import BackButton from "../components/UI/BackButton";
import { AuthenticatedUserContext } from "../config/context";
import { database } from "../firebase/firebaseConfig";

function Chat({ route }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const contact = route.params.contact;

  useLayoutEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
    });
  });

  const getMessages = () => {
    const collectionRef = collection(
      database,
      "contacts/" + contact.contactId + "/messages"
    );
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapShot) => {
      setMessages(
        snapShot.docs.map((doc) => ({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt.toDate(),
          user: {
            _id: doc.data().user._id,
            avatar: doc.data().user.avatar,
          },
        }))
      );
    });
    return unsubscribe;
  };
  const onSendMessage = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const messageDoc = database
      .collection("contacts")
      .doc(contact.contactId)
      .collection("messages")
      .doc();
    setDoc(messageDoc, messages[0]);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSendMessage(messages)}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      textInputStyle={{
        backgroundColor: "#fff",
        borderRadius: 20,
      }}
      user={{
        _id: user.uid,
        avatar: user.profile_picture,
      }}
    />
  );
}

export default Chat;
