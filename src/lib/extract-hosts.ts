function extractHost(url: string) {
  return url
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "") // حذف البروتوكول فقط
    .split("/")[0]
    .split(":")[0]; // لضمان حذف البورت لو وجد (مثل localhost:3000)
}

export default extractHost;