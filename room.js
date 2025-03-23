document.addEventListener("DOMContentLoaded", () => {
    const roomTitle = document.getElementById("room-title");
    const backBtn = document.getElementById("back-btn");
    const addDeviceBtn = document.getElementById("add-device-btn");
    const modal = document.getElementById("add-device-modal");
    const closeDeviceModal = document.getElementById("close-device-modal");
    const saveDeviceBtn = document.getElementById("save-device-btn");
    const deviceNameInput = document.getElementById("device-name");
    const devicesContainer = document.getElementById("devices-container");
    const noDevicesText = document.getElementById("no-devices-text");

    const currentRoom = sessionStorage.getItem("currentRoom");
    if (!currentRoom) {
        alert("No room selected!");
        window.location.href = "index.html"; // Redirect back if no room is selected
    } else {
        roomTitle.textContent = currentRoom;
    }

    backBtn.addEventListener("click", () => {
        window.location.href = "index.html"; // Go back to home
    });

    addDeviceBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeDeviceModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    saveDeviceBtn.addEventListener("click", () => {
        const deviceName = deviceNameInput.value.trim();
        if (!deviceName) {
            alert("Please enter a device name!");
            return;
        }

        let roomDevices = JSON.parse(localStorage.getItem(currentRoom)) || [];
        roomDevices.push({ name: deviceName, state: "OFF" });

        localStorage.setItem(currentRoom, JSON.stringify(roomDevices));

        modal.style.display = "none";
        deviceNameInput.value = "";
        renderDevices();
    });

    function renderDevices() {
        let roomDevices = JSON.parse(localStorage.getItem(currentRoom)) || [];
        devicesContainer.innerHTML = "";

        if (roomDevices.length === 0) {
            noDevicesText.style.display = "block";
        } else {
            noDevicesText.style.display = "none";
        }

        roomDevices.forEach((device, index) => {
            const deviceCard = document.createElement("div");
            deviceCard.classList.add("device-card");

            const toggleButton = document.createElement("button");
            toggleButton.classList.add("device-toggle");
            toggleButton.textContent = device.state;
            toggleButton.classList.add(device.state === "ON" ? "device-on" : "device-off");

            toggleButton.addEventListener("click", () => {
                roomDevices[index].state = roomDevices[index].state === "ON" ? "OFF" : "ON";
                localStorage.setItem(currentRoom, JSON.stringify(roomDevices));
                renderDevices();
            });

            deviceCard.innerHTML = `<h4>${device.name}</h4>`;
            deviceCard.appendChild(toggleButton);
            devicesContainer.appendChild(deviceCard);
        });
    }

    renderDevices();
});
