import pandas as pd
from xgboost import XGBRegressor


hist_df = pd.read_csv("processed_sales_data.csv")
hist_df['date'] = pd.to_datetime(hist_df['date'])

try:
    live_df = pd.read_csv("live_sales_data.csv")
    live_df['date'] = pd.to_datetime(live_df['date'])

    
    live_df['year'] = live_df['date'].dt.year
    live_df['month'] = live_df['date'].dt.month
    live_df['day'] = live_df['date'].dt.day

    
    df = pd.concat([hist_df, live_df], ignore_index=True)

except FileNotFoundError:
    df = hist_df


X = df[['year', 'month', 'day']]
y = df['sales']


model = XGBRegressor(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=5,
    random_state=42
)
model.fit(X, y)


last_date = df['date'].max()
future_dates = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=90)

future_df = pd.DataFrame({'date': future_dates})
future_df['year'] = future_df['date'].dt.year
future_df['month'] = future_df['date'].dt.month
future_df['day'] = future_df['date'].dt.day


future_df['predicted_sales'] = model.predict(
    future_df[['year', 'month', 'day']]
)

future_df.to_csv("future_3_month_forecast.csv", index=False)

print("3 month sales forecast generated :")
print(future_df.head())
