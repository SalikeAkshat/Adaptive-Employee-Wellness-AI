
# import pandas as pd
# import numpy as np
# import os

# np.random.seed(42)

# # --- Load datasets ---
# burnout1 = pd.read_csv("data/train.csv")   # Burnout dataset
# sleep_df = pd.read_csv("data/Sleep_health_and_lifestyle_dataset.csv")  # Sleep dataset (CSV)
# steps_df = pd.read_csv("data/steps_tracker_dataset.csv")               # Steps dataset (CSV)

# # --- Standardize column names and create employee_id ---
# # Burnout dataset
# burnout1 = burnout1.rename(columns={"Employee ID": "employee_id"})
# burnout1["burnout_label"] = burnout1["Burn Rate"].apply(lambda x: 1 if x > 0.5 else 0)
# burnout_data = burnout1[["employee_id", "burnout_label"]]

# # Sleep dataset
# sleep_data = sleep_df.rename(columns={"Person ID": "employee_id", "Sleep Duration": "sleep_hours"})
# sleep_data = sleep_data[["employee_id", "sleep_hours"]]

# # Steps dataset
# steps_data = steps_df.copy()
# if "User" in steps_data.columns:
#     steps_data = steps_data.rename(columns={"User": "employee_id"})
# else:
#     # If no user column exists, assume all rows belong to one user
#     steps_data["employee_id"] = "1"  # assign as string
# steps_data = steps_data[["employee_id", "steps"]]

# # --- Ensure employee_id is string in all datasets ---
# burnout_data["employee_id"] = burnout_data["employee_id"].astype(str)
# sleep_data["employee_id"] = sleep_data["employee_id"].astype(str)
# steps_data["employee_id"] = steps_data["employee_id"].astype(str)

# # --- Merge all datasets ---
# merged = pd.merge(burnout_data, sleep_data, on="employee_id", how="outer")
# merged = pd.merge(merged, steps_data, on="employee_id", how="outer")

# # --- Add synthetic features ---
# n = len(merged)
# merged["heart_rate"] = np.random.randint(65, 95, n)
# merged["meetings"] = np.random.poisson(3, n)
# merged["screen_time"] = np.clip(np.random.normal(7, 2, n), 3, 12).round(1)
# merged["focus_time"] = np.clip(np.random.normal(4, 1.5, n), 1, 8).round(1)
# merged["emails_sent"] = np.random.randint(20, 150, n)

# # --- Handle missing values ---
# merged["burnout_label"] = merged["burnout_label"].fillna(0).astype(int)
# merged = merged.dropna(subset=["sleep_hours", "steps"])

# # --- Save final dataset ---
# os.makedirs("data", exist_ok=True)
# merged.to_csv("data/training_data.csv", index=False)

# print("✅ Final training_data.csv created with", len(merged), "rows")
# print("Columns:", merged.columns.tolist())


import pandas as pd
import numpy as np
import os

np.random.seed(42)

# --- Load datasets ---
burnout1 = pd.read_csv("train.csv")   # Burnout dataset
sleep_df = pd.read_csv("Sleep_health_and_lifestyle_dataset.csv")  # Sleep dataset (CSV)
steps_df = pd.read_csv("steps_tracker_dataset.csv")               # Steps dataset (CSV)

# --- Standardize column names and create employee_id ---
# Burnout dataset
burnout1 = burnout1.rename(columns={"Employee ID": "employee_id"})
burnout1["burnout_label"] = burnout1["Burn Rate"].apply(lambda x: 1 if x > 0.5 else 0)
burnout_data = burnout1[["employee_id", "burnout_label"]]

# Sleep dataset
sleep_data = sleep_df.rename(columns={"Person ID": "employee_id", "Sleep Duration": "sleep_hours"})
sleep_data = sleep_data[["employee_id", "sleep_hours"]]

# Steps dataset
steps_data = steps_df.copy()
if "User" in steps_data.columns:
    steps_data = steps_data.rename(columns={"User": "employee_id"})
else:
    # If no user column exists, assume all rows belong to one user
    steps_data["employee_id"] = "1"  # assign as string
steps_data = steps_data[["employee_id", "steps"]]

# --- Ensure employee_id is string in all datasets ---
burnout_data["employee_id"] = burnout_data["employee_id"].astype(str)
sleep_data["employee_id"] = sleep_data["employee_id"].astype(str)
steps_data["employee_id"] = steps_data["employee_id"].astype(str)

# --- Merge all datasets ---
merged = pd.merge(burnout_data, sleep_data, on="employee_id", how="outer")
merged = pd.merge(merged, steps_data, on="employee_id", how="outer")

# --- Add synthetic features ---
n = len(merged)
merged["heart_rate"] = np.random.randint(65, 95, n)
merged["meetings"] = np.random.poisson(3, n)
merged["screen_time"] = np.clip(np.random.normal(7, 2, n), 3, 12).round(1)
merged["focus_time"] = np.clip(np.random.normal(4, 1.5, n), 1, 8).round(1)
merged["emails_sent"] = np.random.randint(20, 150, n)

# --- Handle missing values ---
merged["burnout_label"] = merged["burnout_label"].fillna(0).astype(int)
merged = merged.dropna(subset=["sleep_hours", "steps"])

# --- Ensure class balance ---
if merged["burnout_label"].nunique() == 1:
    print("⚠️ Only one class detected. Adding synthetic burnout cases...")
    merged.loc[merged.sample(frac=0.2, random_state=42).index, "burnout_label"] = 1

# --- Save final dataset ---
os.makedirs("data", exist_ok=True)
merged.to_csv("data/training_data.csv", index=False)

print("✅ Final training_data.csv created with", len(merged), "rows")
print("Columns:", merged.columns.tolist())
print("Class distribution:\n", merged["burnout_label"].value_counts())
