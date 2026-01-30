import pandas as pd

df = pd.read_csv("sales_data.csv")
df['date'] = pd.to_datetime(df['date'])


df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day'] = df['date'].dt.day

df = df.sort_values('date')
df.to_csv("processed_sales_data.csv", index=False)

print(" file created successfully!")
print(df.head())
