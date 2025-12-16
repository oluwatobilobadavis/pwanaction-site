// ======================= MOBILE MENU TOGGLE =======================
const menuToggle = document.getElementById("menuToggle")
const nav = document.getElementById("nav")

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active")
    const icon = menuToggle.querySelector("i")
    if (nav.classList.contains("active")) {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    } else {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })
}

// Mobile dropdown toggle
document.querySelectorAll(".dropdown > .nav-link").forEach((dropdownLink) => {
  dropdownLink.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault()
      this.parentElement.classList.toggle("active")
    }
  })
})

// ======================= SMOOTH SCROLLING =======================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const headerOffset = 80
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (nav) {
          nav.classList.remove("active")
          const icon = menuToggle?.querySelector("i")
          if (icon) {
            icon.classList.remove("fa-times")
            icon.classList.add("fa-bars")
          }
        }
      }
    }
  })
})

// ======================= HEADER SCROLL EFFECT =======================
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (header) {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }
})

// ======================= SLIDESHOW =======================
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot")
const prevBtn = document.querySelector(".slide-btn.prev")
const nextBtn = document.querySelector(".slide-btn.next")
let currentSlide = 0
let slideInterval

function showSlide(index) {
  // Remove active class from all slides and dots
  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  // Handle wrap around
  if (index >= slides.length) currentSlide = 0
  if (index < 0) currentSlide = slides.length - 1

  // Add active class to current slide and dot
  if (slides[currentSlide]) slides[currentSlide].classList.add("active")
  if (dots[currentSlide]) dots[currentSlide].classList.add("active")
}

function nextSlide() {
  currentSlide++
  showSlide(currentSlide)
}

function prevSlide() {
  currentSlide--
  showSlide(currentSlide)
}

function startSlideshow() {
  slideInterval = setInterval(nextSlide, 5000)
}

function resetSlideshow() {
  clearInterval(slideInterval)
  startSlideshow()
}

// Event listeners for slideshow
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    prevSlide()
    resetSlideshow()
  })
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide()
    resetSlideshow()
  })
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index
    showSlide(currentSlide)
    resetSlideshow()
  })
})

// Start automatic slideshow
if (slides.length > 0) {
  startSlideshow()
}

// ======================= SCROLL ANIMATIONS =======================
function animateOnScroll() {
  const elements = document.querySelectorAll("[data-animate]")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (elementTop < windowHeight - 100) {
      const delay = element.getAttribute("data-delay") || 0
      setTimeout(() => {
        element.classList.add("animated")
      }, delay)
    }
  })
}

window.addEventListener("scroll", animateOnScroll)
window.addEventListener("load", animateOnScroll)

// ======================= COUNTER ANIMATION =======================
function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"))
  const duration = 2000
  const increment = target / (duration / 16)
  let current = 0

  const updateCounter = () => {
    current += increment
    if (current < target) {
      element.textContent = Math.ceil(current).toLocaleString()
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target.toLocaleString()
    }
  }

  updateCounter()
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".stats")
let countersAnimated = false

if (statsSection) {
  const observerOptions = {
    threshold: 0.5,
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true
        document.querySelectorAll(".counter").forEach((counter) => {
          animateCounter(counter)
        })
      }
    })
  }, observerOptions)

  statsObserver.observe(statsSection)
}

// ======================= WHATSAPP CONTACT FORM =======================
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = contactForm.querySelector('input[name="name"]').value
    const email = contactForm.querySelector('input[name="email"]').value
    const phone = contactForm.querySelector('input[name="phone"]').value
    const estate = contactForm.querySelector('select[name="estate"]').value
    const message = contactForm.querySelector('textarea[name="message"]').value

    // WhatsApp number
    const whatsappNumber = "2349155392517"

    // Create message
    let whatsappMessage = `Hello Pwan Action!%0A%0A`
    whatsappMessage += `*Name:* ${name}%0A`
    whatsappMessage += `*Email:* ${email}%0A`
    if (phone) whatsappMessage += `*Phone:* ${phone}%0A`
    if (estate) whatsappMessage += `*Interested Estate:* ${estate}%0A`
    if (message) whatsappMessage += `%0A*Message:*%0A${message}`

    // Open WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    window.open(whatsappURL, "_blank")

    // Reset form
    contactForm.reset()
  })
}

// ======================= ESTATE SUBSCRIPTION DOWNLOAD =======================
// This handles the download subscription form buttons on estate pages
document.querySelectorAll(".btn-download").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Check if href is set to a file
    const href = this.getAttribute("href")
    if (href && href !== "#") {
      // Allow default behavior for actual file downloads
      return
    }
    e.preventDefault()
    alert("Please add the subscription form PDF file to the downloads folder and update the href attribute.")
  })
})