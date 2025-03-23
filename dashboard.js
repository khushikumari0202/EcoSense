document.addEventListener("DOMContentLoaded", () => {
    const userNameDisplay = document.getElementById("user-name");
    const userPic = document.getElementById("user-pic");
    const logoutBtn = document.getElementById("logout-btn");
    const addRoomBtn = document.getElementById("add-room-btn");
    const modal = document.getElementById("add-room-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const saveRoomBtn = document.getElementById("save-room-btn");
    const roomNameInput = document.getElementById("room-name");
    const roomImageInput = document.getElementById("room-image");
    const roomsContainer = document.getElementById("rooms-container");
    const noRoomsText = document.getElementById("no-rooms-text");
    const contextMenu = document.getElementById("context-menu");
    const openRoomOption = document.getElementById("open-room");
    const deleteRoomOption = document.getElementById("delete-room");

    let selectedRoomIndex = null; // To track which room was right-clicked

    const loggedInUserEmail = localStorage.getItem("loggedInUser");

    if (!loggedInUserEmail) {
        window.location.href = "index.html"; // Redirect if not logged in
    } else {
        const userData = JSON.parse(localStorage.getItem(loggedInUserEmail));
        if (userData) {
            userNameDisplay.textContent = userData.name;
            if (userData.profilePic) {
                userPic.src = userData.profilePic;
            }
        }
    }

    // Show modal
    addRoomBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    // Close modal
    closeModalBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Save Room
    saveRoomBtn.addEventListener("click", () => {
        const roomName = roomNameInput.value.trim();
        if (!roomName) {
            alert("Please enter a room name!");
            return;
        }

        let reader = new FileReader();
        if (roomImageInput.files.length > 0) {
            reader.readAsDataURL(roomImageInput.files[0]);
            reader.onload = function () {
                saveRoom(roomName, reader.result);
            };
        } else {
            saveRoom(roomName, "default-room.jpg");
        }
    });

    function saveRoom(name, image) {
        let rooms = JSON.parse(localStorage.getItem("rooms")) || [];

        rooms.push({ name, image });
        localStorage.setItem("rooms", JSON.stringify(rooms));

        modal.classList.add("hidden");
        roomNameInput.value = "";
        roomImageInput.value = "";
        renderRooms();
    }

    function renderRooms() {
        let rooms = JSON.parse(localStorage.getItem("rooms")) || [];
        roomsContainer.innerHTML = "";

        if (rooms.length === 0) {
            noRoomsText.style.display = "block";
        } else {
            noRoomsText.style.display = "none";
        }

        rooms.forEach((room, index) => {
            const roomCard = document.createElement("div");
            roomCard.classList.add("room-card");
            roomCard.dataset.index = index;

            roomCard.innerHTML = `
                <img src="${room.image}" alt="${room.name}">
                <h4>${room.name}</h4>
            `;

            roomCard.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                selectedRoomIndex = index;
                contextMenu.style.top = `${e.pageY}px`;
                contextMenu.style.left = `${e.pageX}px`;
                contextMenu.style.display = "block";
            });

            roomsContainer.appendChild(roomCard);
        });

        // Hide context menu on click outside
        document.addEventListener("click", () => {
            contextMenu.style.display = "none";
        });
    }

    // Handle context menu options
    openRoomOption.addEventListener("click", () => {
        const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
        alert(`Opening ${rooms[selectedRoomIndex].name}...`); // Replace with actual navigation logic
    });

    deleteRoomOption.addEventListener("click", () => {
        let rooms = JSON.parse(localStorage.getItem("rooms")) || [];
        rooms.splice(selectedRoomIndex, 1);
        localStorage.setItem("rooms", JSON.stringify(rooms));
        renderRooms();
    });

    openRoomOption.addEventListener("click", () => {
        const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
        const roomName = rooms[selectedRoomIndex].name;
        
        // Save the selected room name in sessionStorage for navigation
        sessionStorage.setItem("currentRoom", roomName);
        
        // Navigate to the room page
        window.location.href = "room.html";
    });
    

    renderRooms();
    
});
