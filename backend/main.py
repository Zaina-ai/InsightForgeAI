
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
import shutil
import pandas as pd
import os
from textblob import TextBlob

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "InsightForge AI Backend Running"}


@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    filepath = os.path.join("data", file.filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"message": f"{file.filename} uploaded successfully"}


def detect_theme(text):
    text = str(text).lower()

    if "login" in text or "password" in text or "sign in" in text:
        return "Login Problems"
    elif "delivery" in text or "late" in text or "shipping" in text:
        return "Delivery Delays"
    elif "payment" in text or "checkout" in text or "card" in text:
        return "Payment Issues"
    elif "dark mode" in text or "theme" in text:
        return "Dark Mode Requests"
    elif "slow" in text or "crash" in text or "freeze" in text or "loading" in text:
        return "Performance Problems"
    elif "notification" in text or "alert" in text or "email" in text:
        return "Notification Issues"
    elif "feature" in text or "add" in text or "support" in text or "would love" in text:
        return "Feature Requests"
    elif "great" in text or "amazing" in text or "excellent" in text or "love" in text:
        return "Positive Feedback"
    else:
        return "General Feedback"


@app.get("/analyze")
def analyze():
    filepath = os.path.join("data", "feedback.csv")

    if not os.path.exists(filepath):
        return {
            "error": "feedback.csv not found",
            "check": os.listdir("data")
        }

    df = pd.read_csv(filepath)

    sentiments = []
    themes = []

    for text in df["feedback"]:
        score = TextBlob(str(text)).sentiment.polarity

        if score > 0:
            sentiment = "Positive"
        elif score < 0:
            sentiment = "Negative"
        else:
            sentiment = "Neutral"

        sentiments.append(sentiment)
        themes.append(detect_theme(text))

    df["sentiment"] = sentiments
    df["theme"] = themes

    total = len(df)

    positive = sentiments.count("Positive")
    negative = sentiments.count("Negative")
    neutral = sentiments.count("Neutral")

    theme_counts = df["theme"].value_counts().reset_index()
    theme_counts.columns = ["theme", "count"]

    recommendations = []

    for _, row in theme_counts.iterrows():
        theme = row["theme"]
        count = int(row["count"])

        if theme == "Login Problems":
            action = "Fix login authentication and password reset issues."
            impact = "High"
        elif theme == "Payment Issues":
            action = "Improve checkout and payment processing reliability."
            impact = "High"
        elif theme == "Delivery Delays":
            action = "Optimize delivery tracking and shipping operations."
            impact = "Medium"
        elif theme == "Performance Problems":
            action = "Improve app speed, loading time, and crash stability."
            impact = "High"
        elif theme == "Notification Issues":
            action = "Fix notification delivery and alert settings."
            impact = "Medium"
        elif theme == "Dark Mode Requests":
            action = "Add dark mode and theme customization."
            impact = "Medium"
        elif theme == "Feature Requests":
            action = "Review most requested features for product roadmap."
            impact = "Medium"
        elif theme == "Positive Feedback":
            action = "Highlight positive feedback in marketing and retention strategy."
            impact = "Low"
        else:
            action = "Review general feedback manually."
            impact = "Low"

        recommendations.append({
            "theme": theme,
            "count": count,
            "impact": impact,
            "recommendation": action
        })

    return {
        "total_feedback": total,
        "sentiment_distribution": {
            "positive": round((positive / total) * 100, 1),
            "negative": round((negative / total) * 100, 1),
            "neutral": round((neutral / total) * 100, 1)
        },
        "theme_distribution": theme_counts.to_dict(orient="records"),
        "recommendations": recommendations,
        "sample_results": df.head(10).to_dict(orient="records")
    }
