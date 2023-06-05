import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, doc, getDoc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.22.1/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBCDTYZ272PhVogeWPpVcYdqSdjgeMpGoU",
    authDomain: "pumig-blog.firebaseapp.com",
    projectId: "pumig-blog",
    storageBucket: "pumig-blog.appspot.com",
    messagingSenderId: "1034739425850",
    appId: "1:1034739425850:web:23d425e2c69a8f5ec24b03"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //Initialize Firestore
  const db = getFirestore(app);

  const castToseePost = JSON.parse(localStorage.getItem("castToseePost"));

  const docRef = doc(db, "posts", castToseePost.ref1, castToseePost.ref2, castToseePost.title);
  const docSnap = await getDoc(docRef);

  var editBtn = document.getElementById("editBtn");
  var deleteBtn = document.getElementById("deleteBtn");
  var commentBtn = document.getElementById("commentBtn");
  var getComments = document.getElementById("getComments");
  var commentContentInput = document.getElementById("commentContent");
  var originalComment = new Object();
  var originalCommentWrittenDate = "?";
  var editComment = false;

  //화면 로딩 시 유저 ip의 state 확인 및 작업
  const userIp = localStorage.getItem("userIp");
  const usersDocRef = doc(db, "users", userIp);
  const usersDocSnap = await getDoc(usersDocRef);
  var posting = document.getElementById("posting");

  if(usersDocSnap.data().state != "master") {
    posting.setAttribute('style', 'display: none;');
    editBtn.setAttribute('style', 'display: none;');
    deleteBtn.setAttribute('style', 'display: none;');
  }

  if(docSnap.data().comments) {
    var comments = docSnap.data().comments;

    //서버에서 가져온 코멘트들 정렬해주는 알고리즘인데.. 자동으로 되는듯...?
/*     var commentsBySort = comments.sort((a, b) => {
      if(a.writtenDate.toDate() > b.writtenDate.toDate()) return -1;
      if(a.writtenDate.toDate() < b.writtenDate.toDate()) return 1;
      return 0;
    });
 */
    for(var i = 0; i < comments.length; i++) {
      var commentPTagsDiv = document.createElement('div');
      var commentPTagUserId = document.createElement('p');
      var commentPTagWrittenDate = document.createElement('p');
      var commentH5Tag = document.createElement('h5');
      var commentHrTag = document.createElement('hr');
    
      commentPTagUserId.innerHTML = usersDocSnap.data().userRandomId;
      commentPTagWrittenDate.innerHTML = comments[i].writtenDate.toDate().toString().substring(0, 24);
      commentH5Tag.innerHTML =  comments[i].content;

      commentPTagsDiv.setAttribute('class', 'row');
      commentPTagUserId.setAttribute('class', 'col-6');
      commentPTagWrittenDate.setAttribute('class', 'col-6');
      commentPTagWrittenDate.setAttribute('style', 'text-align: right;');

      if(comments[i].ip == userIp) {
        var commentEditBtn = document.createElement('button');
        var commentDeleteBtn = document.createElement('button');
        const checkNowComment = i;

        commentEditBtn.setAttribute('class', 'btn btn-success');
        commentDeleteBtn.setAttribute('class', 'btn btn-danger ms-2');
        commentEditBtn.setAttribute('id', 'editCommentBtn' + i);
        commentDeleteBtn.setAttribute('id', 'deleteCommentBtn' + i);

        commentEditBtn.innerHTML = "수정";
        commentDeleteBtn.innerHTML = "삭제";

        getComments.appendChild(commentEditBtn);
        getComments.appendChild(commentDeleteBtn);

        var getCreatedEditBtn = document.getElementById('editCommentBtn' + i);
        var getCreatedDeleteBtn = document.getElementById('deleteCommentBtn' + i);
  
        getCreatedEditBtn.addEventListener('click', function() {
          commentContentInput.value = comments[checkNowComment].content;
          originalComment = comments[checkNowComment];
          originalCommentWrittenDate = comments[checkNowComment].writtenDate.toDate();
          editComment = true;
        });

        getCreatedDeleteBtn.addEventListener('click', async function() {
          originalComment = comments[checkNowComment];

          if(window.confirm("정말 댓글을 삭제하시겠습니까?")) {
            await updateDoc(docRef, {
              comments: arrayRemove(originalComment)
            });

            location.reload();
            } else {
      
            }  
        });
      }

      commentPTagsDiv.appendChild(commentPTagUserId);
      commentPTagsDiv.appendChild(commentPTagWrittenDate);
  
      getComments.appendChild(commentPTagsDiv);
      getComments.appendChild(commentH5Tag);
      getComments.appendChild(commentHrTag);
    }  
  }

  //버튼 작업
  var contentTitle = document.getElementById("contentTitle");
  var contentSpace = document.getElementById("contentSpace");
  var h1Tag = document.createElement("h1");

  h1Tag.innerHTML = docSnap.data().title;
  h1Tag.setAttribute('style', 'text-align: center;');

  contentTitle.appendChild(h1Tag);
  contentSpace.innerHTML = docSnap.data().content;

  editBtn.addEventListener('click', function() {
    if(usersDocSnap.data().state == "master") {
      var castToposting = {
        "title": docSnap.data().title,
        "content": docSnap.data().content,
        "date": docSnap.data().writtenDate.toDate(),
        "category": castToseePost.ref1
      }
  
      localStorage.setItem("castToposting", JSON.stringify(castToposting));
      location.href = "./posting.html";
      } else {
        location.href = "./index.html";
    }
  });

  deleteBtn.addEventListener('click', async function() {
    if(usersDocSnap.data().state == "master") {
      if(window.confirm("정말 삭제하시겠습니까?")) {
        await deleteDoc(docRef);
        location.href = "./index.html";  
      } else {
  
      }  
    } else {
      location.href = "./index.html";
    }
  });

  commentBtn.addEventListener('click' , async function() {
    var commentObj = new Object();
    var commentContent = document.getElementById("commentContent").value;

    commentObj.ip = userIp;
    commentObj.content = commentContent;

    if(editComment) {
      commentObj.writtenDate = originalCommentWrittenDate;

      await updateDoc(docRef, {
        comments: arrayRemove(originalComment)
      });

      await updateDoc(docRef, {
        comments: arrayUnion(commentObj)
      });

      alert("댓글 수정 완료!");

      editComment = false;
    } else {
      commentObj.writtenDate = new Date(Date.now());

      await updateDoc(docRef, {
        comments: arrayUnion(commentObj)
      });

      alert("댓글 입력 완료!");
    }

    location.reload();
  });
