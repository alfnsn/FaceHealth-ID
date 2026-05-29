import os
os.environ["TF_USE_LEGACY_KERAS"] = "1"

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

@tf.keras.utils.register_keras_serializable(package="Custom")
class CustomAttentionLayer(layers.Layer):
    def __init__(self, kernel_size=7, **kwargs):
        super(CustomAttentionLayer, self).__init__(**kwargs)
        self.kernel_size = kernel_size
        self.conv = layers.Conv2D(
            filters=1, kernel_size=self.kernel_size, padding="same", activation="sigmoid"
        )
    def call(self, inputs):
        attention_map = self.conv(inputs)
        return inputs * attention_map
    def get_config(self):
        config = super().get_config()
        config.update({"kernel_size": self.kernel_size})
        return config

model_lama = "saved_models/resnet50_finetuned_best.keras"
model_baru = "saved_models/resnet50_finetuned_best.h5"

print("Memuat model lama...")
model = keras.models.load_model(
    model_lama, 
    custom_objects={"CustomAttentionLayer": CustomAttentionLayer}
)

print("Menyimpan ke format H5...")
model.save(model_baru, save_format='h5')
print("Konversi selesai! File H5 sudah dibuat di folder saved_models.")