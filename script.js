// Toggle Navigation Menu
function toggleMenu() {
  var menuIcon = document.getElementById("menu-icon");
  var mainNav = document.getElementById("main-nav");
  menuIcon.classList.toggle("change");
  mainNav.classList.toggle("active");
}

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    var targetElement = document.querySelector(this.getAttribute("href"));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
    // Close the menu after clicking a link
    if (mainNav.classList.contains("active")) {
      toggleMenu();
    }
  });
});

// Array to store all gallery images
let galleryImages = [];
let currentImageIndex = 0;

// Open Modal Function
function openModal(image) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  // Store gallery images if not already done
  if (galleryImages.length === 0) {
    galleryImages = Array.from(document.querySelectorAll(".grid-item img"));
  }

  // Find the index of the clicked image
  currentImageIndex = galleryImages.indexOf(image);

  // Set modal content
  modal.style.display = "flex";
  modalImg.src = image.src;
  const caption = document.getElementById("caption"); // Ensure this exists
  if (caption) {
    caption.textContent = image.alt;
  }
}

// Close Modal Function
function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
}

// Show Previous Image
function prevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length; // Wrap around
  updateModalImage();
}

// Show Next Image
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length; // Wrap around
  updateModalImage();
}

// Update Modal with Smooth Animation
function updateModalImage() {
  const modalImg = document.getElementById("modalImage");
  const caption = document.getElementById("caption");

  // Add fade-out animation
  modalImg.style.animation = "fadeOut 0.5s ease";

  // Wait for fade-out animation to complete before changing image
  setTimeout(() => {
    const currentImage = galleryImages[currentImageIndex];
    modalImg.src = currentImage.src;
    if (caption) {
      caption.textContent = currentImage.alt;
    }

    // Add fade-in animation
    modalImg.style.animation = "fadeIn 0.5s ease";
  }, 500); // Match animation duration
}

// Show Thank You Message
function showThankYou(event) {
  // Prevent the form from redirecting
  event.preventDefault();

  // Hide the form
  const form = document.getElementById("contact-form");
  form.style.display = "none";

  // Show the thank-you message
  const thankYouMessage = document.getElementById("thank-you-message");
  thankYouMessage.style.display = "block";

  // Optionally, submit the form to FormSubmit
  form.submit();
}

// Select the audio element and control button
const audio = document.getElementById("background-audio");
const audioControl = document.getElementById("audio-control");
const audioIcon = document.getElementById("audio-icon");

// Set up audio and default state
audio.volume = 0.5; // Default moderate volume
let isPlaying = false; // Assume audio is not playing by default

// Try to autoplay audio on page load
audio
  .play()
  .then(() => {
    isPlaying = true;
    audioIcon.textContent = "❚❚"; // Default to pause icon
  })
  .catch((error) => {
    console.warn("Autoplay blocked. Waiting for user interaction:", error);
  });

// Function to enable audio on user interaction
function enableAudio() {
  if (!isPlaying) {
    audio
      .play()
      .then(() => {
        isPlaying = true;
        audioIcon.textContent = "❚❚"; // Pause icon
      })
      .catch((error) => {
        console.error("Audio playback failed:", error);
      });
  }
  // Remove interaction listeners after enabling audio
  document.removeEventListener("click", enableAudio);
  document.removeEventListener("scroll", enableAudio);
}

// Add interaction listeners to start audio if autoplay fails
document.addEventListener("click", enableAudio);
document.addEventListener("scroll", enableAudio);

// Fade the button after a delay
let fadeTimeout;
function startFade() {
  fadeTimeout = setTimeout(() => {
    audioControl.style.opacity = "0.2"; // Fade-out to almost invisible
  }, 3000); // Fade after 3 seconds
}

// Cancel fade on hover
audioControl.addEventListener("mouseover", () => {
  clearTimeout(fadeTimeout);
  audioControl.style.opacity = "1"; // Reset opacity
  audioControl.style.transform = "scale(1.1)"; // Subtle zoom-in on hover
});

// Resume fade on mouse leave
audioControl.addEventListener("mouseleave", () => {
  audioControl.style.transform = "scale(1)"; // Reset scale
  startFade();
});

// Toggle audio playback
function toggleAudio() {
  if (isPlaying) {
    audio.pause();
    audioIcon.textContent = "▶"; // Flat play icon
    isPlaying = false;
  } else {
    audio
      .play()
      .then(() => {
        audioIcon.textContent = "❚❚"; // Flat pause icon
        isPlaying = true;
      })
      .catch((error) => {
        console.error("Failed to play audio:", error);
        alert("Unable to play audio. Please check browser settings.");
      });
  }
}

// Function to fade audio volume to target level
function fadeAudioVolume(targetVolume, duration = 1000) {
  const step = 0.05; // Step size for volume change
  const interval = duration / (audio.volume / step); // Calculate interval based on duration
  const adjustVolume = setInterval(() => {
    const currentVolume = parseFloat(audio.volume.toFixed(2));
    if (currentVolume > targetVolume) {
      audio.volume = Math.max(currentVolume - step, targetVolume);
    } else if (currentVolume < targetVolume) {
      audio.volume = Math.min(currentVolume + step, targetVolume);
    }
    if (audio.volume === targetVolume) {
      clearInterval(adjustVolume);
    }
  }, interval);
}

