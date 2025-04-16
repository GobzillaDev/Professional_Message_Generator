async function generateMessage() {
    const type = document.getElementById('message_type').value;
    const recipient = document.getElementById('recipient_name').value.trim();
    const field = document.getElementById('field').value.trim();
    const sender = document.getElementById('name').value.trim();

    try {
        const response = await fetch('templates.json');
        const templates = await response.json();

        const typeTemplates = templates[type];
        if (!typeTemplates) {
            document.getElementById('output').innerText = "No templates found for this type.";
            return;
        }

        const rawTemplate = typeTemplates[Math.floor(Math.random() * typeTemplates.length)];

        const message = rawTemplate
            .replace("{{recipient}}", recipient)
            .replace("{{field}}", field)
            .replace("{{sender}}", sender);

        document.getElementById('output').innerText = message;
    } catch (error) {
        console.error('Error loading templates:', error);
        document.getElementById('output').innerText = "Error loading message template.";
    }
}


function copyMessage() {
    const output = document.getElementById('output');
    const text = output.textContent;

    navigator.clipboard.writeText(text)
    .then(() => {
        showPopup();
    })
}

function showPopup() {
    const popup = document.getElementById('popup');
    popup.className = 'show';

    setTimeout(() => {
        popup.className = popup.className.replace('show', '');
    }, 3000);
}