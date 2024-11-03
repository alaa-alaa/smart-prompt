import tkinter as tk
from tkinter import messagebox


def calculate_npv():
    try:
        initial_investment = float(initial_investment_entry.get())
        cash_flow = float(cash_flow_entry.get())
        discount_rate = (
            float(discount_rate_entry.get()) / 100
        )  # Convert percentage to decimal
        years = int(years_entry.get())

        npv = 0
        for t in range(1, years + 1):
            npv += cash_flow / (1 + discount_rate) ** t
        npv -= initial_investment

        result_label.config(text=f"NPV: {round(npv, 2)} dinars")
    except ValueError:
        messagebox.showerror("Input Error", "Please enter valid numerical values.")


# GUI Setup
root = tk.Tk()
root.title("Medical Equipment Project NPV Calculator")

# Labels and Entry fields
tk.Label(root, text="Initial Investment (Dinars):").grid(row=0, column=0)
initial_investment_entry = tk.Entry(root)
initial_investment_entry.grid(row=0, column=1)

tk.Label(root, text="Annual Cash Flow (Dinars):").grid(row=1, column=0)
cash_flow_entry = tk.Entry(root)
cash_flow_entry.grid(row=1, column=1)

tk.Label(root, text="Discount Rate (%):").grid(row=2, column=0)
discount_rate_entry = tk.Entry(root)
discount_rate_entry.grid(row=2, column=1)

tk.Label(root, text="Number of Years:").grid(row=3, column=0)
years_entry = tk.Entry(root)
years_entry.grid(row=3, column=1)

# Calculate Button
calculate_button = tk.Button(root, text="Calculate NPV", command=calculate_npv)
calculate_button.grid(row=4, column=0, columnspan=2)

# Result Label
result_label = tk.Label(root, text="NPV: ")
result_label.grid(row=5, column=0, columnspan=2)

# Start the GUI
root.mainloop()
