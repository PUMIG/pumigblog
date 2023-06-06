import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, doc, setDoc, deleteDoc, getDoc } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.22.1/firebase-firestore.js";
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

  const castToposting = JSON.parse(localStorage.getItem("castToposting"));

  //화면 로딩시 작업들
  var IsEdit = false;
  var originalWrittenDate;
  var originalCategory;
  var editPostRef;
  var originalPostDocRef;
  var posting = document.getElementById("posting");

  setTimeout(async function(){
    //화면 로딩 시 유저 ip의 state 확인 및 작업
    const usersDocRef = doc(db, "users", userIp);
    const usersDocSnap = await getDoc(usersDocRef);
    
    if(usersDocSnap.data().state == "master") {
      posting.setAttribute('style', 'display: block;');
    } else {
      location.href = "./index.html";
    }  

    //글쓰기가 수정인건지 새글 작성인지 파악
    if(castToposting != null) {
      var postTitle = document.getElementById("title");
      var categorySelect = document.getElementById("categorySelect");
      originalWrittenDate = new Date(castToposting.date);
      originalCategory = castToposting.category;

      postTitle.value = castToposting.title;
      categorySelect.value = castToposting.category;
      postEditor[0].innerHTML = castToposting.content;

      IsEdit = true;
      window.localStorage.removeItem('castToposting');
    } else {
      IsEdit = false;
    }

    var submitBtn = document.getElementById("submit");

    submitBtn.addEventListener('click', async function() {
      var categorySelect = document.getElementById("categorySelect").value;
      var postTitle = document.getElementById("title").value;
      var postContent = postEditor[0].innerHTML;
  
      if(IsEdit) {
        if(originalCategory == "Daily") {
          originalPostDocRef = doc(db, "posts", "Daily", "DailyPosts", castToposting.title);
        } else if(originalCategory == "Unreal") {
          originalPostDocRef = doc(db, "posts", "Unreal", "UnrealPosts", castToposting.title);
        } else {
          originalPostDocRef = doc(db, "posts", "Trip", "TripPosts", castToposting.title);
        }
        
        await deleteDoc(originalPostDocRef);

        if(originalCategory != categorySelect) {
          if(categorySelect == "Daily") {
            editPostRef = collection(db, "posts", "Daily", "DailyPosts");
          } else if(categorySelect == "Unreal") {
            editPostRef = collection(db, "posts", "Unreal", "UnrealPosts");
          } else {
            editPostRef = collection(db, "posts", "Trip", "TripPosts");
          }  
  
          await setDoc(doc(editPostRef, postTitle), {
            title: postTitle,
            content: postContent,
            writer: "PUMIG",
            writtenDate: originalWrittenDate,
            ip: userIp
          });
        } else {
          if(originalCategory == "Daily") {
            editPostRef = collection(db, "posts", "Daily", "DailyPosts");
          } else if(originalCategory == "Unreal") {
            editPostRef = collection(db, "posts", "Unreal", "UnrealPosts");
          } else {
            editPostRef = collection(db, "posts", "Trip", "TripPosts");
          }

          await setDoc(doc(editPostRef, castToposting.title), {
            title: postTitle,
            content: postContent,
            writer: "PUMIG",
            writtenDate: originalWrittenDate,
            ip: userIp
          });
        }
    
        alert("글 수정 완료!");
        location.href = "./index.html";  
      } else {
        var nowDate = new Date(Date.now());
    
        if(categorySelect == "Daily") {
          var postsRef = collection(db, "posts", "Daily", "DailyPosts");
        } else if(categorySelect == "Unreal") {
          var postsRef = collection(db, "posts", "Unreal", "UnrealPosts");
        } else {
          var postsRef = collection(db, "posts", "Trip", "TripPosts");
        }
    
        await setDoc(doc(postsRef, postTitle), {
          title: postTitle,
          content: postContent,
          writer: "PUMIG",
          writtenDate: nowDate,
          ip: userIp
        });
    
        alert("글 작성 완료!");
        location.href = "./index.html";  
      }
    });  
  }, 1000);