// Detect which section is in view
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      if (section.id.startsWith("video")) {
        // Fade audio to 0 volume on video sections
        fadeAudioVolume(0, 1000); // 1-second fade
      } else if (["landing", "gallery", "contact"].includes(section.id)) {
        // Restore full volume on non-video sections
        fadeAudioVolume(0.5, 1000); // 1-second fade
      }
    }
  });
});

// Create Cursor Elements
const customCursor = document.createElement("div");
customCursor.classList.add("custom-cursor");

const cursorRing = document.createElement("div");
cursorRing.classList.add("cursor-ring");

const cursorDot = document.createElement("div");
cursorDot.classList.add("cursor-dot");

customCursor.appendChild(cursorRing);
customCursor.appendChild(cursorDot);
document.body.appendChild(customCursor);

// Initialize cursor position and visibility
customCursor.style.display = "none"; // Hide until mouse moves

// Track Mouse Movement - Synchronize Cursor
document.addEventListener("mousemove", (e) => {
  const cursorX = e.clientX;
  const cursorY = e.clientY;

  // Ensure custom cursor is visible
  customCursor.style.display = "block";

  // Move dot immediately to mouse location
  cursorDot.style.left = `${cursorX}px`;
  cursorDot.style.top = `${cursorY}px`;

  // Smoothly move the cursor ring with a slight delay
  cursorRing.style.transform = `translate(${cursorX - 30}px, ${
    cursorY - 30
  }px)`;
});

// Ripple Effect on Click
document.addEventListener("click", (e) => {
  const ripple = document.createElement("div");
  ripple.classList.add("ripple-effect");

  // Position ripple at the click location
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;

  document.body.appendChild(ripple);

  // Remove ripple after animation ends
  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
});

// Prevent Cursor Issues in Embedded Videos (iframes)
document.querySelectorAll("iframe").forEach((iframe) => {
  iframe.addEventListener("mouseenter", () => {
    customCursor.style.display = "none"; // Hide custom cursor when mouse enters iframe
  });
  iframe.addEventListener("mouseleave", () => {
    customCursor.style.display = "block"; // Show custom cursor when mouse leaves iframe
  });
});

// Ripple Effect on Click (with gallery-specific handling)
document.addEventListener("click", (e) => {
  const ripple = document.createElement("div");
  ripple.classList.add("ripple-effect");

  // Use page coordinates for ripple placement
  ripple.style.left = `${e.pageX}px`;
  ripple.style.top = `${e.pageY}px`;

  document.body.appendChild(ripple);

  // Remove ripple after animation ends
  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
});

// Add ripple effect on gallery items
document.querySelectorAll("#gallery .grid-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    // Prevent the ripple effect from being blocked by event propagation
    e.stopPropagation();

    const ripple = document.createElement("div");
    ripple.classList.add("ripple-effect");

    // Use coordinates relative to the clicked element
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    item.appendChild(ripple);

    // Remove ripple after animation ends
    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  });
});

// Track Mouse Movement - Synchronize Cursor
document.addEventListener("mousemove", (e) => {
  const cursorX = e.clientX;
  const cursorY = e.clientY;

  // Ensure custom cursor is visible
  customCursor.style.display = "block";

  // Move dot immediately to mouse location
  cursorDot.style.left = `${cursorX}px`;
  cursorDot.style.top = `${cursorY}px`;

  // Smoothly move the cursor ring with a slight delay
  cursorRing.style.transform = `translate(${cursorX - 30}px, ${
    cursorY - 30
  }px)`;
});

// Prevent Custom Cursor Issues in Embedded Videos (iframes)
document.querySelectorAll("iframe").forEach((iframe) => {
  iframe.addEventListener("mouseenter", () => {
    customCursor.style.display = "none"; // Hide custom cursor when mouse enters iframe
  });
  iframe.addEventListener("mouseleave", () => {
    customCursor.style.display = "block"; // Show custom cursor when mouse leaves iframe
  });
});

// Add Custom Cursor Inside Video Frames (Workaround)
document.querySelectorAll("iframe").forEach((iframe) => {
  // Add a transparent overlay over the iframe to capture cursor movement
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = `${iframe.offsetWidth}px`;
  overlay.style.height = `${iframe.offsetHeight}px`;
  overlay.style.pointerEvents = "none"; // Allow interaction with the iframe
  overlay.style.zIndex = "1"; // Ensure it stays on top of the iframe

  iframe.parentElement.style.position = "relative"; // Ensure the parent container is positioned
  iframe.parentElement.appendChild(overlay);

  overlay.addEventListener("mousemove", (e) => {
    const rect = iframe.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    // Update custom cursor position inside the overlay
    cursorDot.style.left = `${cursorX + rect.left}px`;
    cursorDot.style.top = `${cursorY + rect.top}px`;

    cursorRing.style.transform = `translate(${cursorX + rect.left - 30}px, ${
      cursorY + rect.top - 30
    }px)`;
    customCursor.style.display = "block"; // Ensure the cursor is visible
  });

  overlay.addEventListener("mouseleave", () => {
    customCursor.style.display = "none"; // Hide cursor when leaving the overlay
  });
});
