// Handle file upload and display content
document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const textarea = document.createElement("textarea");
            textarea.value = content;

            // Clear previous content
            document.getElementById("fileContent").innerHTML = "";
            document.getElementById("fileContent").appendChild(textarea);

            // Save Button
            const saveButton = document.createElement("button");
            saveButton.textContent = "Save File";
            saveButton.onclick = function() {
                const blob = new Blob([textarea.value], { type: "text/plain" });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = file.name;
                a.click();
            };
            document.getElementById("fileContent").appendChild(saveButton);
        };
        reader.readAsText(file);
    }
});

// Function to change background image
function setBackground() {
    const imageUrl = document.getElementById("bgInput").value;
    if (imageUrl) {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
    }
}
