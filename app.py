from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# Sample Sudoku Board (0 represents empty cells)
def generate_sudoku():
    base = 3
    side = base * base

    # Pattern for a baseline valid solution
    def pattern(r, c): return (base * (r % base) + r // base + c) % side

    # Shuffle rows, columns, and numbers
    def shuffle(s): return random.sample(s, len(s))

    r_base = range(base)
    rows = [g * base + r for g in shuffle(r_base) for r in shuffle(r_base)]
    cols = [g * base + c for g in shuffle(r_base) for c in shuffle(r_base)]
    nums = shuffle(range(1, side + 1))

    # Generate board using the pattern
    board = [[nums[pattern(r, c)] for c in cols] for r in rows]

    # Remove numbers to create the puzzle
    squares = side * side
    empties = squares * 3 // 4  # 75% empty cells
    for _ in range(empties):
        board[random.randint(0, side - 1)][random.randint(0, side - 1)] = 0

    return board

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate", methods=["GET"])
def generate():
    sudoku_board = generate_sudoku()
    return jsonify(sudoku_board)

if __name__ == "__main__":
    app.run(debug=True)
