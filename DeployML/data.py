#klasifikasi variabel
from pydantic import BaseModel

class DataUKM(BaseModel):
    total_aset: float
    rata_penjualan: float
    nilai_aset: float

class DataProfilInvestor(BaseModel):
    umur: float
    jenis_kelamin: float
    pendapatan: float
    edukasi: float
    rumah: float