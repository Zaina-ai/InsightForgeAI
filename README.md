# InsightForge AI

Turn raw customer feedback into actionable decisions.

InsightForge AI is a full-stack customer intelligence dashboard that analyzes CSV-based feedback data and transforms it into meaningful insights using AI-driven processing. Users can upload customer responses and instantly receive sentiment analysis, theme detection, and recommendations.

## Features

- Upload customer feedback through CSV
- Automated sentiment analysis
- Theme and issue identification
- Recommendation generation
- Interactive analytics dashboard
- Fast frontend + backend communication

## Demo Output

The platform generates:

- Total feedback count
- Positive sentiment %
- Negative sentiment %
- Theme distribution
- Business recommendations

Example themes:
- Login Problems
- Payment Issues
- User Experience
- Performance Concerns

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- CSS

### Backend
- Python
- FastAPI
- Uvicorn

### Data Processing
- Pandas
- NLP / Text Processing
- CSV Parsing

# Workflow

### User Journey

1. Upload `feedback.csv`
2. Frontend sends file to backend
3. Backend validates and processes data
4. Sentiment analysis is performed
5. Themes are extracted
6. Recommendations are generated
7. Dashboard displays results

### System Flow

```text
CSV Upload
   ↓
Frontend (Next.js)
   ↓
Backend API (FastAPI)
   ↓
Data Processing
   ↓
Sentiment + Theme Analysis
   ↓
Dashboard Results
```

## Project Structure

```text
InsightForgeAI
│
├── backend
│   ├── data
│   │   └── feedback.csv
│   ├── requirements.txt
│   └── main.py
│
├── frontend
│   ├── app
│   ├── public
│   ├── package.json
│   └── README.md
│
└── README.md
```

# Local Setup

## Clone Repository

```bash
git clone https://github.com/Zaina-ai/InsightForgeAI.git
cd InsightForgeAI
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs at:

```text
http://localhost:3000
```

## Backend Setup

Open another terminal:

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

Runs at:

```text
http://127.0.0.1:8000
```

---

## Test the Application

Use:

```text
backend/data/feedback.csv
```

Steps:

1. Launch frontend
2. Launch backend
3. Open localhost
4. Upload CSV
5. Click Analyze
6. View dashboard insights

# Future Scope

Potential future improvements:

- Real-time feedback ingestion
- AI-generated strategic recommendations
- User authentication
- Dashboard export (PDF / Excel)
- Multi-language analysis
- Trend forecasting
- Cloud deployment
- API integrations
- Historical comparison analytics
- Enterprise-scale datasets

# Challenges Faced

- CSV formatting inconsistencies
- Frontend–backend communication
- Cross-platform file compatibility
- Data preprocessing
- Local environment setup

# Improvements

Future optimization goals:

- Faster processing
- Improved UI responsiveness
- Better visualization
- Expanded analytics engine
- Enhanced recommendation accuracy

# Contributors

Developed collaboratively for a hackathon project.

Contributors:
- Ashba Khalid, Numa Nafisa, Aisha Siddiqua, Rawan Sultan, Zaina Niazi

## License

This project is intended for educational and hackathon use.

MIT License
