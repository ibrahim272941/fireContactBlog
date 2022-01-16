import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase/firebaseConfig";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [media, setMedia] = useState("");

  const navigate = useNavigate();
  const postCollectionRef = collection(db, "posts");
  const createPost = async () => {
    const imgRef = ref(storage, `media/${media.name}`);
    const snap = await uploadBytes(imgRef, media);
    const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
    await addDoc(postCollectionRef, {
      url,
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [media]);
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a Post</h1>
        <div className="inputGp">
          <label htmlFor="">Title : </label>
          <input
            type="text"
            placeholder="Title...."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMedia(e.target.files[0])}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="">Post:</label>
          <textarea
            placeholder="Post....."
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
