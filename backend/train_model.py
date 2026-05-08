#1
# import pandas as pd
# from sklearn.ensemble import GradientBoostingClassifier
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import accuracy_score, classification_report
# import joblib
# import os

# # Load dataset
# df = pd.read_csv("data/training_data.csv")

# # Define features and label
# features = ["heart_rate", "sleep_hours", "steps", "meetings", "screen_time", "focus_time", "emails_sent"]
# X = df[features]
# y = df["burnout_label"]

# # Train-test split
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42, stratify=y
# )

# # Train model
# model = GradientBoostingClassifier(n_estimators=200, learning_rate=0.05, random_state=42)
# model.fit(X_train, y_train)

# # Evaluate
# y_pred = model.predict(X_test)
# print("✅ Accuracy:", accuracy_score(y_test, y_pred))
# print("\nClassification Report:\n", classification_report(y_test, y_pred))

# # Save model
# os.makedirs("models", exist_ok=True)
# joblib.dump(model, "models/burnout_model.pkl")
# print("💾 Model saved at models/burnout_model.pkl")

import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

# ✅ Import database logger
from db_utils import log_prediction

# --- Load dataset ---
df = pd.read_csv("training_data.csv")

# --- Define features and target ---
features = ["heart_rate", "sleep_hours", "steps", "meetings", "screen_time", "focus_time", "emails_sent"]
X = df[features]
y = df["burnout_label"]

# --- Train-test split ---
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# --- Train model ---
model = GradientBoostingClassifier(
    n_estimators=200,
    learning_rate=0.05,
    random_state=42
)
model.fit(X_train, y_train)

# --- Evaluate model ---
y_pred = model.predict(X_test)
print("✅ Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# --- Save trained model ---
os.makedirs("models", exist_ok=True)
joblib.dump(model, "models/burnout_model.pkl")
print("💾 Model saved at models/burnout_model.pkl")

# --- Example: Log first 5 predictions into database ---
print("\n📌 Logging first 5 predictions into database...")
sample = X_test.head(5).copy()
true_labels = y_test.head(5).values
pred_labels = model.predict(sample)

for i in range(len(sample)):
    row = sample.iloc[i]
    log_prediction(
        employee_id=str(i+1),  # just using index as employee_id
        burnout_label=int(true_labels[i]),
        sleep_hours=float(row["sleep_hours"]),
        steps=int(row["steps"]),
        heart_rate=int(row["heart_rate"]),
        meetings=int(row["meetings"]),
        screen_time=float(row["screen_time"]),
        focus_time=float(row["focus_time"]),
        emails_sent=int(row["emails_sent"]),
        predicted_label=int(pred_labels[i])
    )
