from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

OLLAMA_API_URL = 'http://127.0.0.1:11434/api/chat'

conversations = {}

# Define the system instructions
SYSTEM_INSTRUCTIONS = """You are a helpful AI assistant called kiki the cat that answers all questions as short and briefly as possible while remaining helpful. answer shortly, consice, brief, and small text."""

def get_or_create_conversation(conversation_id):
    if conversation_id not in conversations:
        conversations[conversation_id] = {
            'messages': [
                {
                    'role': 'system',
                    'content': SYSTEM_INSTRUCTIONS
                }
            ],
            'created_at': datetime.now().isoformat()
        }
    return conversations[conversation_id]

def generate_chat_completion(conversation_id, user_message, custom_instructions=None):
    conversation = get_or_create_conversation(conversation_id)
    
    # If custom instructions are provided, update the system message
    if custom_instructions:
        conversation['messages'][0] = {
            'role': 'system',
            'content': custom_instructions
        }
    
    # Add user message to history
    conversation['messages'].append({
        'role': 'user',
        'content': user_message
    })
    
    try:
        # Prepare the chat request with full conversation history
        response = requests.post(
            OLLAMA_API_URL,
            json={
                'model': 'phi3:mini',
                'messages': conversation['messages'],
                'stream': False
            }
        )

        if response.status_code != 200:
            return f"Error: Received status code {response.status_code}"

        # Parse the response
        response_data = response.json()
        assistant_message = response_data['message']['content']
        
        # Add assistant's response to conversation history
        conversation['messages'].append({
            'role': 'assistant',
            'content': assistant_message
        })
        
        return assistant_message

    except requests.exceptions.RequestException as error:
        return f"Error generating completion: {error}"

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Missing message field'}), 400
    
    conversation_id = data.get('conversation_id', 'default')
    custom_instructions = data.get('system_instructions')  # Optional custom instructions
    
    message = generate_chat_completion(conversation_id, data['message'], custom_instructions)
    
    return jsonify({
        'message': message,
        'conversation_id': conversation_id,
        'history': conversations[conversation_id]['messages']
    }), 200

@app.route('/set_instructions/<conversation_id>', methods=['POST'])
def set_instructions(conversation_id):
    data = request.get_json()
    if not data or 'instructions' not in data:
        return jsonify({'error': 'Missing instructions field'}), 400
    
    conversation = get_or_create_conversation(conversation_id)
    conversation['messages'][0] = {
        'role': 'system',
        'content': data['instructions']
    }
    
    return jsonify({'status': 'success'}), 200

@app.route('/history/<conversation_id>', methods=['GET'])
def get_history(conversation_id):
    conversation = get_or_create_conversation(conversation_id)
    return jsonify(conversation), 200

@app.route('/clear/<conversation_id>', methods=['POST'])
def clear_history(conversation_id):
    if conversation_id in conversations:
        del conversations[conversation_id]
    return jsonify({'status': 'success'}), 200

if __name__ == '__main__':
    app.run(debug=True)