declare module "react-modal-image" {
    export default function ModalImage(props: {
        small: string;
        large: string;
        hideDownload?: boolean;
        hideZoom?: boolean;
        alt?: string;
    }): JSX.Element;
}