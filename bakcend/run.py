import uvicorn
import subprocess
import threading
import time

def run_main_server():
    print("Starting main FastAPI server...")
    subprocess.run(["python", "main.py"])

def run_mcp_server():
    print("Starting MCP recommendation server...")
    subprocess.run(["python", "mcp_server.py"])

def seed_database():
    print("Seeding database...")
    subprocess.run(["python", "seed_data.py"])

if __name__ == "__main__":
    # First seed the database
    seed_database()
    
    # Start both servers in separate threads
    main_thread = threading.Thread(target=run_main_server)
    mcp_thread = threading.Thread(target=run_mcp_server)
    
    main_thread.start()
    time.sleep(2)  # Give the main server a head start
    mcp_thread.start()
    
    print("Both servers are running!")
    print("Main API server: http://localhost:8000")
    print("MCP Recommendation server: http://localhost:8001")
    print("API Documentation: http://localhost:8000/docs")
    
    # Wait for both threads to complete
    main_thread.join()
    mcp_thread.join()