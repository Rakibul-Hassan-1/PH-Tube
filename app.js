var allId = 1000;
const loadAllData = () => {
  allId = 1000;
  fetch("https://openapi.programming-hero.com/api/videos/category/1000")
    .then((res) => res.json())
    .then((data) => displayAllData(data.data));
};
loadAllData();
const loadmusicdata = () => {
  allId = 1001;
  fetch("https://openapi.programming-hero.com/api/videos/category/1001")
    .then((res) => res.json())
    .then((data) => displayAllData(data.data));
};

const loadComedyData = () => {
  allId = 1003;
  fetch("https://openapi.programming-hero.com/api/videos/category/1003")
    .then((res) => res.json())
    .then((data) => displayAllData(data.data));
};

const loadDrawingData = () => {
  allId = 1005;
  fetch("https://openapi.programming-hero.com/api/videos/category/1005")
    .then((res) => res.json())
    .then((data) => displayAllData(data.data));
};

const sortbyview = () => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${allId}`)
    .then((res) => res.json())
    .then((data) => {
      const sortdata = data.data.sort((a, b) => {
        const viewsA = parseFloat(a.others.views);
        const viewsB = parseFloat(b.others.views);
        return viewsB - viewsA;
      });
      displayAllData(sortdata);
    });
};

const displayAllData = (data) => {
  console.log(data);
  console.log(data.length);

  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (data.length == 0) {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="drawing-contain text-center">
    <img class="" src="./image/Icon.png" alt="error">
    <p class="fw-bold mt-3">Oops!! Sorry, There is no <br>Content here</p>
    </div>
    `;
    videoContainer.appendChild(card);
  } else {
    data.forEach((video) => {
      console.log(video);
      console.log("Thumbnail:", video.thumbnail);
      const card = document.createElement("div");
      card.classList.add("col-xl-4");
      const posteddate = calculatetime(video.others.posted_date);
      card.innerHTML = `
    <div class="card ">
        <img src="${video?.thumbnail}" class="card-img-top" alt="...">
        ${posteddate ? `<p class="duration text-center">${posteddate}</p>` : ""}
       
        <div class="card-body">
            <div class="d-flex">
                <img src="${
                  video.authors[0].profile_picture
                }" alt="" class="author-picture w-25">
                <h5 class="card-title">${video.title}</h5>
            </div>
            <div class="video-details m-auto text-center">
            <div class="profile-info text-center  d-flex justify-content-center">
                <p class="card-text text-center pe-2 ">${
                  video.authors[0].profile_name
                }</p>
                ${
                  video.authors[0].verified
                    ? '<img class="verified-image" src="./image/verified_7641727.png" alt="verified">'
                    : ""
                }
                </div>   
                <p class="views justify-content-center  text-center pe-2 ">${
                  video.others.views
                } views</p> 
            </div>
        </div>
    </div>
    `;
      videoContainer.appendChild(card);
    });
  }
};

const calculatetime = (seconds) => {
  const hour = Math.floor((seconds % (3600 * 24)) / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  return hour > 0 ? `${hour} hour ${minute} minutes ago` : "";
};
