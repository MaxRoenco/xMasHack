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

def generate_chat_completion_simple(prompt, instructions=None):
    # Prepare conversation messages
    messages = []
    
    # Add system instructions if provided
    if instructions:
        messages.append({
            'role': 'system',
            'content': instructions
        })
    
    # Add user prompt
    messages.append({
        'role': 'user',
        'content': prompt
    })
    
    try:
        # Send request to Ollama API
        response = requests.post(
            OLLAMA_API_URL,
            json={
                'model': 'phi3:mini',
                'messages': messages,
                'stream': False
            }
        )

        if response.status_code != 200:
            return f"Error: Received status code {response.status_code}"

        # Parse and return the response
        response_data = response.json()
        return response_data['message']['content']

    except requests.exceptions.RequestException as error:
        return f"Error generating completion: {error}"

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
        'content': "Answer shortly, one short sentence: "+ user_message
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

@app.route('/optimize', methods=['POST'])
def optimize():
    data = request.get_json()
    print(data)
    if not data or 'optimal' not in data or 'given' not in data:
        return jsonify({'error': 'Missing message field'}), 400
    
    optimal = data.get('optimal')
    given = data.get('given')
    instructions = "You are a helpful AI assistant whose job is to compare the optimal code, with the given one, and help the user figure out the problems in their code, and suggest improvements. Your answers should be brief and NOT contain the optimal code, only the explanation or how to improve it. Just enough to address the issue in the code. the answer should be short and brief. 10 words max."
    prompt = f'''
    Optimal code: {optimal}

    Given code: {given}

    Assistant answer (only 1 very short sentence, of a simple advice, 10 words max):
    '''
    
    message = generate_chat_completion_simple(prompt, instructions)
    
    return jsonify({
        'message': message,
    }), 200

@app.route('/help', methods=['POST'])
def help():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Missing message field'}), 400
    
    given = data.get('message')
    instructions = "You are a helpful AI code assistant whose job is to give advice and help the user solve issues with their code. be as short and brief as possible."
    
    message = generate_chat_completion_simple(given, instructions)
    
    return jsonify({
        'message': message,
    }), 200

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Missing message field'}), 400
    
    conversation_id = data.get('conversation_id', 'default')
    custom_instructions = "You area a friendly chatbot called kiki the cat! you always answer briefly and helpfully while raising the morale of the user, brief answers, right to the point."
    
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
    return jsonify({'messages': conversation['messages'][1:]}), 200

@app.route('/clear/<conversation_id>', methods=['POST'])
def clear_history(conversation_id):
    if conversation_id in conversations:
        del conversations[conversation_id]
    return jsonify({'status': 'success'}), 200

if __name__ == '__main__':
    app.run(debug=True)