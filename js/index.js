import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, doc, getDocs, query, setDoc, getDoc, orderBy } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.22.1/firebase-firestore.js";
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

  var category1Btn = document.getElementById("category1");
  var category2Btn = document.getElementById("category2");
  var category3Btn = document.getElementById("category3");
  var docsList = document.getElementById("docsList");
  
  docsList.innerHTML = "";

  //화면 로딩 시에는 일상 카테고리를 로딩하는 것이 디폴트
  category1Btn.setAttribute('class', 'list-group-item list-group-item-action active');
  category2Btn.setAttribute('class', 'list-group-item list-group-item-action');
  category3Btn.setAttribute('class', 'list-group-item list-group-item-action');

  const qCategory1 = query(collection(db, "posts", "Daily", "DailyPosts"), orderBy("writtenDate", "desc"));
  const qCategory1Snap = await getDocs(qCategory1);

  qCategory1Snap.forEach((doc) => {
      const aTag = document.createElement("a");
      const hrTag = document.createElement("hr");
  
      aTag.setAttribute('class', 'mt-3 mb-2 ms-2');
      aTag.setAttribute('href', './seePost.html');
      aTag.setAttribute('style', 'font-size: 30px;');

      aTag.innerHTML = doc.data().title;

      aTag.addEventListener('click', function() {
          var castToseePost = {
              "ref1": "Daily",
              "ref2": "DailyPosts",
              "title": doc.data().title
          }

          localStorage.setItem("castToseePost", JSON.stringify(castToseePost));
      });
  
      hrTag.setAttribute('class', 'ms-2');
  
      docsList.appendChild(aTag);
      docsList.appendChild(hrTag);
  });

  //화면 로딩시 작업들
  var posting = document.getElementById("posting");

  setTimeout(async function(){
  //화면 로딩 시 유저 ip 서버 등록 확인 및 등록
  const usersDocRef = doc(db, "users", userIp);
  const usersDocSnap = await getDoc(usersDocRef);
  const usersRef = collection(db, "users");

  if(!usersDocSnap.exists()) {
    var userRandomId = Math.random().toString().substring(2);

    await setDoc(doc(usersRef, userIp), {
        ip: userIp,
        state: "normal", 
        userRandomId: userRandomId
    });
  }

  //화면 로딩 시 유저 ip의 state 확인 및 작업
  const usersDocRef2 = doc(db, "users", userIp);
  const usersDocSnap2 = await getDoc(usersDocRef2);

  if(usersDocSnap2.data().state == "master") {
    posting.setAttribute('style', 'display: block;');
  }

  }, 1000);

  //여기서부터는 카테고리 버튼들 구현
  category1Btn.addEventListener('click', async function() {
    docsList.innerHTML = "";

    category1Btn.setAttribute('class', 'list-group-item list-group-item-action active');
    category2Btn.setAttribute('class', 'list-group-item list-group-item-action');
    category3Btn.setAttribute('class', 'list-group-item list-group-item-action');

    const qCategory1 = query(collection(db, "posts", "Daily", "DailyPosts"), orderBy("writtenDate", "desc"));
    const qCategory1Snap = await getDocs(qCategory1);

    qCategory1Snap.forEach((doc) => {
        const aTag = document.createElement("a");
        const hrTag = document.createElement("hr");
    
        aTag.setAttribute('class', 'mt-3 mb-2 ms-2');
        aTag.setAttribute('href', './seePost.html');
        aTag.setAttribute('style', 'font-size: 30px;');

        aTag.innerHTML = doc.data().title;

        aTag.addEventListener('click', function() {
            var castToseePost = {
                "ref1": "Daily",
                "ref2": "DailyPosts",
                "title": doc.data().title
            }

            localStorage.setItem("castToseePost", JSON.stringify(castToseePost));
        });
    
        hrTag.setAttribute('class', 'ms-2');
    
        docsList.appendChild(aTag);
        docsList.appendChild(hrTag);    
    });
  });

  category2Btn.addEventListener('click', async function() {
    docsList.innerHTML = "";

    category1Btn.setAttribute('class', 'list-group-item list-group-item-action');
    category2Btn.setAttribute('class', 'list-group-item list-group-item-action active');
    category3Btn.setAttribute('class', 'list-group-item list-group-item-action');

    const qCategory2 = query(collection(db, "posts", "Unreal", "UnrealPosts"), orderBy("writtenDate", "desc"));
    const qCategory2Snap = await getDocs(qCategory2);

    qCategory2Snap.forEach((doc) => {
        const aTag = document.createElement("a");
        const hrTag = document.createElement("hr");
    
        aTag.setAttribute('class', 'mt-3 mb-2 ms-2');
        aTag.setAttribute('href', './seePost.html');
        aTag.setAttribute('style', 'font-size: 30px;');

        aTag.innerHTML = doc.data().title;

        aTag.addEventListener('click', function() {
            var castToseePost = {
                "ref1": "Unreal",
                "ref2": "UnrealPosts",
                "title": doc.data().title
            }

            localStorage.setItem("castToseePost", JSON.stringify(castToseePost));
        });
    
        hrTag.setAttribute('class', 'ms-2');
    
        docsList.appendChild(aTag);
        docsList.appendChild(hrTag);
    });
  });

  category3Btn.addEventListener('click', async function() {
    docsList.innerHTML = "";

    category1Btn.setAttribute('class', 'list-group-item list-group-item-action');
    category2Btn.setAttribute('class', 'list-group-item list-group-item-action');
    category3Btn.setAttribute('class', 'list-group-item list-group-item-action active');

    const qCategory3 = query(collection(db, "posts", "Trip", "TripPosts"), orderBy("writtenDate", "desc"));
    const qCategory3Snap = await getDocs(qCategory3);

    qCategory3Snap.forEach((doc) => {
        const aTag = document.createElement("a");
        const hrTag = document.createElement("hr");
    
        aTag.setAttribute('class', 'mt-3 mb-2 ms-2');
        aTag.setAttribute('href', './seePost.html');
        aTag.setAttribute('style', 'font-size: 30px;');

        aTag.innerHTML = doc.data().title;

        aTag.addEventListener('click', function() {
            var castToseePost = {
                "ref1": "Trip",
                "ref2": "TripPosts",
                "title": doc.data().title
            }

            localStorage.setItem("castToseePost", JSON.stringify(castToseePost));
        });
    
        hrTag.setAttribute('class', 'ms-2');
    
        docsList.appendChild(aTag);
        docsList.appendChild(hrTag);    
    });
  });
