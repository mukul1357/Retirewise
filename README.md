# Retirewise
Aim is to recommend personalized schemes for retirement planning using Generative AI


```markdown
# How to Run the Backend

This Flask backend serves as part of a project. Follow these steps to set it up and run:

## Prerequisites

- Python installed on your machine.
- A virtual environment to manage dependencies.

## Installation

1. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
   ```

2. Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

## OpenAI API Key Setup

1. Obtain an API key from OpenAI.
2. Create a `.env` file in the project root.
3. Add your OpenAI API key to the `.env` file:

   ```env
   OPENAI_API_KEY=<your-api-key>
   ```

## Running the Flask App

Run the following command to start the Flask app:

```bash
python app.py
```

The app will be accessible at `http://localhost:5000`.

Make sure to replace `<your-api-key>` with your actual OpenAI API key.

For any questions or issues, feel free to reach out.

