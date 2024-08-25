from flask import Flask, request, jsonify,render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')



# GET method: Returns hardcoded response
@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1}), 200

# POST method: Processes input and returns processed data
@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        data = request.get_json()
        input_data = data.get('data', [])
        
        numbers = [item for item in input_data if item.isdigit()]
        alphabets = [item for item in input_data if item.isalpha()]
        lowercase_alphabets = [item for item in alphabets if item.islower()]
        
        highest_lowercase_alphabet = [max(lowercase_alphabets)] if lowercase_alphabets else []
 
        response = {
            "is_success": True,
            "user_id": "harshit_raj_16082002",
            "email": "harshit.raj2021@vitstudent.ac.in",
            "roll_number": "21BBS0219",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highest_lowercase_alphabet
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
