document.addEventListener('DOMContentLoaded', () => {
    // --- Playlist Data ---
    const playlists = {
        en: [
            { // First object
                id: 'en1',
                imageUrl: 'uD6zENCJz1g-HD (1).jpg', // Make sure this image exists in the same folder as index.html or path is correct
                title: 'Top Pop Hits',
                description: 'Catch the latest chart-topping pop anthems.',
                playlistUrl: 'https://starry7c.github.io/Muzica/Musics.html'
            }, // <-- Fixed comma
            { // Second object
                id: 'en2',
                imageUrl: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Chill',
                title: 'Chill Vibes Only',
                description: 'Relax and unwind with smooth lo-fi & chillhop.',
                playlistUrl: 'https://example.com/chill' // Add URLs if needed
            }, // <-- Comma
            {
                id: 'en3',
                imageUrl: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Rock',
                title: 'Classic Rock Legends',
                description: 'Iconic riffs and legendary rock anthems.',
                playlistUrl: 'https://example.com/rock' // Add URLs if needed
            }, // <-- Comma
            {
                id: 'en4',
                imageUrl: 'https://via.placeholder.com/150/FFFF33/000000?text=EDM',
                title: 'EDM Workout Fuel',
                description: 'High-energy electronic beats for your workout.',
                playlistUrl: 'https://example.com/edm' // Add URLs if needed
            }, // <-- Comma
            {
                id: 'en5',
                imageUrl: 'https://via.placeholder.com/150/FF33A1/FFFFFF?text=Indie',
                title: 'Indie Discovery',
                description: 'Fresh tracks from emerging indie artists.',
                 playlistUrl: 'https://example.com/indie' // Add URLs if needed
            } // <-- No comma after the last one in the array
        ],
        hi: [
             {
                id: 'hi1',
                imageUrl: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=बॉलीवुड',
                title: 'बॉलीवुड टॉप हिट्स',
                description: 'नवीनतम चार्ट-टॉपिंग बॉलीवुड गीत सुनें。',
                 playlistUrl: 'https://example.com/bollywood' // Add URLs if needed
            }, // <-- Comma
            {
                id: 'hi2',
                imageUrl: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=सूफी',
                title: 'सूफी सुकून',
                description: 'आराम करें और शांत सूफी संगीत का आनंद लें。',
                 playlistUrl: 'https://example.com/sufi' // Add URLs if needed
            }, // <-- Comma
            {
                id: 'hi3',
                imageUrl: 'https://via.placeholder.com/150/C70039/FFFFFF?text=ग़ज़ल',
                title: 'क्लासिक ग़ज़लें',
                description: 'सदाबहार और दिल छू लेने वाली ग़ज़लों का संग्रह。',
                 playlistUrl: 'https://example.com/ghazal' // Add URLs if needed
            }, // <-- Comma
            {
                id: 'hi4',
                imageUrl: 'https://via.placeholder.com/150/FFFF33/000000?text=पंजाबी',
                title: 'पंजाबी पार्टी हिट्स',
                description: 'आपकी पार्टी के लिए ऊर्जावान पंजाबी बीट्स。',
                 playlistUrl: 'https://example.com/punjabi' // Add URLs if needed
            }, // <-- Comma
            {
                id: 'hi5',
                imageUrl: 'https://via.placeholder.com/150/FF33A1/FFFFFF?text=Indie',
                title: 'इंडिपॉप फ्रेश',
                description: 'उभरते हुए इंडिपॉप कलाकारों के नए ट्रैक。',
                 playlistUrl: 'https://example.com/indipop' // Add URLs if needed
            }
        ]
    };

    // --- DOM Elements ---
    const playlistGrid = document.getElementById('playlist-grid');
    const langEnButton = document.getElementById('lang-en');
    const langHiButton = document.getElementById('lang-hi');
    const langToggleButtons = document.querySelectorAll('.lang-toggle');

    let currentLang = 'en'; // Default language

    // --- Functions ---

    function createPlaylistCardHTML(playlist) {
        // Ensure playlist object and imageUrl are valid before creating HTML
        if (!playlist || typeof playlist.imageUrl === 'undefined') {
            console.error("Invalid playlist data provided to createPlaylistCardHTML:", playlist);
            return ''; // Return empty string or some placeholder error HTML
        }
        return `
            <div class="bg-gray-800 bg-opacity-60 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out flex flex-col items-center text-center backdrop-blur-sm">
                <div class="mb-4">
                    <img src="${playlist.imageUrl}" alt="${playlist.title || 'Playlist Image'}" class="rounded-full w-24 h-24 md:w-32 md:h-32 object-cover border-4 border-purple-500 shadow-md">
                </div>
                <h3 class="text-lg md:text-xl font-bold mb-2">${playlist.title || 'Untitled Playlist'}</h3>
                <p class="text-gray-400 text-sm mb-5 flex-grow">${playlist.description || ''}</p>
                <button class="open-playlist-btn relative overflow-hidden mt-auto w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 rounded-full font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 focus:ring-offset-gray-800 transition-all duration-300 ease-in-out"
                        data-playlist-id="${playlist.id || ''}">
                    Open Playlist
                    <span class="absolute inset-0"></span> </button>
            </div>
        `;
    }

    function renderPlaylists(lang) {
        playlistGrid.innerHTML = ''; // Clear existing cards
        const data = playlists[lang] || []; // Fallback to empty array if lang not found
        if (!Array.isArray(data)) {
             console.error(`Playlist data for language "${lang}" is not an array:`, data);
             return; // Stop execution if data is not an array
         }
        data.forEach(playlist => {
            if (playlist) { // Add check for null/undefined playlist objects
                 const cardHTML = createPlaylistCardHTML(playlist);
                 playlistGrid.insertAdjacentHTML('beforeend', cardHTML);
             } else {
                 console.warn(`Undefined playlist object encountered in language "${lang}"`);
             }
        });
         // Re-attach listeners after rendering
        attachRippleEffect();
    }

    function updateActiveButton(activeLang) {
        langToggleButtons.forEach(button => {
            button.classList.remove('active-lang');
            if (button.id === `lang-${activeLang}`) {
                button.classList.add('active-lang');
            }
        });
    }

     function createRipple(event) {
        const button = event.currentTarget;
        const existingRipple = button.querySelector(".ripple");
        if (existingRipple) {
            existingRipple.remove();
        }
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        const rect = button.getBoundingClientRect();
        const rippleX = event.clientX - rect.left - radius;
        const rippleY = event.clientY - rect.top - radius;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${rippleX}px`;
        circle.style.top = `${rippleY}px`;
        circle.classList.add("ripple"); // Ensure .ripple CSS class is defined
        button.appendChild(circle);
        setTimeout(() => {
            if (circle.parentNode) {
                circle.remove();
            }
        }, 600);
    }

    // *** USE THE CORRECTED attachRippleEffect FUNCTION FROM ABOVE ***
    function attachRippleEffect() {
        const buttons = document.querySelectorAll('.open-playlist-btn');

        buttons.forEach(button => {
            // --- Get data associated with THIS button ---
            const playlistId = button.dataset.playlistId;

            // Find the full playlist object using the ID from the correct language array
            const currentPlaylistArray = playlists[currentLang] || []; // Get array for current lang
            const playlistData = currentPlaylistArray.find(p => p && p.id === playlistId); // Added check for p

            // --- Define named listener functions for easier removal/management ---
            const handleRipple = (event) => {
                 if (event.target === button || event.target.parentNode === button) {
                      createRipple(event);
                 }
            };

            const handleNavigation = (event) => {
    if (event.target !== event.currentTarget && event.target.classList.contains('ripple')) {
        return; // Ignore clicks on the ripple itself
    }

    console.log(`Button clicked for ID: ${playlistId}`);

    if (playlistData && playlistData.playlistUrl) {
        console.log(`Found URL: ${playlistData.playlistUrl}. Navigating...`);
        
        // Send message to WebView instead of opening a new tab
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(playlistData.playlistUrl);
        } else {
            window.location.href = playlistData.playlistUrl; // fallback
        }

    } else {
        console.log(`No valid playlistUrl found for ID: ${playlistId}. Playlist data found:`, playlistData);
    }
};
            // --- Clean up potential old listeners before adding new ones ---
            // A more robust way is needed if listeners pile up, but let's try this simple re-add.
            // If navigation happens multiple times per click, this needs refinement.
            button.removeEventListener('click', handleRipple); // Attempt removal
            button.removeEventListener('click', handleNavigation); // Attempt removal

            // --- Add NEW listeners ---
            button.addEventListener('click', handleRipple);
            button.addEventListener('click', handleNavigation);
        });
    }


    // --- Event Listeners ---
    langEnButton.addEventListener('click', () => {
        if (currentLang !== 'en') {
            currentLang = 'en';
            renderPlaylists('en'); // Render first
             updateActiveButton('en'); // Then update style
        }
    });

    langHiButton.addEventListener('click', () => {
        if (currentLang !== 'hi') {
            currentLang = 'hi';
            renderPlaylists('hi'); // Render first
            updateActiveButton('hi'); // Then update style
        }
    });

    // --- Initial Render ---
    renderPlaylists(currentLang); // Render first
    updateActiveButton(currentLang); // Then update style

});
