import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.22.1/firebase-firestore.js";
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

  var searchBtn = document.getElementById("searchBtn");
  var docsList = document.getElementById("docsList");
  var titles = new Array();
  var searchKeyword = document.getElementById("searchKeyword");

  const qCategory1 = query(collection(db, "posts", "Daily", "DailyPosts"));
  const qCategory1Snap = await getDocs(qCategory1);

  qCategory1Snap.forEach((doc) => {
    var Obj = {
      title: doc.data().title,
      category: 'Daily'
    }

    titles.push(Obj);
  });

  const qCategory2 = query(collection(db, "posts", "Unreal", "UnrealPosts"));
  const qCategory2Snap = await getDocs(qCategory2);

  qCategory2Snap.forEach((doc) => {
    var Obj = {
      title: doc.data().title,
      category: 'Unreal'
    };

    titles.push(Obj);
  });

  const qCategory3 = query(collection(db, "posts", "Trip", "TripPosts"));
  const qCategory3Snap = await getDocs(qCategory3);

  qCategory3Snap.forEach((doc) => {
    var Obj = {
      title: doc.data().title,
      category: 'Trip'
    };

    titles.push(Obj);
  });

  searchBtn.addEventListener('click', function() {
    docsList.innerHTML = "";

    for(var i = 0; i < titles.length; i++) {
      var keyword = titles[i].title;

      var result = keyword.indexOf(searchKeyword.value);
      if(result != -1) {
        if(titles[i].category == "Daily") {
          const aTag = document.createElement("a");
          const hrTag = document.createElement("hr");
      
          aTag.setAttribute('class', 'mt-3 mb-2 ms-2');
          aTag.setAttribute('href', './seePost.html');
          aTag.setAttribute('style', 'font-size: 30px;');
          aTag.setAttribute('name', 'searchResult');
    
          aTag.innerHTML = titles[i].title;
    
          aTag.addEventListener('click', function() {
              var castToseePost = {
                  "ref1": "Daily",
                  "ref2": "DailyPosts",
                  "title": titles[i].title
              }
    
              localStorage.setItem("castToseePost", JSON.stringify(castToseePost));
          });
      
          hrTag.setAttribute('class', 'ms-2');
      
          docsList.appendChild(aTag);
          docsList.appendChild(hrTag);    
        } else if(titles[i].category == "Unreal") {
          const aTag = document.createElement("a");
          const hrTag = document.createElement("hr");
      
          aTag.setAttribute('class', 'mt-3 mb-2 ms-2');
          aTag.setAttribute('href', './seePost.html');
          aTag.setAttribute('style', 'font-size: 30px;');
          aTag.setAttribute('name', 'searchResult');
    
          aTag.innerHTML = titles[i].title;
    
          aTag.addEventListener('click', function() {
              var castToseePost = {
                  "ref1": "Unreal",
                  "ref2": "UnrealPosts",
                  "title": titles[i].title
              }
    
              localStorage.setItem("castToseePost", JSON.stringify(castToseePost));
          });
      
          hrTag.setAttribute('class', 'ms-2');
      
          docsList.appendChild(aTag);
          docsList.appendChild(hrTag);    
        } else if(titles[i].category == "Trip") {
          const aTag = document.createElement("a");
          const hrTag = document.createElement("hr");
      
          aTag.setAttribute('class', 'mt-3 mb-2 ms-2');
          aTag.setAttribute('href', './seePost.html');
          aTag.setAttribute('style', 'font-size: 30px;');
          aTag.setAttribute('name', 'searchResult');
    
          aTag.innerHTML = titles[i].title;
    
          aTag.addEventListener('click', function() {
              var castToseePost = {
                  "ref1": "Trip",
                  "ref2": "TripPosts",
                  "title": titles[i].title
              }
    
              localStorage.setItem("castToseePost", JSON.stringify(castToseePost));
          });
      
          hrTag.setAttribute('class', 'ms-2');
      
          docsList.appendChild(aTag);
          docsList.appendChild(hrTag);    
        }
      }
    }
  });
