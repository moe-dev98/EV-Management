# How to Run the FastAPI Application

This is a FastAPI application using PostgreSQL to create APIs related to an entity called station (Entity for input parameters).

## Prerequisites

1. Ensure you have Python and pip installed. You can download Python from [python3.org](https://www.python.org/).

## Running the Application

1. Navigate to the directory containing `main.py`:

    ```sh
    cd backend
    ```

2. Install the needed requirements

    ```sh
    pip install -r requirements.txt
    ```

3. Give execution permission to the script:

    ```sh
    chmod +x start.sh
    ```

4. Run the FastAPI application using the provided script:

    ```sh
    ./start.sh
    ```

5. Run tests:

    ```sh
    pytest test_main.py
    ```

6. Open your browser and go to `http://127.0.0.1:8000/health` to check the health status.

## Generating Data

To generate data for the application, you can use the provided script:

```sh
./generate_data.sh
```

This script will populate the database with initial data required for the application.