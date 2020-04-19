const chatForm = document.getElementById("chat-form");

const socket = io();

// MESSAGE FROM SERVER
socket.on("message", (message) => {
    console.log(message);

    // MEssag
    outputMessage(message);
});

// Message submit
chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // get text from DOM
    const msg = event.target.elements.msg.value;
    console.log(msg);

    // Emit message to server
    socket.emit("chatMessage", msg);
});

// OUTPUT MESSAGE TO DOM
function outputMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `
    <p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector(".chat-messages").appendChild(div);
}
