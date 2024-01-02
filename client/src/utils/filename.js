export const extractFileName = (url) => {
    const regex = new RegExp(/(%2F)...*(%2F)/);
    return url.split(regex)[3].split('%20')[0];
};

export const extractFileNameExtension = (url) => {
    const regex = new RegExp(/(%2F)...*(%2F)/);
    const fileName = url.split(regex)[3].split('%20')[0];
    const extension = fileName.split('.')[1].toLowerCase();

    if (extension === 'jpg' || extension === 'png' || extension === 'jpeg') {
        return 'Image';
    } else if (extension === 'pdf') {
        return 'PDF';
    } else if (extension === 'doc' || extension === 'docx') {
        return 'Word';
    } else if (extension === 'csv') {
        return 'Comma Separated Value';
    } else if (extension === 'pptx') {
        return 'PowerPoint ';
    } else if (extension === 'mp4') {
        return 'Video';
    } else {
        return 'Unknown File';
    }
};
