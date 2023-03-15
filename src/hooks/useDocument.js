import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config.js";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);
    ref.onSnapshot((snapshot) => {
      setDocument(snapshot);
    });
  }, [collection, id]);
};
