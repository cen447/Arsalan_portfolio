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

// Select the audio element and control button            audio button
// Select the audio element and control button
const audio = document.getElementById("background-audio");
const audioControl = document.getElementById("audio-control");
const audioIcon = document.getElementById("audio-icon");
const videos = document.querySelectorAll("iframe"); // Select all video elements

// Set up audio and default state
audio.volume = 0.5; // Moderate volume
let isPlaying = false; // Assume audio is not playing by default

// Function to enable audio on user interaction
function enableAudio() {
  if (!isPlaying) {
    audio
      .play()
      .then(() => {
        audioIcon.textContent = "❚❚"; // Pause icon
        isPlaying = true;
      })
      .catch((error) => {
        console.error("Audio playback failed:", error);
      });
  }
  document.removeEventListener("click", enableAudio);
  document.removeEventListener("scroll", enableAudio);
}

// Add interaction listeners to start audio
document.addEventListener("click", enableAudio);
document.addEventListener("scroll", enableAudio);

// Fade the button after a delay
let fadeTimeout;
function startFade() {
  fadeTimeout = setTimeout(() => {
    audioControl.style.opacity = "0.15"; // Fade-out to almost invisible
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

// Pause background audio when videos play
videos.forEach((video) => {
  video.addEventListener("play", () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
    }
  });
});

// Resume background audio when videos stop
videos.forEach((video) => {
  video.addEventListener("pause", () => {
    if (!isPlaying) {
      audio.play().catch(console.error);
      isPlaying = true;
    }
  });
});

// Start fade-out after initial load
startFade();
