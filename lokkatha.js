// Language switcher
const langButtons = document.querySelectorAll(".language-btn");

langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        langButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

// File Upload Preview
const fileInput = document.getElementById("fileInput");
const filePreview = document.getElementById("filePreview");
const uploadArea = document.getElementById("uploadArea");

uploadArea.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    filePreview.innerHTML = "";
    const files = Array.from(fileInput.files);

    files.forEach(file => {
        const reader = new FileReader();

        reader.onload = e => {
            const preview = document.createElement("div");
            preview.classList.add("preview-item");

            if (file.type.startsWith("image")) {
                preview.innerHTML = `<img src="${e.target.result}">`;
            } else if (file.type.startsWith("video")) {
                preview.innerHTML = `<video src="${e.target.result}" controls></video>`;
            }

            filePreview.appendChild(preview);
        };

        reader.readAsDataURL(file);
    });
});

// Voice Input
const voiceBtn = document.getElementById("voiceInput");
const postContent = document.getElementById("postContent");
let recognition;

if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "en-IN";

    voiceBtn.addEventListener("click", () => {
        recognition.start();
    });

    recognition.onresult = event => {
        postContent.value += event.results[0][0].transcript + " ";
    };
}

// Posts Storage
const postsFeed = document.getElementById("postsFeed");
document.getElementById("submitPost").addEventListener("click", createPost);

function createPost() {
    const title = document.getElementById("postTitle").value;
    const content = postContent.value;
    const location = document.getElementById("postLocation").value;

    if (!title || !content) {
        alert("Please enter both title and story.");
        return;
    }

    const postDiv = document.createElement("div");
    postDiv.classList.add("post-card");

    // Media files
    let mediaHTML = "";
    const files = Array.from(fileInput.files);

    files.forEach(file => {
        const url = URL.createObjectURL(file);
        if (file.type.startsWith("image")) {
            mediaHTML += `<img src="${url}">`;
        } else if (file.type.startsWith("video")) {
            mediaHTML += `<video src="${url}" controls></video>`;
        }
    });

    postDiv.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        ${location ? `<small><i class="fas fa-map-marker-alt"></i> ${location}</small>` : ""}
        <div class="post-media">${mediaHTML}</div>
    `;

    postsFeed.prepend(postDiv);

    // Clear fields
    document.getElementById("postTitle").value = "";
    postContent.value = "";
    fileInput.value = "";
    filePreview.innerHTML = "";
}

/* Sidebar Content */
const communityList = document.getElementById("communityList");
const trendingList = document.getElementById("trendingList");
const visitorsList = document.getElementById("visitorsList");

// Sample Data
const communities = [
    "Kumaon Stories",
    "Garhwal Heritage",
    "Local Guides",
    "Village Diaries",
    "Travelers Hub"
];

communities.forEach(name => {
    const div = document.createElement("div");
    div.classList.add("community-item");
    div.innerHTML = `${name} <span class="follow-btn">Follow</span>`;
    communityList.appendChild(div);
});

const trending = [
    "Snowfall in Auli",
    "Haridwar Makar Sankranti",
    "Chopta Trek",
    "Dehradun Winter Carnival"
];

trending.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("trending-item");
    div.textContent = item;
    trendingList.appendChild(div);
});

// Visitors
["Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai"].forEach(visitor => {
    const div = document.createElement("div");
    div.classList.add("community-item");
    div.textContent = `${visitor} Visitor`;
    visitorsList.appendChild(div);
});
