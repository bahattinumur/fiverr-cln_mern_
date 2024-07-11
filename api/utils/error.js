// Aldığı parametrelere göre hata middleware'inde kullanılacak bir error nesnesi oluşturan fonksiyon

const error = (status, message) => {
  // Bir err nesnesi oluşturalım
  const err = new Error();

  // Hata nesnesini güncelleyelim
  err.message = message;
  err.status = status;

  return err;
};

export default error;
