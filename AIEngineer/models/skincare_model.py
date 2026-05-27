from pydantic import BaseModel

class SkincareRequest(BaseModel):
    Age_Group: str
    Skin_Type: str
    Skin_Subtype: str
    Sensitivity: str
    Internal_Type: str