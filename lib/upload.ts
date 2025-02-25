export async function uploadFile(file: File) {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload file")
    }

    const data = await response.json()
    return { success: true, url: data.url }
  } catch (error) {
    console.error("Failed to upload file:", error)
    return { success: false, error: "Failed to upload file" }
  }
}

