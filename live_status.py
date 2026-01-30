import os
import pandas as pd
from datetime import datetime

live_file = "live_sales_data.csv"

if not os.path.exists(live_file):
    print("STATUS: STOPPED ")
    print("Live data file not found")
else:
    df = pd.read_csv(live_file)

    if df.empty:
        print("STATUS: STOPPED ")
        print("No data ingested yet")
    else:
        last_row = df.iloc[-1]
        last_date = last_row['date']

        last_modified_time = datetime.fromtimestamp(
            os.path.getmtime(live_file)
        )

        current_time = datetime.now()
        diff_seconds = (current_time - last_modified_time).seconds

        if diff_seconds <= 15:
            status = "RUNNING "
        else:
            status = "STOPPED "

        print(f"STATUS: {status}")
        print(f"last data date       : {last_date}")
        print(f"last update time     : {last_modified_time}")
        print(f"seconds since update : {diff_seconds}")
