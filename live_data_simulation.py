import pandas as pd
import time
from datetime import datetime

source_df = pd.read_csv("sales_data.csv")
source_df['date'] = pd.to_datetime(source_df['date'])


live_file = "live_sales_data.csv"


pd.DataFrame(columns=source_df.columns).to_csv(live_file, index=False)

print("Live POS simulation started...")

for _, row in source_df.iterrows():
   
    row.to_frame().T.to_csv(live_file, mode='a', header=False, index=False)

    print(f"New Entry {datetime.now()} → Date: {row['date'].date()}, Sales: {row['sales']}")

    time.sleep(10)
