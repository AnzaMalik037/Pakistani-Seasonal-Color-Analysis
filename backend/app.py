from flask import Flask, request, jsonify
import numpy as np
import joblib
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier
import cv2
from mtcnn import MTCNN
from sklearn.cluster import KMeans
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Load the RandomForest model
model_filename = "random_forest_model.pkl"
model = joblib.load(model_filename)
if not isinstance(model, RandomForestClassifier):
    raise ValueError("Loaded model is not a RandomForestClassifier.")
print("✅ Model loaded successfully and is a RandomForestClassifier!")

# Initialize MTCNN for face detection
detector = MTCNN()

def calculate_brightness(r, g, b):
    """Calculate brightness using the luminosity formula, normalized by 255."""
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255.0

def get_dominant_color(region, n_clusters=1):
    """Use KMeans to get the dominant RGB color from the region."""
    pixels = region.reshape(-1, 3)
    kmeans = KMeans(n_clusters=n_clusters, n_init=10)
    kmeans.fit(pixels)
    return kmeans.cluster_centers_[0].astype(int)

def crop_region(image, center, size=20):
    """Crop a square region around a center point."""
    x, y = center
    h, w, _ = image.shape
    x1, x2 = max(0, x - size), min(w, x + size)
    y1, y2 = max(0, y - size), min(h, y + size)
    return image[y1:y2, x1:x2]




def extract_features_from_image(image_bytes):
    """Extract facial features (colors and brightness) following the same procedure as in the test notebook."""
    

    # Load image and convert to RGB NumPy array
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img_np = np.array(image)

    # Detect face and keypoints with MTCNN
    faces = detector.detect_faces(img_np)
    if len(faces) == 0:
        raise ValueError("No face detected in the image.")
    face = faces[0]
    x, y, w, h = face['box']
    keypoints = face['keypoints']
    left_eye = keypoints['left_eye']
    right_eye = keypoints['right_eye']
    mouth_left = keypoints['mouth_left']
    mouth_right = keypoints['mouth_right']

    # Define regions similar to test.ipynb:
    # For the eyebrow, shift the left eye upward by 20 pixels.
    left_eyebrow = (left_eye[0], left_eye[1] - 20)
    # For the lips, take the center between mouth left and right.
    lips = ((mouth_left[0] + mouth_right[0]) // 2, (mouth_left[1] + mouth_right[1]) // 2)

    # Crop regions using the same sizes as in your test notebook:
    left_eye_roi = crop_region(img_np, left_eye, size=15)
    left_eyebrow_roi = crop_region(img_np, left_eyebrow, size=20)
    lip_roi = crop_region(img_np, lips, size=20)
    face_roi = img_np[y:y+h, x:x+w]  # full face region for skin color

    # Extract dominant colors using KMeans (same helper as before)
    eye_color = get_dominant_color(left_eye_roi)
    eyebrow_color = get_dominant_color(left_eyebrow_roi)
    lip_color = get_dominant_color(lip_roi)
    face_color = get_dominant_color(face_roi)

    # Calculate brightness for each region (note the division by 255)
    eye_brightness = calculate_brightness(*eye_color)
    lip_brightness = calculate_brightness(*lip_color)
    eyebrow_brightness = calculate_brightness(*eyebrow_color)
    face_brightness = calculate_brightness(*face_color)

    # Build the feature dictionary in the same order as used during training:
    features = {
        "Eye Color_R": int(eye_color[0]),
        "Eye Color_G": int(eye_color[1]),
        "Eye Color_B": int(eye_color[2]),
        "Lip color_R": int(lip_color[0]),
        "Lip color_G": int(lip_color[1]),
        "Lip color_B": int(lip_color[2]),
        "Eyebrow Color_R": int(eyebrow_color[0]),
        "Eyebrow Color_G": int(eyebrow_color[1]),
        "Eyebrow Color_B": int(eyebrow_color[2]),
        "Skin Color_R": int(face_color[0]),
        "Skin Color_G": int(face_color[1]),
        "Skin Color_B": int(face_color[2]),
        "Eye Color_Brightness": eye_brightness,
        "Lip color_Brightness": lip_brightness,
        "Eyebrow Color_Brightness": eyebrow_brightness,
        "Skin Color_Brightness": face_brightness
    }
    return features

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    image_bytes = file.read()

    try:
        extracted_features = extract_features_from_image(image_bytes)
        # Define the feature order expected by the RandomForest model:
        feature_keys = [
            "Eye Color_R", "Eye Color_G", "Eye Color_B",
            "Eyebrow Color_R", "Eyebrow Color_G", "Eyebrow Color_B",
            "Skin Color_R", "Skin Color_G", "Skin Color_B",
            "Lip color_R", "Lip color_G", "Lip color_B",
            "Eye Color_Brightness", "Eyebrow Color_Brightness",
            "Skin Color_Brightness", "Lip color_Brightness"
        ]
        feature_vector = np.array([extracted_features[k] for k in feature_keys]).reshape(1, -1)
        prediction = model.predict(feature_vector)[0]

        return jsonify({
            "season_prediction": prediction,
            "extracted_features": extracted_features
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
