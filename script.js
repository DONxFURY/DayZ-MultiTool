// Set the background image URL in the script directly
const backgroundImageUrl = 'https://i.imgur.com/0SUP1i6.jpg';
document.body.style.backgroundImage = `url('${backgroundImageUrl}')`;

// Load Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' }});
require(["vs/editor/editor.main"], function() {
    window.editor = monaco.editor.create(document.getElementById("editorContainer"), {
        value: "// Upload a file to start editing...",
        language: "plaintext",
        theme: "vs-dark",
        automaticLayout: true
    });
});

// Handle File Upload & Editing
document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const extension = file.name.split('.').pop().toLowerCase();

            // Set the correct language for syntax highlighting
            let language = "plaintext";
            if (extension === "xml") language = "xml";
            else if (extension === "json") language = "json";

            // Set Monaco Editor Content
            window.editor.setValue(content);
            monaco.editor.setModelLanguage(window.editor.getModel(), language);

            // Validate file content (XML/JSON)
            validateFile(content, language);
        };
        reader.readAsText(file);
    }
});

// Handle Save File
document.getElementById("saveButton").addEventListener("click", function() {
    const content = window.editor.getValue();
    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "edited_file.txt";
    a.click();
});

// File Validation for XML & JSON (Error Handling)
function validateFile(content, language) {
    let errorMessage = "";

    try {
        if (language === "json") {
            JSON.parse(content);
        } else if (language === "xml") {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(content, "application/xml");
            if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                errorMessage = "Error: Invalid XML structure.";
            }
        }
    } catch (e) {
        errorMessage = `Error: ${e.message}`;
    }

    // Show error message if validation fails
    const errorContainer = document.getElementById("errorContainer");
    if (errorMessage) {
        errorContainer.style.display = "block";
        errorContainer.textContent = errorMessage;
    } else {
        errorContainer.style.display = "none";
    }
}
