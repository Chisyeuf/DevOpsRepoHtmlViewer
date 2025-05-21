import { useRef } from "react";
import './IFrameStringContent.css';

const IFRAME_ID = "devopsvieweriframe";


const IFrameStringContent = (props: { content: string }) => {

    const iframeRef = useRef<HTMLIFrameElement | null>(null);


    const writeHTML = (frame: HTMLIFrameElement) => {
        if (!frame) {
            return;
        }
        iframeRef.current = frame;
        const doc = frame.contentDocument;
        if (doc) {
            doc.open();
            doc.write(props.content);
            doc.close();
        }
    };


    return (
        <iframe
            id={IFRAME_ID}
            src="about:blank"
            ref={writeHTML}
            height="100%" width="100%"
        />
    );
};

export default IFrameStringContent;