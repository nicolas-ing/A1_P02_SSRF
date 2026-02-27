function getImages() {
    fetch("http://localhost:8000/images")
        .then(response => response.json())
        .then(data => {
            console.log("carteles obtenidos del backend:", data);
            // mostar las iamgenes en el div con id "images"
            const imagesDiv = document.getElementById("images");
            imagesDiv.innerHTML = "";
            data.images.forEach(image => {
                const imgElement = document.createElement("div");
                imgElement.className = "card shadow-sm mb-3 border-0";
                imgElement.style.width = "500px";
                imgElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${image}</h5>
                    <p class="card-text">${image}</p>
                </div>
            `;
            //Agregar click para solicitar la imagen
            imgElement.onclick = () => solicitar_imagen(image);
            imagesDiv.appendChild(imgElement);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
    })
}

function solicitar_imagen(image_name) {
    fetch(`http://localhost:8000/image`, {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: image_name })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        response.blob().then(myBlob => {
            const objectURL = URL.createObjectURL(myBlob);
            console.log('objectURL:', objectURL);
            // Mostrar la imagen en el div con id="cartel"
            const cartelDiv = document.getElementById('cartel');
            cartelDiv.innerHTML = `<h3>${image_name}</h3><img src="${objectURL}" alt="${image_name}" class="img-fluid"/>`;
        });
    })
    .catch(error => {
        console.error('Error al solicitar el cartel:', error);
    });
}