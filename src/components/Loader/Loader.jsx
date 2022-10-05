import { ColorRing } from "react-loader-spinner"

import { LoaderContainer } from "./LoaderStyled"

export default function Loader() {
    return (
        <LoaderContainer>
            <ColorRing
                marginTop="100"
                visible={true}
                height="400"
                width="400"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </LoaderContainer>
    )
}