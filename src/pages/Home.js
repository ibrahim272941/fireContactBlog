import React, { useEffect, useState } from "react";
import { deleteDoc, getDocs, doc } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";

const Home = ({ isAuth }) => {
  console.log(isAuth);
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");
  useEffect(() => {
    getPost();
  }, []);
  const getPost = async () => {
    const data = await getDocs(postCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  return (
    <div className="homePage">
      {postList.map((post, i) => {
        return (
          <div key={i} className="post">
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>

              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="imageContainer">
              <img src={post.url} alt="" />
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3>{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
