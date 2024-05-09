from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import random
import re

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///payment_system_v1.db'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)  # Added full_name column
    dob = db.Column(db.String(10), nullable=False)  # Assuming date of birth as a string in format YYYY-MM-DD
    id_number = db.Column(db.String(20), unique=True, nullable=False)
    phone_number = db.Column(db.String(15), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    current_address = db.Column(db.String(255), nullable=False)
    marital_status = db.Column(db.String(20), nullable=False)
    pin = db.Column(db.Integer, nullable=False)
    account_number = db.Column(db.Integer, unique=True, nullable=False)
    balance = db.Column(db.Float, default=0)

    def __repr__(self):
        return f'<User {self.full_name}>'


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    reference_number = db.Column(db.Integer, unique=True, nullable=False)

    def __repr__(self):
        return f'<Transaction {self.reference_number}>'


class BankPool(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total_amount = db.Column(db.Float, default=0)

    def __repr__(self):
        return f'<BankPool {self.total_amount}>'


def create_bank_pool():
    if not BankPool.query.first():
        bank_pool = BankPool()
        db.session.add(bank_pool)
        db.session.commit()


with app.app_context():
    db.create_all()
    create_bank_pool()


def update_bank_pool(amount):
    bank_pool = BankPool.query.first()
    bank_pool.total_amount += amount
    db.session.commit()


def generate_reference_number():
    return random.randint(100000, 999999)


def validate_email(email):
    # Simple email validation using regex
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)


def validate_phone_number(phone_number):
    # Phone number validation with country code
    return re.match(r"\+\d{1,3}\d{9,15}$", phone_number)


# Routes...
@app.route('/create_account', methods=['POST'])
def create_account():
    data = request.json
    full_name = data['full_name']
    dob_str = data['dob']
    id_number = data['id_number']
    phone_number = data['phone_number']
    email = data['email']
    current_address = data['current_address']
    marital_status = data['marital_status']
    pin = data['pin']
    account_number = random.randint(1000000000, 9999999999)

    # Validate date of birth
    try:
        dob = datetime.strptime(dob_str, '%Y-%m-%d')
    except ValueError:
        return jsonify({'error': 'Invalid date format for date of birth. Please use YYYY-MM-DD'}), 400

    # Validate email format
    if not re.match(r'^[\w\.-]+@[\w\.-]+$', email):
        return jsonify({'error': 'Invalid email format. Please provide a valid email address.'}), 400

    # Validate phone number format (Assuming it starts with '+' followed by the country code and then digits)
    if not re.match(r'^\+\d{1,3}\d{9}$', phone_number):
        return jsonify({'error': 'Invalid phone number format. Please provide a valid phone number starting with a '
                                 'country code.'}), 400

    # Check if the email address already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email address already in use. Please use a different email address.'}), 400

    # Assuming other validations are in place for other fields like phone number, email, etc.

    new_user = User(full_name=full_name, dob=dob_str, id_number=id_number, phone_number=phone_number,
                    email=email, current_address=current_address, marital_status=marital_status,
                    pin=pin, account_number=account_number)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Account created successfully', 'account_number': account_number}), 201


@app.route('/deposit', methods=['POST'])
def deposit():
    data = request.json
    account_number = data['account_number']
    amount = data['amount']

    user = User.query.filter_by(account_number=account_number).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user.balance += amount
    update_bank_pool(amount)
    db.session.commit()

    return jsonify({'message': 'Deposit successful'}), 200


@app.route('/withdraw', methods=['POST'])
def withdraw():
    data = request.json
    account_number = data['account_number']
    pin = data['pin']
    amount = data['amount']

    user = User.query.filter_by(account_number=account_number, pin=pin).first()
    if not user:
        return jsonify({'error': 'User not found or incorrect PIN'}), 404
    if amount > user.balance:
        return jsonify({'error': 'Insufficient funds'}), 400

    user.balance -= amount
    update_bank_pool(-amount)
    db.session.commit()

    return jsonify({'message': 'Withdrawal successful'}), 200


@app.route('/transfer', methods=['POST'])
def transfer():
    data = request.json
    sender_account_number = data['sender_account_number']
    pin = data['pin']
    recipient_account_number = data['recipient_account_number']
    amount = data['amount']

    sender = User.query.filter_by(account_number=sender_account_number, pin=pin).first()
    recipient = User.query.filter_by(account_number=recipient_account_number).first()
    if not sender or not recipient:
        return jsonify({'error': 'Sender or recipient not found'}), 404
    if amount > sender.balance:
        return jsonify({'error': 'Insufficient funds'}), 400

    sender.balance -= amount
    recipient.balance += amount

    update_bank_pool(-amount)
    db.session.commit()

    reference_number = generate_reference_number()
    new_transaction = Transaction(sender_id=sender.id, recipient_id=recipient.id, amount=amount,
                                  reference_number=reference_number)
    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({'message': 'Transfer successful', 'reference_number': reference_number}), 200


@app.route('/balance', methods=['GET'])
def check_balance():
    account_number = request.args.get('account_number')
    user = User.query.filter_by(account_number=account_number).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({'balance': user.balance}), 200


@app.route('/statement', methods=['GET'])
def request_statement():
    account_number = request.args.get('account_number')
    user = User.query.filter_by(account_number=account_number).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    transfer_transactions = Transaction.query.filter(
        (Transaction.sender_id == user.id) | (Transaction.recipient_id == user.id)).all()
    transfer_statements = [{'type': 'transfer', 'sender': transaction.sender_id, 'recipient': transaction.recipient_id,
                            'amount': transaction.amount,
                            'reference_number': transaction.reference_number} for transaction in transfer_transactions]

    # Fetch the latest deposit transaction or access the balance directly
    latest_deposit = Transaction.query.filter_by(recipient_id=user.id).order_by(Transaction.id.desc()).first()
    deposit_amount = latest_deposit.amount if latest_deposit else user.balance

    deposit_statements = [{'type': 'deposit', 'sender': 'Bank', 'recipient': user.id, 'amount': deposit_amount,
                           'reference_number': None}]

    withdrawal_transactions = Transaction.query.filter_by(sender_id=user.id).all()
    withdrawal_statements = [
        {'type': 'withdrawal', 'sender': user.id, 'recipient': 'Bank', 'amount': transaction.amount,
         'reference_number': transaction.reference_number} for transaction in withdrawal_transactions]

    statements = transfer_statements + deposit_statements + withdrawal_statements

    return jsonify({'statements': statements}), 200


if __name__ == '__main__':
    app.run(debug=True)
