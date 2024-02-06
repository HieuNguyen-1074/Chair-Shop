

exports.resizeFile = (file, Resizer, widthSet) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            230,
            230,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });
