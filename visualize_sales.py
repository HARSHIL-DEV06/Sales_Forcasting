import pandas as pd
import matplotlib.pyplot as plt

hist_df = pd.read_csv("processed_sales_data.csv")
hist_df['date'] = pd.to_datetime(hist_df['date'])

future_df = pd.read_csv("future_3_month_forecast.csv")
future_df['date'] = pd.to_datetime(future_df['date'])

plt.figure()
plt.plot(hist_df['date'], hist_df['sales'], label='Historical Sales')
plt.plot(future_df['date'], future_df['predicted_sales'], label='Forecasted Sales')

plt.xlabel("Date")
plt.ylabel("Sales")
plt.title("historical vs 3 month sales forecast")
plt.legend()
plt.tight_layout()
plt.show()
