import { useState, useEffect } from "react";
import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }
      // NOTE before this line of code we signup and get authenticated, we can use that auth to upload a file to storage. After we upload that picture to storage we can take that imgURL add it to our profile image.
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      // NOTE we get the img back from firebase
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      // NOTE then we drill into the img and get the imgUrl to use on our profile
      const imgUrl = await img.ref.getDownloadURL();

      // add display name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl });

      // NOTE after we create a user, upload an image and update their profile with a displayName and photURL we want to also make them a document in the firestore so that we have access to some of their information to display for all users
      // NOTE .add would auto generate a document id but if we instead use .doc(we can provide our own id here for the document) then we use .set(to put the information into that document)
      await projectFirestore
        .collection("users")
        .doc(res.user.uid)
        .set({ online: true, displayName, photoURL: imgUrl });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
