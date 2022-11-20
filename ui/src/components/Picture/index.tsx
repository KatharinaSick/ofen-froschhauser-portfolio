import React from 'react';
import ModalImage from "react-modal-image";

type Properties = {
    filename: string
}

const Picture = (props: Properties) => {
    return (
        <ModalImage
            small={`/images/thumbs/${props.filename}`}
            large={`/images/fulls/${props.filename}`}
            hideDownload={true}
            hideZoom={true}
        />
    );
}

export default Picture;
