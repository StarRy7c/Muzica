document.addEventListener('DOMContentLoaded', () => {
    // --- Playlist Data ---
    const playlists = {
        en: [
            {
                id: 'https://starry7c.github.io/Muzica/musics.html',
                imageUrl: 'download (2).jpeg',
                title: 'Top Pop Hits',
                description: 'Catch the latest chart-topping pop anthems.'
            },
            {
                id: 'en2',
                imageUrl: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Chill',
                title: 'Chill Vibes Only',
                description: 'Relax and unwind with smooth lo-fi & chillhop.'
            },
            {
                id: 'en3',
                imageUrl: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Rock',
                title: 'Classic Rock Legends',
                description: 'Iconic riffs and legendary rock anthems.'
            },
            {
                id: 'en4',
                imageUrl: 'https://via.placeholder.com/150/FFFF33/000000?text=EDM',
                title: 'EDM Workout Fuel',
                description: 'High-energy electronic beats for your workout.'
            },
             {
                id: 'en5',
                imageUrl: 'https://via.placeholder.com/150/FF33A1/FFFFFF?text=Indie',
                title: 'Indie Discovery',
                description: 'Fresh tracks from emerging indie artists.'
            }
        ],
        hi: [
            {
                id: 'hi1',
                imageUrl: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=बॉलीवुड',
                title: 'बॉलीवुड टॉप हिट्स',
                description: 'नवीनतम चार्ट-टॉपिंग बॉलीवुड गीत सुनें।'
            },
            {
                id: 'hi2',
                imageUrl: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=सूफी',
                title: 'सूफी सुकून',
                description: 'आराम करें और शांत सूफी संगीत का आनंद लें।'
            },
            {
                id: 'hi3',
                imageUrl: 'https://via.placeholder.com/150/C70039/FFFFFF?text=ग़ज़ल',
                title: 'क्लासिक ग़ज़लें',
                description: 'सदाबहार और दिल छू लेने वाली ग़ज़लों का संग्रह।'
            },
            {
                id: 'hi4',
                imageUrl: 'https://via.placeholder.com/150/FFFF33/000000?text=पंजाबी',
                title: 'पंजाबी पार्टी हिट्स',
                description: 'आपकी पार्टी के लिए ऊर्जावान पंजाबी बीट्स।'
            },
            {
                id: 'hi5',
                imageUrl: 'https://via.placeholder.com/150/FF33A1/FFFFFF?text=Indie',
                title: 'इंडिपॉप फ्रेश',
                description: 'उभरते हुए इंडिपॉप कलाकारों के नए ट्रैक।'
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

    /**
     * Creates the HTML for a single playlist card.
     * @param {object} playlist - Playlist data object.
     * @returns {string} HTML string for the card.
     */
    function createPlaylistCardHTML(playlist) {
        return `
            <div class="bg-gray-800 bg-opacity-60 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out flex flex-col items-center text-center backdrop-blur-sm">
                <div class="mb-4">
                    <img src="${playlist.imageUrl}" alt="${playlist.title}" class="rounded-full w-24 h-24 md:w-32 md:h-32 object-cover border-4 border-purple-500 shadow-md">
                </div>
                <h3 class="text-lg md:text-xl font-bold mb-2">${playlist.title}</h3>
                <p class="text-gray-400 text-sm mb-5 flex-grow">${playlist.description}</p>
                <button class="open-playlist-btn relative overflow-hidden mt-auto w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 rounded-full font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 focus:ring-offset-gray-800 transition-all duration-300 ease-in-out" data-playlist-id="${playlist.id}">
                    Open Playlist
                    <span class="absolute inset-0"></span> </button>
            </div>
        `;
    }

    /**
     * Renders the playlist cards for the selected language.
     * @param {string} lang - The language code ('en' or 'hi').
     */
    function renderPlaylists(lang) {
        playlistGrid.innerHTML = ''; // Clear existing cards
        const data = playlists[lang] || playlists['en']; // Fallback to English
        data.forEach(playlist => {
            const cardHTML = createPlaylistCardHTML(playlist);
            playlistGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
         // Re-attach ripple listeners after rendering
        attachRippleEffect();
    }

    /**
     * Updates the visual state of the language toggle buttons.
     * @param {string} activeLang - The language code ('en' or 'hi') to mark as active.
     */
    function updateActiveButton(activeLang) {
        langToggleButtons.forEach(button => {
            button.classList.remove('active-lang');
            if (button.id === `lang-${activeLang}`) {
                button.classList.add('active-lang');
            }
        });
    }

     /**
      * Creates a ripple effect on button click.
      * @param {Event} event - The click event.
      */
     function createRipple(event) {
        const button = event.currentTarget;

        // Clear existing ripples before creating a new one
        const existingRipple = button.querySelector(".ripple");
        if (existingRipple) {
            existingRipple.remove();
        }

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        // Position ripple at click location relative to button
        const rect = button.getBoundingClientRect();
        const rippleX = event.clientX - rect.left - radius;
        const rippleY = event.clientY - rect.top - radius;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${rippleX}px`;
        circle.style.top = `${rippleY}px`;
        circle.classList.add("ripple");

        button.appendChild(circle);

        // Optional: Remove the ripple span after the animation finishes
        setTimeout(() => {
            if (circle.parentNode) { // Check if it still exists
                circle.remove();
            }
        }, 600); // Match animation duration
    }

     /**
      * Attaches ripple effect listeners to all 'Open Playlist' buttons.
      */
     function attachRippleEffect() {
        const buttons = document.querySelectorAll('.open-playlist-btn');
        buttons.forEach(button => {
            // Remove existing listener to prevent duplicates if re-rendering
            button.removeEventListener('click', createRipple);
            // Add the listener
            button.addEventListener('click', createRipple);

            // Add a basic console log for demonstration
            button.addEventListener('click', (e) => {
                 if (e.target === button) { // Prevent triggering if click is on ripple span itself
                     console.log(`Opening playlist: ${button.dataset.playlistId}`);
                     // Add actual navigation or modal opening logic here
                 }
            });
        });
     }

    // --- Event Listeners ---
    langEnButton.addEventListener('click', () => {
        if (currentLang !== 'en') {
            currentLang = 'en';
            updateActiveButton('en');
            renderPlaylists('en');
        }
    });

    langHiButton.addEventListener('click', () => {
        if (currentLang !== 'hi') {
            currentLang = 'hi';
            updateActiveButton('hi');
            renderPlaylists('hi');
        }
    });

    // --- Initial Render ---
    updateActiveButton(currentLang);
    renderPlaylists(currentLang);

});
