import os
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications.resnet50 import preprocess_input as resnet_preprocess

BASE_DIR    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # root: AIEngineer/
MODEL_PATH  = os.path.join(BASE_DIR, "saved_models", "resnet50_finetuned_best.keras")
TEST_IMAGES = os.path.join(BASE_DIR, "test_images")

CLASS_NAMES = ['Blackheads', 'Cyst', 'Papules', 'Pustules', 'Whiteheads']


@tf.keras.utils.register_keras_serializable(package="Custom")
class CustomAttentionLayer(layers.Layer):
    def __init__(self, kernel_size=7, **kwargs):
        super(CustomAttentionLayer, self).__init__(**kwargs)
        self.kernel_size = kernel_size
        self.conv = layers.Conv2D(
            filters=1,
            kernel_size=self.kernel_size,
            padding="same",
            activation="sigmoid"
        )

    def call(self, inputs):
        attention_map = self.conv(inputs)
        return inputs * attention_map

    def get_config(self):
        config = super().get_config()
        config.update({"kernel_size": self.kernel_size})
        return config

model = keras.models.load_model(
    MODEL_PATH,
    custom_objects={"CustomAttentionLayer": CustomAttentionLayer},
    compile=False
)

print("Model berhasil dimuat.")
print("Class names:", CLASS_NAMES)

def predict_acne_image(image_path: str, img_size: tuple = (224, 224)) -> dict:
    img       = tf.keras.utils.load_img(image_path, target_size=img_size)
    img_array = tf.keras.utils.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = resnet_preprocess(img_array)

    predictions     = model.predict(img_array, verbose=0)
    predicted_index = np.argmax(predictions[0])
    predicted_class = CLASS_NAMES[predicted_index]
    confidence      = float(predictions[0][predicted_index])

    probabilities = {
        name: round(float(prob), 4)
        for name, prob in zip(CLASS_NAMES, predictions[0])
    }

    result = {
        "predicted_class": predicted_class,
        "confidence": round(confidence, 4),
        "probabilities": probabilities
    }

    return result

if __name__ == "__main__":
    image_path = os.path.join(TEST_IMAGES, "cy.jpg")
    if os.path.exists(image_path):
        predict_acne_image(image_path)