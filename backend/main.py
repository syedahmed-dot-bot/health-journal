from fastapi import FastAPI, Form, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from backend import models
from backend import auth
from backend.database import Base, engine, get_db


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://pulsejournal.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/signup")
async def signup(request: Request, db: Session = Depends(get_db)):
    # Parse JSON body from frontend
    data = await request.json()
    username = data.get("username")
    password = data.get("password")

    # Validate input
    if not username or not password:
        raise HTTPException(status_code=400, detail="Username and password required")

    # Check if user already exists
    existing = db.query(models.User).filter(models.User.username == username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Hash and store password
    hashed = auth.hash_password(password)
    user = models.User(username=username, hashed_password=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User created", "username": user.username}

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = auth.create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/entries")
def create_entry(
    text: str = Form(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    entry = models.Entry(text=text, user_id=current_user.id)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return {"message": "Entry saved", "entry": {"id": entry.id, "text": entry.text}}


@app.get("/entries")
def list_entries(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    entries = (
        db.query(models.Entry)
        .filter(models.Entry.user_id == current_user.id)
        .all()
    )
    return {"entries": [{"id": e.id, "text": e.text} for e in entries]}


# Update an entry
@app.put("/entries/{entry_id}")
def update_entry(entry_id: int, text: str = Form(...), db: Session = Depends(get_db)):
    entry = db.query(models.Entry).filter(models.Entry.id == entry_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    entry.text = text
    db.commit()
    db.refresh(entry)
    return {"message": "Entry updated", "entry": {"id": entry.id, "text": entry.text}}


# Delete an entry
@app.delete("/entries/{entry_id}")
def delete_entry(entry_id: int, db: Session = Depends(get_db)):
    entry = db.query(models.Entry).filter(models.Entry.id == entry_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    db.delete(entry)
    db.commit()
    return {"message": f"Entry {entry_id} deleted successfully"}
