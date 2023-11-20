from flask import Flask, jsonify
from flask_restful import reqparse
from flask_restful import Api, Resource
from openai import OpenAI
import pickle
import pandas as pd
from main import get_chat
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
cors = CORS(app)
# Load the XGBoost model
model_filename = 'xgboost_model.pkl'
with open(model_filename, 'rb') as model_file:
    xg_model = pickle.load(model_file)



class Prediction1(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('age', type=int, required=True)
        parser.add_argument('retirement_age', type=float, required=True)
        parser.add_argument('goals', type=str, required=True)
        
        args = parser.parse_args()

        with app.app_context():
            client = OpenAI()
            user_message = f"My current age is {args['age']} and I will retire at {args['retirement_age']} and my goal are the following: {args['goals']}. Take the stats of latest cost you know and then estimate. Please don't give any explanation. Give the output only in the following text format: 'Total estimation cost= $ x(x should be a single number roundoff to nearest integer)'."
            print(user_message)

            completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a cost estimator that will give cost estimation of the goals of the people for their retirement by taking inflation according to historical data."},
                {"role": "user", "content": user_message},
            ]
            )
            res = completion.choices[0].message.content
            print(res)

            cost = ''

            for i in range(len(res)):
                if(res[i] == '.'):
                    break
                if res[i] >= '0' and res[i] <= '9':
                    cost += res[i]

            # Remove commas from the string
            cost = cost.replace(',', '')

            # Convert the string to an integer
            cost_value = int(cost)

            print(cost_value)
            return jsonify({'cost_value': cost_value})

class Prediction2(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('age', type=int, required=True)
        parser.add_argument('savings_per_annum', type=int, required=True)
        parser.add_argument('expected_savings_growth', type=float, required=True)
        parser.add_argument('risk_tolerance', type=int, required=True)
        parser.add_argument('age_of_retirement', type=int, required=True)
        parser.add_argument('employment', type=str, required=True)
        parser.add_argument('region', type=str, required=True)
        parser.add_argument('retirement_goals_cost', type=int, required=True)
        parser.add_argument('current_amount', type=int, required=True)
        parser.add_argument('dependents', type=int, required=True)

        args = parser.parse_args()

        # Create a DataFrame from the input data
        input_data = {
            ' age ': args['age'],
            ' savings_per_annum ': args['savings_per_annum'],
            ' expected_savings_growth ': args['expected_savings_growth'],
            ' risk_tolerance ': args['risk_tolerance'],
            ' age_of_retirement ': args['age_of_retirement'],
            ' employment ': args['employment'],
            ' region ': args['region'],
            ' retirement_goals_cost ': args['retirement_goals_cost'],
            ' current_amount ': args['current_amount'],
            ' dependents ': args['dependents']
        }

        input_df = pd.DataFrame([input_data])

        # Apply label encoding and scaling
        columns_to_label_encode = [' employment ', ' region ']
        
        print(input_df.head())


        # Create a LabelEncoder for each column
        label_encoders = {}
        for column in columns_to_label_encode:
            encoder_filename = f'label_encoder_{column}.pkl'
            with open(encoder_filename, 'rb') as encoder_file:
                label_encoders[column] = pickle.load(encoder_file)
                
        
        for column, encoder in label_encoders.items():
            input_df[column] = encoder.transform(input_df[column])
        
        print(input_df.head())
        
        for coulmn in input_df.columns:
            print(type(input_df[coulmn][0]))

        
        scaler_filename = 'min_max_scaler.pkl'
        with open(scaler_filename, 'rb') as scaler_file:
            scaler = pickle.load(scaler_file)
            
        columns_to_scale = [' age ', ' savings_per_annum ', ' expected_savings_growth ', ' risk_tolerance ', ' age_of_retirement ', ' retirement_goals_cost ', ' current_amount ']
        input_df[columns_to_scale] = scaler.transform(input_df[columns_to_scale])
        print(input_df.head())
        

        # Make predictions using the XGBoost model
        xg_pred = xg_model.predict(input_df)
        print(xg_pred.tolist()[0])

        # Return the prediction as part of the response
        return jsonify({'score': xg_pred.tolist()[0]})

recom_parser = reqparse.RequestParser()
recom_parser.add_argument('question', type=str, help='Question cannot be blank', required=True)
recom_parser.add_argument('risk_score', type=float, help='Risk Score cannot be blank', required=True)
class GetRecommendation(Resource):
    def post(self):
        args = recom_parser.parse_args()
        output = get_chat(args['question'], args['risk_score'])
        return {"message": output[0], "first": output[1], "second": output[2], "third": output[3]}

            
api.add_resource(Prediction1, '/TIAA/prediction1')
api.add_resource(Prediction2, '/TIAA/prediction2')
api.add_resource(GetRecommendation, '/TIAA/chat')

if __name__ == '__main__':
    app.run(debug=True)