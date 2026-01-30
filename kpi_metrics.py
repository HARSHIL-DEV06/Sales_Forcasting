import pandas as pd

hist_df = pd.read_csv("processed_sales_data.csv")
future_df = pd.read_csv("future_3_month_forecast.csv")

total_historical_sales = hist_df['sales'].sum()
avg_daily_sales = hist_df['sales'].mean()

future_avg_sales = future_df['predicted_sales'].mean()

growth_percentage = ((future_avg_sales - avg_daily_sales) / avg_daily_sales) * 100


print(f"total historical sales : {total_historical_sales:.2f}")
print(f"average daily sales    : {avg_daily_sales:.2f}")
print(f"Expected growth    : {growth_percentage:.2f}")
