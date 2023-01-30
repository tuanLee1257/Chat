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
} from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { AuthenticatedUserContext } from "../config/context";
import { database } from "../firebase/firebaseConfig";

function Chat({ route }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [messages, setMessages] = useState([]);
  const contact = route.params.contact;

  useLayoutEffect(() => {
    getMessages();
  }, []);

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
      user={{
        _id: user.uid,
        avatar: user.profile_picture,
      }}
    />
  );
}

export default Chat;
