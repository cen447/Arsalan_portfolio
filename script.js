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
// scroll arsalan brooding animate
document.addEventListener("scroll", function () {
  const section = document.querySelector("#arsalan-brooding");
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    section.classList.add("visible");
  } else {
    section.classList.remove("visible");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll(".circle");

  // Assign bright red color and initialize position
  circles.forEach((circle) => {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = "rgba(255, 0, 0, 1)"; // Bright red
  });

  // Update mouse coordinates on movement
  window.addEventListener("mousemove", (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  // Animate circles
  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
      // Position each circle
      circle.style.left = x - 6 + "px"; // Adjust for smaller size
      circle.style.top = y - 6 + "px"; // Adjust for smaller size

      // Scale effect for trailing circles
      circle.style.scale = (circles.length - index) / circles.length;

      // Store current position
      circle.x = x;
      circle.y = y;

      // Move towards the next circle position
      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });

    // Loop the animation
    requestAnimationFrame(animateCircles);
  }

  // Trigger pulsating effect on click
  window.addEventListener("click", () => {
    circles.forEach((circle) => {
      circle.classList.add("pulsating");

      // Remove the pulsating effect after a delay
      setTimeout(() => {
        circle.classList.remove("pulsating");
      }, 500);
    });
  });

  // Hide cursor when hovering over YouTube videos (not on the landing page)
  const youtubeFrames = document.querySelectorAll("iframe");

  youtubeFrames.forEach((iframe) => {
    iframe.addEventListener("mouseenter", () => {
      circles.forEach((circle) => {
        circle.style.opacity = "0"; // Make circles invisible
      });
    });

    iframe.addEventListener("mouseleave", () => {
      circles.forEach((circle) => {
        circle.style.opacity = "1"; // Restore visibility
      });
    });
  });

  // Start animation
  animateCircles();
});
