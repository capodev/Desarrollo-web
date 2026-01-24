// Array con las imágenes disponibles
let images = [
    "assets/1.webp",
    "assets/2.webp",
    "assets/3.webp",
    "assets/4.webp",
    "assets/5.webp",
    "assets/6.webp",
    "assets/7.webp",
    "assets/8.webp",
    "assets/9.webp",
];

// Variables globales
let currentImageIndex = 0;
const modal = document.getElementById("imageModal");
const galleryGrid = document.getElementById("galleryGrid");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const thumbnailsContainer = document.getElementById("thumbnailsContainer");
const currentIndexSpan = document.getElementById("currentIndex");
const totalImagesSpan = document.getElementById("totalImages");
const imageInput = document.getElementById("imageInput");
const addImageBtn = document.getElementById("addImageBtn");
const deleteImageBtn = document.getElementById("deleteImageBtn");

// Inicializar la galería
function initGallery() {
    createGalleryGrid();
    createThumbnails();
    setupEventListeners();
    setupImageControls();
}

// Crear el grid de imágenes
function createGalleryGrid() {
    galleryGrid.innerHTML = "";

    images.forEach((image, index) => {
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";
        galleryItem.innerHTML = `
            <img src="${image}" alt="Imagen ${index + 1}" loading="lazy">
            <div class="gallery-item-overlay">
                <span class="overlay-text">Ver imagen</span>
            </div>
        `;

        // Evento click para abrir el modal
        galleryItem.addEventListener("click", () => {
            openModal(index);
        });

        galleryGrid.appendChild(galleryItem);
    });
}

// Crear las miniaturas
function createThumbnails() {
    thumbnailsContainer.innerHTML = "";

    images.forEach((image, index) => {
        const thumbnail = document.createElement("div");
        thumbnail.className = "thumbnail";
        if (index === 0) thumbnail.classList.add("active");

        const img = document.createElement("img");
        img.src = image;
        img.alt = `Miniatura ${index + 1}`;

        thumbnail.appendChild(img);

        // Click en miniatura para cambiar de imagen
        thumbnail.addEventListener("click", () => {
            currentImageIndex = index;
            updateModalImage();
            updateActiveThumbnail();
        });

        thumbnailsContainer.appendChild(thumbnail);
    });
}

// Abrir el modal
function openModal(index) {
    currentImageIndex = index;
    modal.classList.add("active");
    updateModalImage();
    updateActiveThumbnail();
    document.body.style.overflow = "hidden"; // Evitar scroll
}

// Cerrar el modal
function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto"; // Restaurar scroll
}

// Actualizar la imagen del modal
function updateModalImage() {
    modalImage.src = images[currentImageIndex];
    currentIndexSpan.textContent = currentImageIndex + 1;
    totalImagesSpan.textContent = images.length;
}

// Actualizar miniatura activa
function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll(".thumbnail");
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle("active", index === currentImageIndex);
    });
}

// Ir a la imagen anterior
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateModalImage();
    updateActiveThumbnail();
}

// Ir a la siguiente imagen
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateModalImage();
    updateActiveThumbnail();
}

// Configurar listeners de eventos
function setupEventListeners() {
    // Botones del modal
    closeBtn.addEventListener("click", closeModal);
    prevBtn.addEventListener("click", prevImage);
    nextBtn.addEventListener("click", nextImage);

    // Cerrar modal al hacer click fuera de la imagen
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Controles del teclado
    document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("active")) return;

        switch (e.key) {
            case "ArrowLeft":
                prevImage();
                break;
            case "ArrowRight":
                nextImage();
                break;
            case "Escape":
                closeModal();
                break;
        }
    });

    // Controles táctiles para dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener(
        "touchstart",
        (e) => {
            touchStartX = e.changedTouches[0].screenX;
        },
        false
    );

    modal.addEventListener(
        "touchend",
        (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        },
        false
    );

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Deslizar hacia la izquierda = siguiente imagen
                nextImage();
            } else {
                // Deslizar hacia la derecha = imagen anterior
                prevImage();
            }
        }
    }
}

// Configurar controles para agregar y eliminar imágenes
function setupImageControls() {
    // Botón agregar imagen
    addImageBtn.addEventListener("click", () => {
        imageInput.click();
    });

    // Input de archivo
    imageInput.addEventListener("change", handleImageUpload);

    // Botón eliminar imagen
    deleteImageBtn.addEventListener("click", deleteCurrentImage);
}

// Manejar la subida de imagen
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Crear URL temporal para la imagen
    const reader = new FileReader();
    reader.onload = (event) => {
        const newImageUrl = event.target.result;
        addImageToGallery(newImageUrl);

        // Limpiar el input
        imageInput.value = "";
    };
    reader.readAsDataURL(file);
}

// Agregar nueva imagen a la galería
function addImageToGallery(imageUrl) {
    images.push(imageUrl);
    createGalleryGrid();
    createThumbnails();

    // Mostrar mensaje de éxito
    showNotification("✓ Imagen agregada correctamente");
}

// Eliminar la imagen actual
function deleteCurrentImage() {
    if (images.length === 1) {
        showNotification("⚠ No puedes eliminar la última imagen", "warning");
        return;
    }

    // Confirmar eliminación
    if (confirm("¿Estás seguro de que deseas eliminar esta imagen?")) {
        images.splice(currentImageIndex, 1);

        // Ajustar índice si es necesario
        if (currentImageIndex >= images.length) {
            currentImageIndex = images.length - 1;
        }

        createGalleryGrid();
        createThumbnails();
        updateModalImage();
        updateActiveThumbnail();

        showNotification("🗑 Imagen eliminada correctamente");
    }
}

// Mostrar notificación
function showNotification(message, type = "success") {
    // Crear elemento de notificación
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === "success" ? "#4caf50" : "#ff9800"};
        color: white;
        padding: 15px 25px;
        border-radius: 6px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = "slideOutRight 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initGallery);

// Información de debug (opcional)
console.log("Galería de imágenes interactiva cargada");
console.log(`Total de imágenes: ${images.length}`);
