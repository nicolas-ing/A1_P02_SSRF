import os

from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from fastapi import FastAPI

from fastapi import FastAPI
from pydantic import BaseModel

class Image(BaseModel):
    name: str

app = FastAPI()

#configura cors
    

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

# endpoint GET /images que devuelve en formato JSON una lista con los nombres de los archivos
# de la carpeta 'img' ubicadas en el directorio /img del servidor.
@app.get("/images")
def get_images():
    images_dir = Path("img")
    archivos = [archivo.name for archivo in images_dir.iterdir() if archivo.is_file()]
    return JSONResponse(content={"images": archivos})

@app.post("/image")
async def request_image(image_name: Image):
    image_path = os.path.join("img", image_name.name)
    if os.path.isfile(image_path):
        return FileResponse(image_path)
    else:
        return JSONResponse(content={"error": "Image not found"}, status_code=404)