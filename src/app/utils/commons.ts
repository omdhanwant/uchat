
export const convertBufferToImageUrl = (bufferImage) => {
    const blobImage = new Blob([new Uint8Array(bufferImage)], {type : 'image/*'});
    const imageUrl = window.URL.createObjectURL(blobImage);
    return imageUrl
}

export const getPureObject = (object) => {
    return JSON.parse(JSON.stringify(object));
}