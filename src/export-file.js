import * as htmlToImage from "html-to-image";

export const exportAsImage = async (element, fileName) => {
    const image = await htmlToImage.toPng(element);
    downloadFile(image, fileName, "image");
};

export const exportAsTxt = (items, fileName) => {
    let fileNameStr = '';
    items.map(item => {
        fileNameStr = fileNameStr + item.src + '\n';
    });
    const textFile = new Blob([fileNameStr], {
        type: "text/plain"
    });
    downloadFile(textFile, fileName, "text");
}

const downloadFile = (file, fileName, type) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display: none;";
    fakeLink.download = fileName;
    if (type === 'image') {
        fakeLink.href = file;
    }
    else {
        fakeLink.href = URL.createObjectURL(file);
    }
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    fakeLink.remove();
}

