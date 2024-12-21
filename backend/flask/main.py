from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

OLLAMA_API_URL = 'http://127.0.0.1:11434/api/generate'

def generate_completion_with_instructions(optimal, given):
    prompt = f'''
    You are a helpful AI assistant whose job is to compare the optimal code, with the given one, and help the user figure out the problems in their code, and suggest improvements. Your answers should be brief and NOT contain the optimal code, only the explanation or how to improve it. Just enough to address the issue in the code. the answer should be short and brief.

    Optimal code: {optimal}

    Given code: {given}

    Assistant answer:
    '''

    try:
        response = requests.post(
            OLLAMA_API_URL,
            json={
                'model': 'phi3:mini',
                'prompt': prompt,
                'stream': True
            },
            stream=True
        )

        if response.status_code != 200:
            return f"Error: Received status code {response.status_code}"

        accumulated_response = ''
        buffer = ''
        
        # Read the response as bytes and decode properly
        for chunk in response.iter_content(decode_unicode=True):
            if chunk:
                buffer += chunk.decode('utf-8') if isinstance(chunk, bytes) else chunk
                
                # Try to find complete JSON objects in the buffer
                while '\n' in buffer:
                    line, buffer = buffer.split('\n', 1)
                    try:
                        if line.strip():
                            data = json.loads(line)
                            if 'response' in data:
                                accumulated_response += data['response']
                    except json.JSONDecodeError:
                        # Skip malformed JSON lines silently
                        continue

        return accumulated_response.strip()

    except requests.exceptions.RequestException as error:
        return f"Error generating completion: {error}"

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    if not data or 'optimal' not in data or 'given' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
        
    optimal = data['optimal']
    given = data['given']
    message = generate_completion_with_instructions(optimal, given)
    return jsonify({'message': message}), 200

if __name__ == '__main__':
    app.run(debug=True)