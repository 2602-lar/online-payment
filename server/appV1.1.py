from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///payment_system.db'
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this to a long, random string
jwt = JWTManager(app)
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    pin = db.Column(db.Integer, nullable=False)
    account_number = db.Column(db.Integer, unique=True, nullable=False)
    balance = db.Column(db.Float, default=0)

    def __repr__(self):
        return f'<User {self.name}>'


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


# Routes...

@app.route('/login', methods=['POST'])
def login():
    print(data)
    data = request.json
    account_number = data['account_number']
    pin = data['pin']

    user = User.query.filter_by(account_number=account_number, pin=pin).first()
    if not user:
        return jsonify({'error': 'Invalid account number or PIN'}), 401

    # Create JWT token
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200


@app.route('/create_account', methods=['POST'])
def create_account():
    data = request.json
    name = data['name']
    pin = data['pin']
    account_number = random.randint(1000000000, 9999999999)

    new_user = User(name=name, pin=pin, account_number=account_number)
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
@jwt_required()
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
@jwt_required()
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
@jwt_required()
def check_balance():
    account_number = request.args.get('account_number')
    user = User.query.filter_by(account_number=account_number).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({'balance': user.balance}), 200


@app.route('/statement', methods=['GET'])
@jwt_required()
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


@app.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()
    user_data = []
    for user in users:
        user_data.append({
            'id': user.id,
            'name': user.name,
            'account_number': user.account_number,
            'balance': user.balance
        })
    return jsonify({'users': user_data}), 200


@app.route('/edit_account', methods=['POST'])
@jwt_required()
def edit_account():
    data = request.json
    account_number = data['account_number']
    new_name = data['name']
    new_pin = data['pin']

    user = User.query.filter_by(account_number=account_number).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user.name = new_name
    user.pin = new_pin
    db.session.commit()

    return jsonify({'message': 'Account details updated successfully'}), 200


@app.route('/delete_account', methods=['POST'])
@jwt_required()
def delete_account():
    data = request.json
    account_number = data['account_number']
    pin = data['pin']

    user = User.query.filter_by(account_number=account_number, pin=pin).first()
    if not user:
        return jsonify({'error': 'User not found or incorrect PIN'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'Account deleted successfully'}), 200


if __name__ == '__main__':
    app.run(debug=True)
