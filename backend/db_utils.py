# db_utils.py
import psycopg2
from psycopg2.extras import RealDictCursor

# def create_predictions_table():
#     conn = get_connection()
#     cur = conn.cursor()
#     cur.execute("""
#         CREATE TABLE IF NOT EXISTS predictions (
#             id SERIAL PRIMARY KEY,
#             employee_id VARCHAR(50),
#             burnout_label INT,
#             sleep_hours FLOAT,
#             steps INT,
#             heart_rate INT,
#             meetings INT,
#             screen_time FLOAT,
#             focus_time FLOAT,
#             emails_sent INT,
#             predicted_label INT,
#             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#         );
#     """)
#     conn.commit()
#     cur.close()
#     conn.close()




def get_connection():
    return psycopg2.connect(
        dbname="wellness_ai",
        user="postgres",          # change if you set a different username
        password="1234", # replace with your PostgreSQL password
        host="localhost",
        port="5432"
    )

def log_prediction(employee_id, burnout_label, sleep_hours, steps, heart_rate,
                   meetings, screen_time, focus_time, emails_sent, predicted_label):
    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO predictions 
            (employee_id, burnout_label, sleep_hours, steps, heart_rate,
             meetings, screen_time, focus_time, emails_sent, predicted_label)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);
        """, (employee_id, burnout_label, sleep_hours, steps, heart_rate,
              meetings, screen_time, focus_time, emails_sent, predicted_label))

        conn.commit()
        cur.close()
        conn.close()
        print("✅ Prediction logged successfully!")

    except Exception as e:
        print("❌ Database error:", e)
