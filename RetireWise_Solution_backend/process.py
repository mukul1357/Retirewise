import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def check_best_match(text, portfolios):
    max = -1
    best_desc = ""
    for portfolio in portfolios:
        similarity = check_similarity(text, portfolio["description"])
        if similarity > max:
            max = similarity
            best_desc = portfolio
    return best_desc

def filter_portfolio_json(datas):
    output = []
    for data in datas:
        portfolios = data["portfolios"]
        for portfolio in portfolios:
            output.append(portfolio)
    return output

def check_similarity(text1, text2):
    stop_words = set(stopwords.words('english'))

    # Preprocess and tokenize the texts
    words1 = [word.lower() for word in nltk.word_tokenize(text1) if word.isalnum() and word.lower() not in stop_words]
    words2 = [word.lower() for word in nltk.word_tokenize(text2) if word.isalnum() and word.lower() not in stop_words]

    # Combine the preprocessed words into sentences
    sentence1 = ' '.join(words1)
    sentence2 = ' '.join(words2)

    # Create a TF-IDF Vectorizer
    vectorizer = TfidfVectorizer()

    # Fit and transform the vectorizer on the two sentences
    tfidf_matrix = vectorizer.fit_transform([sentence1, sentence2])

    # Calculate the cosine similarity between the two sentences
    cosine_sim = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])[0][0]

    return cosine_sim

