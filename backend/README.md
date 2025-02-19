# How to Run the FastAPI Application

## Prerequisites

1. Ensure you have Python and pip installed. You can download Python from [python3.org](https://www.python.org/).

## Installation

1. Install `uvicorn` and `fastapi` using pip:

    ```sh
    pip install uvicorn fastapi
    ```

## Running the Application

1. Navigate to the directory containing `main.py`:

    ```sh
    cd backend
    ```

2. Run the FastAPI application using `uvicorn`:

    ```sh
    uvicorn main:app --host 0.0.0.0 --port 8000
    ```

3. Open your browser and go to `http://127.0.0.1:8000/health` to check the health status.
