
from flask import Flask, render_template, request, jsonify
import webbrowser
import threading
import os

app = Flask(__name__)

# Sample lessons data (skeleton, can be expanded fully)
lessons = {
    "html": ["basics", "forms", "semantic"],
    "css": ["basics", "flexbox", "nested_flexbox", "grid", "animations", "selectors"],
    "js": ["basics", "dom", "events"]
}

@app.route("/")
def index():
    return render_template("index.html", lessons=lessons)

@app.route("/lesson/<topic>/<subtopic>")
def lesson(topic, subtopic):
    lesson_file = f"lessons/{topic}/{subtopic}.json"
    if os.path.exists(lesson_file):
        with open(lesson_file, "r") as f:
            content = f.read()
        return jsonify({"content": content})
    else:
        return jsonify({"error": "Lesson not found"}), 404

if __name__ == "__main__":
    url = "http://127.0.0.1:5000"
    threading.Timer(1.0, lambda: webbrowser.open(url)).start()
    app.run(debug=True)
