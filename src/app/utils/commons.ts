
export const convertBufferToImageUrl = (bufferImage: Buffer) => {
    const blobImage = new Blob([new Uint8Array(bufferImage)], {type : 'image/*'});
    const imageUrl = window.URL.createObjectURL(blobImage);
    return imageUrl
}