import React, { useEffect, useState } from "react";
import { deleteDoc, getDocs, doc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Home = ({ isAuth }) => {
  const [postList, setPostList] = useState([]);

  const navigate = useNavigate();
  const postCollectionRef = collection(db, "posts");
  const handleDetails = async (id) => {
    const data = await getDocs(postCollectionRef);
    const dataArr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const details = dataArr.filter((doc) => id === doc.id);
    const {
      title,
      url,
      postText,
      author: { name },
    } = details[0];
    {
      isAuth
        ? navigate("/details", { state: { title, url, postText, name } })
        : alert("pls login or register");
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  const getPost = async () => {
    const data = await getDocs(postCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  return (
    <div className="homePage">
      {postList.map((post, i) => {
        return (
          <div key={i} className="mainPost">
            <div className="post">
              <div className="mainPost"></div>
              <div className="postHeader">
                <div className="title">
                  <h1>{post.title}</h1>
                  <h6>{post.author.name}</h6>
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
            </div>
            <p className="detailsLink" onClick={() => handleDetails(post.id)}>
              Read More
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
